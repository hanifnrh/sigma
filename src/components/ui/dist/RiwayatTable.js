"use strict";
exports.__esModule = true;
exports.RiwayatTable = void 0;
var card_1 = require("@/components/ui/card");
var table_1 = require("@/components/ui/table");
var button_1 = require("./button");
var head = [
    {
        waktu: "12/10/2024 05:00",
        suhu: "27°C",
        kelembapan: "55%",
        amonia: "19ppm",
        skor: "93.8",
        status: "Sangat Baik"
    },
    {
        waktu: "12/10/2024 05:00",
        suhu: "27°C",
        kelembapan: "55%",
        amonia: "19ppm",
        skor: "87.0",
        status: "Baik"
    },
    {
        waktu: "12/10/2024 05:00",
        suhu: "27°C",
        kelembapan: "55%",
        amonia: "19ppm",
        skor: "70.5",
        status: "Buruk"
    },
    {
        waktu: "12/10/2024 05:00",
        suhu: "27°C",
        kelembapan: "55%",
        amonia: "19ppm",
        skor: "40.3",
        status: "Bahaya"
    },
];
function RiwayatTable() {
    // Fungsi untuk menentukan varian button
    var getButtonVariant = function (status) {
        switch (status) {
            case "Sangat Baik":
                return "sangatBaik";
            case "Baik":
                return "baik";
            case "Buruk":
                return "buruk";
            case "Bahaya":
                return "bahaya";
            default:
                return "default";
        }
    };
    return (React.createElement(card_1.Card, { className: "w-full" },
        React.createElement(card_1.CardContent, null,
            React.createElement(table_1.Table, null,
                React.createElement(table_1.TableHeader, null,
                    React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableHead, null, "Waktu"),
                        React.createElement(table_1.TableHead, null, "Suhu"),
                        React.createElement(table_1.TableHead, null, "Kelembapan"),
                        React.createElement(table_1.TableHead, null, "Amonia"),
                        React.createElement(table_1.TableHead, null, "Skor"),
                        React.createElement(table_1.TableHead, null, "Status"))),
                React.createElement(table_1.TableBody, null, head.map(function (item, index) { return (React.createElement(table_1.TableRow, { key: index },
                    React.createElement(table_1.TableCell, { className: "font-medium" }, item.waktu),
                    React.createElement(table_1.TableCell, { className: "font-medium" }, item.suhu),
                    React.createElement(table_1.TableCell, { className: "font-medium" }, item.kelembapan),
                    React.createElement(table_1.TableCell, { className: "font-medium" }, item.amonia),
                    React.createElement(table_1.TableCell, { className: "font-medium" }, item.skor),
                    React.createElement(table_1.TableCell, null,
                        React.createElement(button_1.Button, { variant: getButtonVariant(item.status) }, item.status)))); }))))));
}
exports.RiwayatTable = RiwayatTable;
