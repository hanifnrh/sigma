"use strict";
exports.__esModule = true;
exports.Aktivitas = void 0;
var card_1 = require("@/components/ui/card");
var table_1 = require("@/components/ui/table");
var items = [
    {
        aktivitas: "Jumlah ayam berkurang 1",
        waktu: "13/10/24 09.00"
    },
    {
        aktivitas: "Jumlah ayam berkurang 1",
        waktu: "13/10/24 09.00"
    },
    {
        aktivitas: "Jumlah ayam berkurang 1",
        waktu: "13/10/24 09.00"
    },
    {
        aktivitas: "Jumlah ayam berkurang 1",
        waktu: "13/10/24 09.00"
    },
    {
        aktivitas: "Jumlah ayam berkurang 1",
        waktu: "13/10/24 09.00"
    },
    {
        aktivitas: "Jumlah ayam berkurang 1",
        waktu: "13/10/24 09.00"
    },
];
function Aktivitas() {
    return (React.createElement(card_1.Card, { className: "w-full" },
        React.createElement(card_1.CardContent, null,
            React.createElement(table_1.Table, null,
                React.createElement(table_1.TableHeader, null,
                    React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableHead, null, "Aktivitas"),
                        React.createElement(table_1.TableHead, null, "Waktu"))),
                React.createElement(table_1.TableBody, null, items.map(function (item, index) { return (React.createElement(table_1.TableRow, { key: index },
                    React.createElement(table_1.TableCell, { className: "font-medium" }, item.aktivitas),
                    React.createElement(table_1.TableCell, { className: "font-medium" }, item.waktu))); }))))));
}
exports.Aktivitas = Aktivitas;
