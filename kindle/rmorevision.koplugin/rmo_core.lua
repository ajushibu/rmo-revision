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

-- Same rule as rate() in app.js. Returns the new item, or nil when 'got' is refused (not due yet).
function Core.rate(items, id, how, today, nowMs)
    if how == "got" and Core.state(items, id, today) == "ok" then return nil end
    local prev = items[id]
    local n = 0
    if how == "got" then n = math.min(((prev and tonumber(prev.step)) or 0) + 1, #Core.INT - 1) end
    return { step = n, due = Core.addDays(today, Core.INT[n + 1]), last = today, r = how, t = nowMs }
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
