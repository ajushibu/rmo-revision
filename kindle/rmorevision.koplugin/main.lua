--[[ RMO Revision for KOReader.
Bare-bones recall cards: question -> show answer -> Shaky / Got it. Same spacing rules as the web app (rmo_core.lua).
Sync: a Kindle code made in the app (Settings > Kindle) lets this plugin read your card schedule and add ratings
through two server functions. It cannot see notes, highlights or your account.
Written without a device to test on: if something fails, the message on screen says what and where.
]]
local DataStorage = require("datastorage")
local InfoMessage = require("ui/widget/infomessage")
local InputDialog = require("ui/widget/inputdialog")
local LuaSettings = require("luasettings")
local NetworkMgr = require("ui/network/manager")
local TextViewer = require("ui/widget/textviewer")
local UIManager = require("ui/uimanager")
local WidgetContainer = require("ui/widget/container/widgetcontainer")
local JSON = require("json")
local ltn12 = require("ltn12")
local lfs = require("libs/libkoreader-lfs")
local logger = require("logger")
local _ = require("gettext")
local Core = require("rmo_core")

local SB = "https://omuzlqabwlzhbrfipwqx.supabase.co"
local SBK = "sb_publishable_wQHqdu55ZO72ujh-1iq98A_gBS5E3FB"   -- public key; the link code is what authorises
local CARDS_URL = "https://rmo-revision-app.vercel.app/kindle/cards.json"

local RMORevision = WidgetContainer:extend{ name = "rmorevision", is_doc_only = false }

local function readFile(path)
    local f = io.open(path, "rb"); if not f then return nil end
    local s = f:read("*a"); f:close(); return s
end

local function exists(p) return p and lfs.attributes(p, "mode") == "file" end

function RMORevision:init()
    self.settings = LuaSettings:open(DataStorage:getSettingsDir() .. "/rmorevision.lua")
    self.cardsFile = DataStorage:getSettingsDir() .. "/rmorevision_cards.json"
    self.ui.menu:registerToMainMenu(self)
    -- lets you pick "RMO Revision: start revising" under Settings > Taps and gestures
    local ok, Dispatcher = pcall(require, "dispatcher")
    if ok and Dispatcher then
        pcall(function()
            Dispatcher:registerAction("rmorevision_start", { category = "none", event = "RMORevisionStart",
                title = _("RMO Revision: start revising"), general = true, filemanager = true })
        end)
    end
end

function RMORevision:onRMORevisionStart() self:startSession(); return true end

function RMORevision:addToMainMenu(menu_items)
    menu_items.rmorevision = {
        text = _("RMO Revision"),
        sorting_hint = "tools",
        sub_item_table = {
            { text_func = function() return self:revisionLabel() end, callback = function() self:startSession() end },
            { text = _("Sync now"), callback = function() self:syncNow(true) end },
            { text = _("Link to the app (type the Kindle code)"), callback = function() self:askCode() end },
            { text = _("Update cards"), callback = function() self:updateCards() end },
            { text = _("Check HTTPS certificates"), checked_func = function() return self.settings:readSetting("strict_https", true) end,
              callback = function() self.settings:saveSetting("strict_https", not self.settings:readSetting("strict_https", true)); self.settings:flush() end },
            { text = _("Unlink this Kindle"), callback = function() self.settings:delSetting("token"); self.settings:flush(); self:say(_("Unlinked.")) end },
        },
    }
end

function RMORevision:say(text, timeout) UIManager:show(InfoMessage:new{ text = text, timeout = timeout }) end

-- ---------- data ----------
function RMORevision:loadCards()
    if self.cards then return self.cards end
    local raw = readFile(self.cardsFile)
    local ok, data = pcall(function() return raw and JSON.decode(raw) end)
    if not (ok and data and data.topics) then
        raw = readFile(self.path .. "/cards.json")
        ok, data = pcall(function() return raw and JSON.decode(raw) end)
    end
    if ok and data and data.topics then self.cards = data.topics end
    return self.cards
end

function RMORevision:items()
    local s = self.settings
    return Core.mergeItems(s:readSetting("resetAt", 0), s:readSetting("items", {}), s:readSetting("pending", {}))
end

function RMORevision:queue()
    local cards = self:loadCards()
    if not cards then return nil end
    local s = self.settings
    return Core.queue(cards, s:readSetting("studied", {}), s:readSetting("skipRev", {}), self:items(), Core.today())
end

