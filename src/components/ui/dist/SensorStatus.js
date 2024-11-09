"use strict";
exports.__esModule = true;
exports.SensorStatus = void 0;
var card_1 = require("@/components/ui/card");
var table_1 = require("@/components/ui/table");
var button_1 = require("./button");
var sensors = [
    {
        sensor: "Suhu & Kelembapan DHT22 - 1",
        status: "Aktif"
    },
    {
        sensor: "Suhu & Kelembapan DHT22 - 2",
        status: "Aktif"
    },
    {
        sensor: "Suhu & Kelembapan DHT22 - 3",
        status: "Mati"
    },
    {
        sensor: "Suhu & Kelembapan DHT22 - 4",
        status: "Aktif"
    },
    {
        sensor: "Amonia DFRobot MEMS NH3 - 1",
        status: "Mati"
    },
    {
        sensor: "Amonia DFRobot MEMS NH3 - 2",
        status: "Aktif"
    },
];
function SensorStatus() {
    return (React.createElement(card_1.Card, { className: "w-full" },
        React.createElement(card_1.CardContent, null,
            React.createElement(table_1.Table, null,
                React.createElement(table_1.TableHeader, null,
                    React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableHead, null, "Sensor"),
                        React.createElement(table_1.TableHead, null, "Status"))),
                React.createElement(table_1.TableBody, null, sensors.map(function (sensor, index) { return (React.createElement(table_1.TableRow, { key: index },
                    React.createElement(table_1.TableCell, { className: "font-medium" }, sensor.sensor),
                    React.createElement(table_1.TableCell, { className: "px-2 py-1 font-medium rounded-lg\"\n                                    : \"text-red-600 bg-red-100\"\n                                    }" },
                        React.createElement(button_1.Button, { variant: sensor.status === "Aktif" ? "aktif" : "mati" }, sensor.status)))); }))))));
}
exports.SensorStatus = SensorStatus;
