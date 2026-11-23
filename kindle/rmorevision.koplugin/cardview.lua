--[[ Full-screen card for RMO Revision: topic + progress on top, big text in the middle (bold labels), big buttons at the bottom.
Built from the same widgets KOReader's own TextViewer uses. If anything here fails, main.lua falls back to the plain viewer. ]]
local Blitbuffer = require("ffi/blitbuffer")
local ButtonTable = require("ui/widget/buttontable")
local Device = require("device")
local Font = require("ui/font")
local FrameContainer = require("ui/widget/container/framecontainer")
local Geom = require("ui/geometry")
local GestureRange = require("ui/gesturerange")
local InputContainer = require("ui/widget/container/inputcontainer")
local ProgressWidget = require("ui/widget/progresswidget")
local ScrollHtmlWidget = require("ui/widget/scrollhtmlwidget")
local TextWidget = require("ui/widget/textwidget")
local UIManager = require("ui/uimanager")
local VerticalGroup = require("ui/widget/verticalgroup")
local VerticalSpan = require("ui/widget/verticalspan")
local Screen = Device.screen

local CardView = InputContainer:extend{
    topic = "", status = "", progress = 0, html = "", buttons = {}, font_size = 28, on_close = nil,
}

local CSS = [[
@page { margin: 0; }
body { margin: 0; line-height: 1.35; }
p { margin: 0 0 0.5em 0; }
.q { font-size: 1.2em; font-weight: bold; }
.qa { font-size: 1.05em; margin: 0.2em 0 0.2em 0.6em; }
.old { color: #555555; }
.ln { margin: 0 0 0.45em 0; }
.arrow { margin: 0 0 0.45em 1.2em; }
.note { margin: 0 0 0.45em 1.2em; color: #444444; font-style: italic; }
hr { border: 0; border-top: 1px solid #000000; margin: 0.6em 0; }
]]

function CardView:init()
    local sw, sh = Screen:getWidth(), Screen:getHeight()
    self.dimen = Geom:new{ w = sw, h = sh }
    self.covers_fullscreen = true
    if Device:isTouchDevice() then
        self.ges_events = { TapSwallow = { GestureRange:new{ ges = "tap", range = self.dimen } } }
    end
    local pad = Screen:scaleBySize(16)
    local w = sw - 2 * pad
    local gap = Screen:scaleBySize(8)

    local topic = TextWidget:new{ text = self.topic, face = Font:getFace("cfont", 22), bold = true, max_width = w }
    local status = TextWidget:new{ text = self.status, face = Font:getFace("cfont", 20), max_width = w }
    local bar = ProgressWidget:new{ width = w, height = Screen:scaleBySize(8), percentage = math.max(0, math.min(1, self.progress)),
        margin_h = 0, margin_v = 0, radius = 0, fillcolor = Blitbuffer.COLOR_BLACK }
    local btns = ButtonTable:new{ width = w, buttons = self.buttons, show_parent = self, zero_sep = true }

    local used = topic:getSize().h + status:getSize().h + bar:getSize().h + btns:getSize().h + 5 * gap + 2 * pad
    local body_h = math.max(Screen:scaleBySize(200), sh - used)
    self.body = ScrollHtmlWidget:new{
        html_body = self.html, css = CSS, default_font_size = Screen:scaleBySize(self.font_size),
        width = w, height = body_h, dialog = self,
    }
    self.frame = FrameContainer:new{
        background = Blitbuffer.COLOR_WHITE, bordersize = 0, padding = pad, margin = 0, radius = 0,
        VerticalGroup:new{
            align = "left",
            topic, status, VerticalSpan:new{ width = gap }, bar, VerticalSpan:new{ width = gap * 2 },
            self.body, VerticalSpan:new{ width = gap }, btns,
        },
    }
    self.frame.dimen = Geom:new{ w = sw, h = sh }
    self[1] = self.frame
end

function CardView:onTapSwallow() return true end

function CardView:onShow()
    UIManager:setDirty(self, function() return "full", self.dimen end)
    return true
end

function CardView:onCloseWidget()
    UIManager:setDirty(nil, function() return "full", self.dimen end)
end

return CardView
