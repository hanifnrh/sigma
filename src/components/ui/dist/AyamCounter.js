"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var input_1 = require("@/components/ui/input");
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var button_1 = require("./button");
var AyamCounter = function (_a) {
    var jumlahAyam = _a.jumlahAyam, onUpdateJumlahAyam = _a.onUpdateJumlahAyam, updateMortalitas = _a.updateMortalitas, farmingStarted = _a.farmingStarted;
    var _b = react_1.useState(0), ayamMati = _b[0], setAyamMati = _b[1];
    var _c = react_1.useState([]), history = _c[0], setHistory = _c[1];
    var handleAyamMatiChange = function (event) {
        var value = event.target.value;
        // Mengonversi nilai input menjadi angka tanpa nol di depan
        var parsedValue = parseInt(value, 10) || 0;
        setAyamMati(parsedValue);
    };
    var handleUpdateAyamMati = function () {
        var jumlahAyamBaru = jumlahAyam - ayamMati;
        onUpdateJumlahAyam(jumlahAyamBaru);
        updateMortalitas(ayamMati);
        setHistory(__spreadArrays(history, [ayamMati])); // Menyimpan riwayat
        setAyamMati(0); // Reset input
    };
    var handleUndo = function () {
        var lastValue = history.pop();
        if (lastValue !== undefined) {
            onUpdateJumlahAyam(jumlahAyam + lastValue);
            setHistory(__spreadArrays(history)); // Update history setelah undo
        }
    };
    return (react_1["default"].createElement("div", { className: "py-6 px-12 h-full flex justify-center items-center flex-col" },
        react_1["default"].createElement("h2", { className: "text-xl" }, "Kendali Jumlah Ayam"),
        react_1["default"].createElement("div", { className: "text-3xl font-bold my-4" }, jumlahAyam),
        react_1["default"].createElement("div", { className: "flex flex-col items-center mt-4" },
            react_1["default"].createElement(input_1.Input, { type: "number", placeholder: "Masukkan jumlah ayam mati", value: ayamMati || "", onChange: handleAyamMatiChange, className: "mb-4" }),
            react_1["default"].createElement(button_1.Button, { disabled: !farmingStarted, variant: 'blue', onClick: handleUpdateAyamMati, className: "mb-2 w-full" }, "Kurangi Jumlah Ayam"),
            react_1["default"].createElement(button_1.Button, { disabled: !farmingStarted, variant: 'baik', onClick: handleUndo, className: "w-full" },
                react_1["default"].createElement(fa_1.FaUndo, { className: "mr-2" }),
                "Undo"))));
};
exports["default"] = AyamCounter;
