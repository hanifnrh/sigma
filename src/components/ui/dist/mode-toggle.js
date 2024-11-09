"use client";
"use strict";
exports.__esModule = true;
exports.ModeToggle = void 0;
var lucide_react_1 = require("lucide-react");
var next_themes_1 = require("next-themes");
function ModeToggle() {
    var setTheme = next_themes_1.useTheme().setTheme;
    return (React.createElement("div", null,
        React.createElement(lucide_react_1.Sun, { onClick: function () { return setTheme("dark"); }, className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-4xl" }),
        React.createElement(lucide_react_1.Moon, { onClick: function () { return setTheme("light"); }, className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-4xl" }),
        React.createElement("span", { className: "sr-only" }, "Toggle theme")));
}
exports.ModeToggle = ModeToggle;
