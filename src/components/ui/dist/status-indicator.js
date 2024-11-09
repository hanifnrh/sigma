"use strict";
exports.__esModule = true;
var utils_1 = require("@/lib/utils");
var StatusIndicator = function (_a) {
    var _b = _a.children, children = _b === void 0 ? "Status" : _b, _c = _a.status, status = _c === void 0 ? "error" : _c, className = _a.className;
    var backgroundColors = {
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        info: "bg-blue-500"
    };
    var textColors = {
        success: "text-green-800",
        warning: "text-yellow-800",
        error: "text-red-800",
        info: "text-blue-800"
    };
    var backgroundClass = backgroundColors[status];
    var textClass = textColors[status];
    return (React.createElement("div", { className: utils_1.cn("relative flex items-center gap-x-2.5 bg-popover px-6 py-3 cursor-pointer", textClass, className) },
        React.createElement("div", { className: utils_1.cn("h-3 w-3 animate-ping rounded-full", backgroundClass) }),
        React.createElement("div", { className: utils_1.cn("absolute left-6 h-3 w-3 rounded-full", backgroundClass) }),
        React.createElement("span", null, children)));
};
exports["default"] = StatusIndicator;
