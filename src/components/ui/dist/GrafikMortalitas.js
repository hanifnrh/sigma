// page.tsx
"use client";
"use strict";
exports.__esModule = true;
var dynamic_1 = require("next/dynamic");
var AreaChart = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('@/components/ui/AreaChart'); }); }, { ssr: false });
function GrafikMortalitas() {
    return (React.createElement("main", { className: "p-6 bg-white dark:bg-zinc-900 border rounded-lg w-full" },
        React.createElement("div", { className: "w-full bg-white rounded-lg dark:bg-zinc-900" },
            React.createElement("div", { className: "flex justify-between" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-base font-normal text-gray-500 dark:text-gray-400" }, "Mortalitas"),
                    React.createElement("h5", { className: "leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2" }, "0.5%")),
                React.createElement("div", { className: "flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center" }, "Normal"))),
        React.createElement(AreaChart, { id: "area-chart5", color: "#28A745" })));
}
exports["default"] = GrafikMortalitas;
