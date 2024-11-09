"use strict";
exports.__esModule = true;
var gi_1 = require("react-icons/gi");
var JumlahAyam = function () {
    return (React.createElement("div", { className: "flex justify-between items-center" },
        React.createElement("div", { className: "w-full flex" },
            React.createElement("div", { className: "relative flex flex-grow !flex-row flex-col items-center justify-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-black dark:text-white dark:shadow-none py-7 px-10" },
                React.createElement("div", { className: "flex h-[90px] w-auto flex-row items-center" },
                    React.createElement("div", { className: "rounded-full bg-lightPrimary  dark:bg-navy-700" },
                        React.createElement("span", { className: "flex items-center text-brand-500 dark:text-white" },
                            React.createElement(gi_1.GiRooster, { size: 50 })))),
                React.createElement("div", { className: "h-50 ml-4 flex w-auto flex-col justify-center" },
                    React.createElement("p", { className: "font-dm text-2xl font-medium text-gray-600 dark:text-white" }, "Jumlah Ayam"),
                    React.createElement("h4", { className: "text-4xl body-bold text-green-500 dark:text-green-700" }, "12.391"))))));
};
exports["default"] = JumlahAyam;
