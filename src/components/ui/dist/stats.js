"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var io5_1 = require("react-icons/io5");
var tb_1 = require("react-icons/tb");
var THRESHOLDS = {
    ammonia: { optimal: 20, good: 25, bad: 30 },
    temperature: { veryGood: [26, 32], good: [[20, 25], [33, 34]], bad: [[18, 19], [35, 36]] },
    humidity: { veryGood: [62, 68], good: [[60, 61], [69, 70]], bad: [[58, 59], [71, 72]] }
};
var StatsWidget = function (_a) {
    var onNewNotification = _a.onNewNotification, onDataUpdate = _a.onDataUpdate, onOverallStatusChange = _a.onOverallStatusChange;
    var _b = react_1.useState(18), ammonia = _b[0], setAmmonia = _b[1];
    var _c = react_1.useState(35), temperature = _c[0], setTemperature = _c[1];
    var _d = react_1.useState(40), humidity = _d[0], setHumidity = _d[1];
    var _e = react_1.useState({
        ammonia: { text: "Sangat Baik", color: "text-green-500" },
        temperature: { text: "Baik", color: "text-blue-500" },
        humidity: { text: "Baik", color: "text-blue-500" },
        overall: { text: "Baik", color: "text-blue-500" }
    }), status = _e[0], setStatus = _e[1];
    var _f = react_1.useState({
        ammonia: "",
        temperature: "",
        humidity: ""
    }), warnings = _f[0], setWarnings = _f[1];
    var getTemperatureIcon = function (temp) {
        return temp > 32 ? React.createElement(fa_1.FaTemperatureHigh, null) : React.createElement(fa_1.FaTemperatureLow, null);
    };
    var checkTemperatureStatus = function (temp) {
        if (temp >= THRESHOLDS.temperature.veryGood[0] && temp <= THRESHOLDS.temperature.veryGood[1]) {
            return { text: "Sangat Baik", color: "text-green-500" };
        }
        if ((temp >= THRESHOLDS.temperature.good[0][0] && temp <= THRESHOLDS.temperature.good[0][1]) ||
            (temp >= THRESHOLDS.temperature.good[1][0] && temp <= THRESHOLDS.temperature.good[1][1])) {
            return { text: "Baik", color: "text-blue-500" };
        }
        if ((temp >= THRESHOLDS.temperature.bad[0][0] && temp <= THRESHOLDS.temperature.bad[0][1]) ||
            (temp >= THRESHOLDS.temperature.bad[1][0] && temp <= THRESHOLDS.temperature.bad[1][1])) {
            return { text: "Buruk", color: "text-yellow-500" };
        }
        return { text: "Bahaya", color: "text-red-500" };
    };
    var checkHumidityStatus = function (hum) {
        if (hum >= THRESHOLDS.humidity.veryGood[0] && hum <= THRESHOLDS.humidity.veryGood[1]) {
            return { text: "Sangat Baik", color: "text-green-500" };
        }
        if ((hum >= THRESHOLDS.humidity.good[0][0] && hum <= THRESHOLDS.humidity.good[0][1]) ||
            (hum >= THRESHOLDS.humidity.good[1][0] && hum <= THRESHOLDS.humidity.good[1][1])) {
            return { text: "Baik", color: "text-blue-500" };
        }
        if ((hum >= THRESHOLDS.humidity.bad[0][0] && hum <= THRESHOLDS.humidity.bad[0][1]) ||
            (hum >= THRESHOLDS.humidity.bad[1][0] && hum <= THRESHOLDS.humidity.bad[1][1])) {
            return { text: "Buruk", color: "text-yellow-500" };
        }
        return { text: "Bahaya", color: "text-red-500" };
    };
    react_1.useEffect(function () {
        var updatedStatus = __assign({}, status);
        var updatedWarnings = __assign({}, warnings);
        // Check ammonia
        if (ammonia < THRESHOLDS.ammonia.optimal) {
            updatedStatus.ammonia = { text: "Sangat Baik", color: "text-green-500" };
            updatedWarnings.ammonia = "";
        }
        else if (ammonia >= THRESHOLDS.ammonia.optimal && ammonia < THRESHOLDS.ammonia.good) {
            updatedStatus.ammonia = { text: "Baik", color: "text-blue-500" };
            updatedWarnings.ammonia = "";
        }
        else if (ammonia >= THRESHOLDS.ammonia.good && ammonia < THRESHOLDS.ammonia.bad) {
            updatedStatus.ammonia = { text: "Buruk", color: "text-yellow-500" };
            updatedWarnings.ammonia = "Segera bersihkan kandang!";
            onNewNotification({
                parameter: "Amonia",
                status: "Buruk",
                timestamp: new Date(),
                message: "Segera bersihkan kandang!",
                icon: React.createElement(tb_1.TbAtom2Filled, null),
                color: updatedStatus.ammonia.color
            });
        }
        else {
            updatedStatus.ammonia = { text: "Bahaya", color: "text-red-500" };
            updatedWarnings.ammonia = "Segera bersihkan kandang!";
            onNewNotification({
                parameter: "Amonia",
                status: "Bahaya",
                timestamp: new Date(),
                message: "Segera bersihkan kandang!",
                icon: React.createElement(tb_1.TbAtom2Filled, null),
                color: updatedStatus.ammonia.color
            });
        }
        // Check temperature
        updatedStatus.temperature = checkTemperatureStatus(temperature);
        if (updatedStatus.temperature.text === "Bahaya" || updatedStatus.temperature.text === "Buruk") {
            var statusText = updatedStatus.temperature.text;
            updatedWarnings.temperature = "Segera atur suhu kandang!";
            onNewNotification({
                parameter: "Suhu",
                status: statusText,
                timestamp: new Date(),
                message: updatedWarnings.temperature,
                icon: getTemperatureIcon(temperature),
                color: updatedStatus.temperature.color
            });
        }
        else {
            updatedWarnings.temperature = "";
        }
        // Check humidity
        updatedStatus.humidity = checkHumidityStatus(humidity);
        if (updatedStatus.humidity.text === "Bahaya" || updatedStatus.humidity.text === "Buruk") {
            var statusText = updatedStatus.humidity.text;
            updatedWarnings.humidity = "Segera atur ventilasi kandang!";
            onNewNotification({
                parameter: "Kelembapan",
                status: statusText,
                timestamp: new Date(),
                message: updatedWarnings.humidity,
                icon: React.createElement(io5_1.IoWater, null),
                color: updatedStatus.humidity.color
            });
        }
        else {
            updatedWarnings.humidity = "";
        }
        // Set overall status
        var allStatuses = [updatedStatus.ammonia, updatedStatus.temperature, updatedStatus.humidity];
        if (allStatuses.some(function (s) { return s.text === "Bahaya"; })) {
            updatedStatus.overall = { text: "Bahaya", color: "text-red-500" };
        }
        else if (allStatuses.some(function (s) { return s.text === "Buruk"; })) {
            updatedStatus.overall = { text: "Buruk", color: "text-yellow-500" };
        }
        else if (allStatuses.some(function (s) { return s.text === "Baik"; })) {
            updatedStatus.overall = { text: "Baik", color: "text-blue-500" };
        }
        else {
            updatedStatus.overall = { text: "Sangat Baik", color: "text-green-500" };
        }
        setStatus(updatedStatus);
        setWarnings(updatedWarnings);
        onOverallStatusChange(updatedStatus.overall);
        onDataUpdate([
            { Parameter: "Amonia", Value: ammonia + " ppm", Status: updatedStatus.ammonia.text, Timestamp: new Date() },
            { Parameter: "Suhu", Value: temperature + " \u00B0C", Status: updatedStatus.temperature.text, Timestamp: new Date() },
            { Parameter: "Kelembapan", Value: humidity + "%", Status: updatedStatus.humidity.text, Timestamp: new Date() },
        ]);
    }, [ammonia, temperature, humidity]);
    return (React.createElement("div", { className: "flex justify-between items-center w-full p-4" },
        React.createElement("div", { className: "w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" }, [
            { label: "Amonia", value: ammonia + " ppm", icon: React.createElement(tb_1.TbAtom2Filled, null), status: status.ammonia, warning: warnings.ammonia },
            { label: "Suhu", value: temperature + " \u00B0C", icon: getTemperatureIcon(temperature), status: status.temperature, warning: warnings.temperature },
            { label: "Kelembapan", value: humidity + "%", icon: React.createElement(io5_1.IoWater, null), status: status.humidity, warning: warnings.humidity },
        ].map(function (_a) {
            var label = _a.label, value = _a.value, icon = _a.icon, status = _a.status, warning = _a.warning;
            return (React.createElement("div", { key: label, className: "h-44 relative flex flex-grow flex-col items-center justify-center rounded-[10px] border-[1px] border-gray-200 bg-white shadow-md p-7" },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("div", { className: "flex h-[90px] w-auto items-center" },
                        React.createElement("div", { className: "rounded-full bg-lightPrimary dark:bg-navy-700" },
                            React.createElement("span", { className: "flex items-center text-brand-500 dark:text-white text-4xl" }, icon))),
                    React.createElement("div", { className: "ml-4 flex flex-col justify-center" },
                        React.createElement("p", { className: "font-dm text-xl font-medium text-gray-600 dark:text-white" }, label),
                        React.createElement("h4", { className: "text-3xl body-bold " + status.color }, value))),
                warning && React.createElement("p", { className: status.color + " text-sm text-center" }, warning)));
        }))));
};
exports["default"] = StatsWidget;
