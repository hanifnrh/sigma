import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "./button";

const head = [
    {
        waktu: "12/10/2024 05:00",
        suhu: "27°C",
        kelembapan: "55%",
        amonia: "19ppm",
        skor: "93.8",
        status: "Sangat Baik",
    },
    {
        waktu: "12/10/2024 05:00",
        suhu: "27°C",
        kelembapan: "55%",
        amonia: "19ppm",
        skor: "87.0",
        status: "Baik",
    },
    {
        waktu: "12/10/2024 05:00",
        suhu: "27°C",
        kelembapan: "55%",
        amonia: "19ppm",
        skor: "70.5",
        status: "Buruk",
    },
    {
        waktu: "12/10/2024 05:00",
        suhu: "27°C",
        kelembapan: "55%",
        amonia: "19ppm",
        skor: "40.3",
        status: "Bahaya",
    },
];

export function RiwayatTable() {
    // Fungsi untuk menentukan varian button
    const getButtonVariant = (status: string) => {
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

    return (
        <Card className="w-full">
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Waktu</TableHead>
                            <TableHead>Suhu</TableHead>
                            <TableHead>Kelembapan</TableHead>
                            <TableHead>Amonia</TableHead>
                            <TableHead>Skor</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {head.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.waktu}</TableCell>
                                <TableCell className="font-medium">{item.suhu}</TableCell>
                                <TableCell className="font-medium">{item.kelembapan}</TableCell>
                                <TableCell className="font-medium">{item.amonia}</TableCell>
                                <TableCell className="font-medium">{item.skor}</TableCell>
                                <TableCell>
                                    <Button variant={getButtonVariant(item.status)}>
                                        {item.status}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
