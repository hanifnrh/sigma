"use client";
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var Navbar = function () {
    var _a = react_1.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var currentPath = navigation_1.usePathname();
    var toggleNavbar = function () {
        setIsOpen(!isOpen);
    };
    return (react_1["default"].createElement("div", { className: "top-0 w-full z-50 bg-white" },
        react_1["default"].createElement("nav", { className: "" },
            react_1["default"].createElement("div", { className: "flex flex-wrap items-center justify-between mx-auto p-4" },
                react_1["default"].createElement(link_1["default"], { href: "/", className: "flex items-center space-x-3 rtl:space-x-reverse" },
                    react_1["default"].createElement(image_1["default"], { src: "/sigmalogo.png", alt: "Logo", width: 256, height: 256, className: "h-16 w-auto" })),
                react_1["default"].createElement("button", { onClick: toggleNavbar, type: "button", className: "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ", "aria-controls": "navbar-default", "aria-expanded": isOpen },
                    react_1["default"].createElement("span", { className: "sr-only" }, "Open main menu"),
                    react_1["default"].createElement("svg", { className: "w-5 h-5", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 17 14" },
                        react_1["default"].createElement("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M1 1h15M1 7h15M1 13h15" }))),
                react_1["default"].createElement("div", { className: "w-full md:block md:w-auto " + (isOpen ? 'block' : 'hidden'), id: "navbar-default" },
                    react_1["default"].createElement("ul", { className: "items-center flex  flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0" },
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(link_1["default"], { href: "/dashboard", className: currentPath === "/dashboard" ? "block py-2 px-3 font-bold text-dark-500 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 " : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 " }, "Dasbor")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(link_1["default"], { href: "/about", className: currentPath === "/about" ? "block py-2 px-3 font-bold text-dark-500 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 " : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 " }, "Tentang")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(link_1["default"], { href: "/credits", className: currentPath === "/credits" ? "block py-2 px-3 font-bold text-dark-500 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 " : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 " }, "Bantuan")),
                        react_1["default"].createElement("li", null,
                            react_1["default"].createElement(link_1["default"], { href: "/credits", className: "" + (currentPath === "/credits" ? "block py-2 px-3 font-bold text-white bg-#8735EB;" : "block py-3 px-6 font-light text-white bg-customPurple hover:bg-purple-500 rounded-lg") }, "Masuk"))))))));
};
exports["default"] = Navbar;
