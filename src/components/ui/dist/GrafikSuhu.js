// page.tsx
"use client";
"use strict";
exports.__esModule = true;
var dynamic_1 = require("next/dynamic");
var AreaChart = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('@/components/ui/AreaChart'); }); }, { ssr: false });
function GrafikSuhu() {
    return (React.createElement("main", { className: "p-6 bg-white dark:bg-zinc-900 border rounded-lg h-full w-full" },
        React.createElement("div", { className: "w-full bg-white rounded-lg dark:bg-zinc-900" },
            React.createElement("div", { className: "flex justify-between" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-base font-normal text-gray-500 dark:text-gray-400" }, "Suhu"),
                    React.createElement("h5", { className: "leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2" }, "28 \u00B0C")),
                React.createElement("div", { className: "flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center" },
                    "12%",
                    React.createElement("svg", { className: "w-3 h-3 ms-1", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 10 14" },
                        React.createElement("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13V1m0 0L1 5m4-4 4 4" }))))),
        React.createElement(AreaChart, { id: "area-chart2", color: "#FFC107" })));
}
exports["default"] = GrafikSuhu;
