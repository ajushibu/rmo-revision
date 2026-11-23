-- Pure Lua (5.1 / LuaJIT safe, no KOReader calls): the same spacing and queue rules as the RMO Revision app (app.js).
local Core = {}

Core.INT = { 1, 3, 7, 14, 28 }   -- days; same as INT in app.js

local function parse(s)
    local y, m, d = tostring(s):match("^(%d+)-(%d+)-(%d+)")
    return os.time({ year = tonumber(y), month = tonumber(m), day = tonumber(d), hour = 12 })
end

function Core.today() return os.date("%Y-%m-%d") end
function Core.diff(a, b) return math.floor((parse(a) - parse(b)) / 86400 + 0.5) end
function Core.addDays(s, n) return os.date("%Y-%m-%d", parse(s) + n * 86400) end

-- Newest-wins merge of rating sources (app state, Kindle ratings already on the server, ratings waiting on this Kindle).
-- Ratings older than resetAt were wiped by "Reset" in the app and are ignored.
function Core.mergeItems(resetAt, ...)
    local out = {}
    for _, src in ipairs({ ... }) do
        for id, it in pairs(src or {}) do
            local t = tonumber(it.t) or 0
            if t >= (resetAt or 0) and (not out[id] or (tonumber(out[id].t) or 0) < t) then out[id] = it end
        end
    end
    return out
end

-- 'new' (never rated), 'due' (due today or overdue) or 'ok' (not due yet)
function Core.state(items, id, today)
    local s = items[id]
    if not s then return "new" end
    return Core.diff(today, s.due) >= 0 and "due" or "ok"
end

-- topics: array of {id, name, cards = {{id,g,p,t,k}, ...}} in app order
-- studied: { [topicId] = "YYYY-MM-DD" } topics you have started in the app (new cards only come from these)
-- skipRev: { [cardId] = { on = bool } }
function Core.queue(topics, studied, skipRev, items, today)
    local due, fresh = {}, {}
    for _, t in ipairs(topics) do
        local started = type(studied[t.id]) == "string"
        for _, c in ipairs(t.cards) do
            local sk = skipRev[c.id]
            if not (sk and sk.on) then
                local st = Core.state(items, c.id, today)
                local e = { card = c, tid = t.id, topic = t.name }
                if st == "due" then due[#due + 1] = e
                elseif st == "new" and started then fresh[#fresh + 1] = e end
            end
        end
    end
    local all = {}
    for _, e in ipairs(due) do all[#all + 1] = e end
    for _, e in ipairs(fresh) do all[#all + 1] = e end
    return { due = due, fresh = fresh, all = all }
end

-- Same rule as rate() in app.js. Again: first rung (1 day). Hard: same rung. Good: up one. Easy: up two.
-- Older ratings used "shaky" (= again) and "got" (= good). Returns the new item, or nil when Good/Easy is refused (not due yet).
function Core.normHow(h)
    if h == "shaky" then return "again" elseif h == "got" then return "good" end
    return h
end

function Core.nextStep(prev, how)
    local p, top = prev or 0, #Core.INT - 1
    if how == "again" then return 0 elseif how == "hard" then return p elseif how == "good" then return math.min(p + 1, top) end
    return math.min(p + 2, top)
end

function Core.rate(items, id, how, today, nowMs)
    how = Core.normHow(how)
    if how ~= "again" and how ~= "hard" and how ~= "good" and how ~= "easy" then return nil end
    if (how == "good" or how == "easy") and Core.state(items, id, today) == "ok" then return nil end
    local prev = items[id]
    local n = Core.nextStep(prev and tonumber(prev.step) or nil, how)
    return { step = n, due = Core.addDays(today, Core.INT[n + 1]), last = today, r = how, t = nowMs }
end

-- Days until the card comes back for each answer (shown on the buttons)
function Core.days(items, id, how)
    local prev = items[id]
    return Core.INT[Core.nextStep(prev and tonumber(prev.step) or nil, how) + 1]
end

-- new, weak (last answer was Again), learning (rung 0 to 1), young (rung 2 to 3), mature (rung 4 = 28 days)
Core.LEVELS = { "all", "weak", "learning", "young", "mature", "new" }
Core.LEVEL_NAME = { all = "All", weak = "Weak", learning = "Learning", young = "Young", mature = "Mature", new = "New" }
function Core.level(items, id)
    local s = items[id]
    if not s then return "new" end
    if s.r == "again" or s.r == "shaky" then return "weak" end
    local n = tonumber(s.step) or 0
    if n >= 4 then return "mature" elseif n >= 2 then return "young" end
    return "learning"
end

-- Keep only the cards at one level ("all" keeps everything)
function Core.filter(q, items, level)
    if not level or level == "all" then return q end
    local function keep(list) local o = {} for _, e in ipairs(list) do if Core.level(items, e.card.id) == level then o[#o + 1] = e end end return o end
    local due, fresh = keep(q.due), keep(q.fresh)
    local all = {}
    for _, e in ipairs(due) do all[#all + 1] = e end
    for _, e in ipairs(fresh) do all[#all + 1] = e end
    return { due = due, fresh = fresh, all = all }
end

local function esc(x) return (tostring(x):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;")) end
Core.esc = esc

-- A card front is "Title" or "Title\n\226\128\162 ask\n\226\128\162 ask": title line, then the parts the answer covers
function Core.questionHtml(t, cls)
    local parts = {}
    for line in (tostring(t) .. "\n"):gmatch("(.-)\n") do if line ~= "" then parts[#parts + 1] = line end end
    local out = { '<p class="' .. cls .. '">' .. esc(parts[1] or "") .. "</p>" }
    for i = 2, #parts do out[#out + 1] = '<p class="qa ' .. (cls:match("old") and "old" or "") .. '">' .. esc(parts[i]) .. "</p>" end
    return table.concat(out, "\n")
end

-- HTML for the card screen: "Label: text" gets a bold label, arrows and (notes) are indented
function Core.answerHtml(k)
    local out = {}
    for line in (tostring(k) .. "\n"):gmatch("(.-)\n") do
        if line ~= "" then
            if line:match("^%s*\226\134\146") then out[#out + 1] = '<p class="arrow">' .. esc(line:gsub("^%s+", "")) .. "</p>"
            elseif line:match("^%s*%(") then out[#out + 1] = '<p class="note">' .. esc(line:gsub("^%s+", "")) .. "</p>"
            else
                local label, rest = line:match("^([^:]+):%s+(.+)$")
                if label and #label <= 40 then out[#out + 1] = '<p class="ln">\226\128\162 <b>' .. esc(label) .. ":</b> " .. esc(rest) .. "</p>"
                else out[#out + 1] = '<p class="ln">\226\128\162 ' .. esc(line) .. "</p>" end
            end
        end
    end
    return table.concat(out, "\n")
end

-- 2-line text for the answer: bullets for plain lines, arrows and notes left as they are
function Core.answerText(k)
    local out = {}
    for line in (tostring(k) .. "\n"):gmatch("(.-)\n") do
        if line ~= "" then
            if line:match("^%s*\226\134\146") or line:match("^%s*%(") then out[#out + 1] = "   " .. line
            else out[#out + 1] = "\226\128\162 " .. line end
        end
    end
    return table.concat(out, "\n")
end

return Core
