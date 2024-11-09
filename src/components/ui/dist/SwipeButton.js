"use client";
"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var SwipeButton = function (_a) {
    var className = _a.className, _b = _a.children, children = _b === void 0 ? "Cek Kandang" : _b, _c = _a.duration, duration = _c === void 0 ? 0.5 : _c;
    var sliderVariants = {
        open: {
            width: "176px",
            transition: {
                duration: duration,
                ease: [0.32, 0.72, 0, 1]
            }
        },
        closed: {
            width: "50px",
            transition: {
                duration: duration,
                ease: [0.32, 0.72, 0, 1]
            }
        }
    };
    var textVariants = {
        open: {
            opacity: 0,
            translateX: 10,
            transition: {
                duration: 0.4,
                easeIn: framer_motion_1.easeIn,
                bounce: 0
            }
        },
        closed: {
            opacity: 1,
            translateX: 20,
            transition: {
                duration: 0.4,
                easeOut: framer_motion_1.easeOut,
                bounce: 0
            }
        }
    };
    var buttonVariants = {
        open: {
            opacity: 1
        },
        closed: {
            opacity: 1
        }
    };
    var childrenVariants = {
        open: {
            opacity: 1,
            transition: {
                duration: 0.4,
                easeIn: framer_motion_1.easeIn
            }
        },
        closed: {
            opacity: 0,
            transition: {
                duration: 0.4,
                easeOut: framer_motion_1.easeOut
            }
        }
    };
    return (React.createElement(framer_motion_1.motion.button, { variants: buttonVariants, initial: "closed", whileHover: "open", whileTap: "open", className: "relative h-[50px] min-w-[180px] rounded-[10px] bg-popover shadow-[0_0_0_1px_hsl(var(--border))] " + className },
        React.createElement(framer_motion_1.motion.div, { variants: sliderVariants, className: "absolute left-[2px] top-[2px] z-10 flex h-[46px] items-center justify-center -space-x-2 rounded-lg bg-primary bg-[linear-gradient(180deg,rgba(94,120,224,1)_0%,rgba(62,56,169,1)_100%)]" },
            React.createElement(framer_motion_1.motion.div, { variants: childrenVariants, className: "h-7 w-7" },
                React.createElement(lucide_react_1.ChevronRight, { className: "h-full w-full animate-pulse text-popover" })),
            React.createElement(lucide_react_1.ChevronRight, { className: "h-7 w-7 animate-pulse text-popover delay-150" }),
            React.createElement(framer_motion_1.motion.div, { variants: childrenVariants, className: "h-7 w-7" },
                React.createElement(lucide_react_1.ChevronRight, { className: "h-full w-full animate-pulse text-popover delay-300" }))),
        React.createElement(framer_motion_1.motion.div, { variants: textVariants, className: "translate-x-5 text-medium font-medium text-popover-foreground" }, children)));
};
exports["default"] = SwipeButton;
