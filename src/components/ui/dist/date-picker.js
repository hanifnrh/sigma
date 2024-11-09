"use client";
"use strict";
exports.__esModule = true;
exports.DatePickerDemo = void 0;
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var React = require("react");
var button_1 = require("@/components/ui/button");
var calendar_1 = require("@/components/ui/calendar");
var popover_1 = require("@/components/ui/popover");
var utils_1 = require("@/lib/utils");
function DatePickerDemo() {
    var _a = React.useState(), date = _a[0], setDate = _a[1];
    return (React.createElement(popover_1.Popover, null,
        React.createElement(popover_1.PopoverTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline", className: utils_1.cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground") },
                React.createElement(lucide_react_1.Calendar, null),
                date ? date_fns_1.format(date, "PPP") : React.createElement("span", null, "Pick a date"))),
        React.createElement(popover_1.PopoverContent, { className: "w-auto p-0" },
            React.createElement(calendar_1.Calendar, { mode: "single", selected: date, onSelect: setDate, initialFocus: true }))));
}
exports.DatePickerDemo = DatePickerDemo;
