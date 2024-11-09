"use client";
"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var Dynamic = function () {
    var circles = Array.from({ length: 4 });
    return (React.createElement("div", { className: "relative h-10 w-10 overflow-hidden rounded-lg" },
        React.createElement("div", { className: "absolute z-10 flex h-full w-full items-end justify-center gap-x-[3px] p-2 bg-blend-difference" }, circles.map(function (_, index) { return (React.createElement(framer_motion_1.motion.div, { key: index, animate: {
                height: [6, 16, 6],
                backgroundColor: ["white", "white", "white"]
            }, transition: {
                duration: 1.2,
                delay: (1.2 / 3) * index,
                repeat: Infinity,
                ease: "easeOut"
            }, className: "w-1.5 shrink-0 rounded-full" })); }))));
};
exports["default"] = Dynamic;