function RMORevision:revisionLabel()
    local q = self:queue()
    if not q then return _("Revise (no cards found)") end
    return string.format(_("Revise: %d due, %d new (today %d min)"), #q.due, #q.fresh, self:todayMinutes())
end

-- ---------- review ----------
function RMORevision:startSession()
    local q = self:queue()
    if not q then self:say(_("No cards file found. Use Update cards (needs Wi-Fi) or copy cards.json into the plugin folder.")); return end
    if #q.all == 0 then
        if not self.settings:readSetting("token") then self:say(_("No cards yet. Link to the app first: it tells the Kindle which topics you have started.")) else self:say(_("Nothing due. Sync now, or come back tomorrow.")) end
        return
    end
    self.done = 0
    self.later = {}
    self.sessSecs = 0
    self.lapAt = os.time()
    self:showQuestion()
end

-- Active time: gaps between taps count, but a gap over 2 minutes counts as 2 (you walked away), like the app.
function RMORevision:lap()
    local now = os.time()
    local d = now - (self.lapAt or now)
    if d > 120 then d = 120 elseif d < 0 then d = 0 end
    self.lapAt = now
    self.sessSecs = (self.sessSecs or 0) + d
    local day = Core.today()
    local t = self.settings:readSetting("time", {})
    if t.date ~= day then t = { date = day, secs = 0 } end
    t.secs = t.secs + d
    self.settings:saveSetting("time", t)
end

local function clock(secs) return string.format("%d:%02d", math.floor(secs / 60), secs % 60) end

function RMORevision:todayMinutes()
    local t = self.settings:readSetting("time", {})
    if t.date ~= Core.today() then return 0 end
    return math.floor(t.secs / 60 + 0.5)
end

function RMORevision:closeViewer() if self.viewer then UIManager:close(self.viewer); self.viewer = nil end end

function RMORevision:show(title, text, buttons)
    self:closeViewer()
    self.viewer = TextViewer:new{ title = title, text = text, buttons_table = buttons, add_default_buttons = false, justified = false }
    UIManager:show(self.viewer)
end

function RMORevision:showQuestion()
    local q = self:queue()
    if not q or #q.all == 0 then self:finish(); return end
    -- cards sent "later" go to the end of today's queue, in the order you sent them, still unrated
    local pos, n = {}, 0
    for i, id in ipairs(self.later or {}) do pos[id] = i end
    local head, tail = {}, {}
    for _, x in ipairs(q.all) do if pos[x.card.id] then tail[#tail + 1] = x else head[#head + 1] = x end end
    table.sort(tail, function(a, b) return pos[a.card.id] < pos[b.card.id] end)
    for _, x in ipairs(tail) do head[#head + 1] = x end
    q.all = head
    local e = q.all[1]
    local title = string.format("%s   (%d left, %s)", e.topic, #q.all, clock(self.sessSecs or 0))
    self:show(title, e.card.t, {
        { { text = _("Stop"), callback = function() self:finish() end }, { text = _("Show answer"), callback = function() self:showAnswer(e) end } },
        { { text = _("Bring back later"), callback = function() self:bringBack(e) end } },
    })
end

function RMORevision:showAnswer(e)
    self:lap()
    local isNew = Core.state(self:items(), e.card.id, Core.today()) == "new"
    local title = string.format("%s%s", e.topic, isNew and "   (new)" or "")
    self:show(title, e.card.t .. "\n\n" .. Core.answerText(e.card.k), {
        { { text = _("Shaky: tomorrow"), callback = function() self:rate(e, "shaky") end },
          { text = _("Got it"), callback = function() self:rate(e, "got") end } },
        { { text = _("Bring back later"), callback = function() self:bringBack(e) end },
          { text = _("Stop"), callback = function() self:finish() end } },
    })
end

function RMORevision:bringBack(e)
    self:lap()
    local id = e.card.id
    self.later = self.later or {}
    for i = #self.later, 1, -1 do if self.later[i] == id then table.remove(self.later, i) end end
    self.later[#self.later + 1] = id
    self:showQuestion()
end

function RMORevision:rate(e, how)
    self:lap()
    local item = Core.rate(self:items(), e.card.id, how, Core.today(), os.time() * 1000)
    if item then
        local pending = self.settings:readSetting("pending", {})
        pending[e.card.id] = item
        self.settings:saveSetting("pending", pending); self.settings:flush()
        self.done = (self.done or 0) + 1
    end
    self:showQuestion()
end

function RMORevision:finish()
    if self.lapAt then self:lap(); self.lapAt = nil end
    self.settings:flush()
    self:closeViewer()
    local n = 0
    for _ in pairs(self.settings:readSetting("pending", {})) do n = n + 1 end
    local msg = string.format(_("%d cards done in %s. Today: %d min."), self.done or 0, clock(self.sessSecs or 0), self:todayMinutes())
    if n > 0 then
        if NetworkMgr:isOnline() and self.settings:readSetting("token") then self:syncNow(false); msg = msg .. " " .. _("Syncing…")
        else msg = msg .. " " .. string.format(_("%d ratings wait for Wi-Fi. Use Sync now."), n) end
    end
    self:say(msg, 4)
end

-- ---------- network ----------
function RMORevision:request(url, method, bodyTable, headers)
    local https = require("ssl.https")
    local payload = bodyTable and JSON.encode(bodyTable) or nil
    local sink = {}
    local h = { ["apikey"] = SBK, ["Content-Type"] = "application/json" }
    for k, v in pairs(headers or {}) do h[k] = v end
    if payload then h["Content-Length"] = tostring(#payload) end
    local params = { url = url, method = method or "GET", headers = h, sink = ltn12.sink.table(sink), protocol = "any", options = { "all", "no_sslv2", "no_sslv3" } }
    if payload then params.source = ltn12.source.string(payload) end
    if self.settings:readSetting("strict_https", true) then
        local ca
        for _, p in ipairs({ "./data/ca-bundle.crt", "/etc/ssl/certs/ca-certificates.crt", "/etc/ssl/cert.pem", "./ca-bundle.crt" }) do if exists(p) then ca = p; break end end
        if ca then params.verify = "peer"; params.cafile = ca
        else params.verify = "none" end   -- no CA file found on this device
    end
    self.unverified = params.verify ~= "peer"
    local ok, res, code = pcall(https.request, params)
    if not ok then return nil, tostring(res) end
    code = tonumber(code)
    local text = table.concat(sink)
    if not code or code < 200 or code >= 300 then return nil, string.format("HTTP %s %s", tostring(code or res), text:sub(1, 120)) end
    return text
end

function RMORevision:rpc(fn, args)
    local text, err = self:request(SB .. "/rest/v1/rpc/" .. fn, "POST", args)
    if not text then
        if err and err:find("bad_token") then return nil, _("The Kindle code was not accepted. Make a new one in the app (Settings > Kindle).") end
        return nil, err
    end
    local ok, data = pcall(JSON.decode, text)
    if not ok then return nil, "bad reply" end
    return data
end

function RMORevision:askCode()
    local dlg
    dlg = InputDialog:new{
        title = _("Kindle code from the app"), input = "", input_hint = "XXXX-XXXX-XXXX",
        buttons = { { { text = _("Cancel"), callback = function() UIManager:close(dlg) end },
                      { text = _("Link"), is_enter_default = true, callback = function()
                          local code = (dlg:getInputText() or ""):upper():gsub("[^A-Z0-9]", "")
                          UIManager:close(dlg)
                          if #code ~= 12 then self:say(_("The code has 12 letters and numbers.")); return end
                          self.settings:saveSetting("token", code); self.settings:flush()
                          self:syncNow(true)
                      end } } },
    }
    UIManager:show(dlg); dlg:onShowKeyboard()
end

function RMORevision:syncNow(verbose)
    local token = self.settings:readSetting("token")
    if not token then if verbose then self:say(_("Not linked yet. Choose: Link to the app.")) end; return end
    NetworkMgr:runWhenOnline(function()
        local s = self.settings
        local pending = s:readSetting("pending", {})
        local pushed = false
        if next(pending) then
            local n, err = self:rpc("rmo_kindle_push", { tok = token, ratings = pending })
            if err then self:say(_("Could not send ratings: ") .. tostring(err)); return end
            pushed = true
        end
        local d, err = self:rpc("rmo_kindle_pull", { tok = token })
        if not d then self:say(_("Could not sync: ") .. tostring(err)); return end
        -- the server now holds what was pushed, so drop the pending ratings it returns as 'kindle'
        local fromServer = Core.mergeItems(tonumber(d.resetAt) or 0, d.items or {}, d.kindle or {})
        s:saveSetting("items", fromServer)
        s:saveSetting("resetAt", tonumber(d.resetAt) or 0)
        local studied = {}
        for id, t in pairs(d.topics or {}) do if type(t) == "table" and type(t.studied) == "string" and t.studied ~= "" then studied[id] = t.studied end end
        s:saveSetting("studied", studied)
        s:saveSetting("skipRev", d.skipRev or {})
        if pushed then s:saveSetting("pending", {}) end
        s:saveSetting("last_sync", os.date("%Y-%m-%d %H:%M"))
        s:flush()
        if verbose then self:say(string.format(_("Synced. %s"), self:revisionLabel()) .. (self.unverified and ("\n" .. _("(HTTPS certificates were not checked on this device.)")) or "")) end
    end)
end

function RMORevision:updateCards()
    NetworkMgr:runWhenOnline(function()
        local text, err = self:request(CARDS_URL, "GET", nil, {})
        if not text then self:say(_("Could not download cards: ") .. tostring(err)); return end
        local ok, data = pcall(JSON.decode, text)
        if not (ok and data and data.topics) then self:say(_("The cards file looked wrong.")); return end
        local f = io.open(self.cardsFile, "wb")
        if not f then self:say(_("Could not save the cards file.")); return end
        f:write(text); f:close(); self.cards = nil
        local n = 0; for _, t in ipairs(data.topics) do n = n + #t.cards end
        self:say(string.format(_("Cards updated: %d cards."), n))
    end)
end

return RMORevision
