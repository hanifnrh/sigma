import { useDataContext } from "@/components/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "./button";

// Helper function to round timestamp to the nearest 5 minutes
const roundToNearest5Minutes = (timestamp: Date) => {
    const minutes = Math.floor(timestamp.getMinutes() / 5) * 5;
    timestamp.setMinutes(minutes, 0, 0);
    return timestamp;
};

export function RiwayatTable() {
    const {
        historyData,
        historyParameter,
    } = useDataContext();

    // State for combined history
    const [combinedHistory, setCombinedHistory] = useState<any[]>([]);

    useEffect(() => {
        const mergeData = () => {
            const dataMap = new Map<string, any>(); // Gunakan Map untuk menghindari duplikasi berdasarkan timestamp
            let lastData: any = {}; // Initialize with empty object for storing the last valid data
    
            // Helper untuk membulatkan ke 5 menit terdekat
            const roundToNearest5Minutes = (date: Date) => {
                const ms = 1000 * 60 * 5; // 5 menit dalam milidetik
                return new Date(Math.round(date.getTime() / ms) * ms);
            };
    
            // Proses data parameter
            historyParameter.forEach((param) => {
                const roundedTimestamp = roundToNearest5Minutes(new Date(param.timestamp));
                const key = roundedTimestamp.toISOString();
    
                // Jika tidak ada data sebelumnya, gunakan data default atau sebelumnya
                if (!dataMap.has(key)) {
                    dataMap.set(key, {
                        timestamp: roundedTimestamp,
                        temperature: param.temperature,
                        humidity: param.humidity,
                        ammonia: param.ammonia,
                        score: param.score,
                        status: param.status,
                        jumlah_ayam: lastData.jumlah_ayam || null,
                        mortalitas: lastData.mortalitas || null,
                        usia_ayam: lastData.usia_ayam || null,
                    });
                } else {
                    // Update data jika sudah ada
                    const existingData = dataMap.get(key);
                    dataMap.set(key, {
                        ...existingData,
                        temperature: param.temperature,
                        humidity: param.humidity,
                        ammonia: param.ammonia,
                        score: param.score,
                        status: param.status,
                    });
                }
    
                // Simpan data terakhir
                lastData = { ...dataMap.get(key) };
            });
    
            // Proses data ayam
            historyData.forEach((ayam) => {
                const roundedTimestamp = roundToNearest5Minutes(new Date(ayam.timestamp));
                const key = roundedTimestamp.toISOString();
    
                if (!dataMap.has(key)) {
                    // Tambahkan data ayam baru
                    dataMap.set(key, {
                        timestamp: roundedTimestamp,
                        temperature: null,
                        humidity: null,
                        ammonia: null,
                        score: null,
                        status: null,
                        jumlah_ayam: ayam.jumlah_ayam,
                        mortalitas: ayam.mortalitas,
                        usia_ayam: ayam.usia_ayam,
                    });
                } else {
                    // Update data ayam jika sudah ada
                    const existingData = dataMap.get(key);
                    dataMap.set(key, {
                        ...existingData,
                        jumlah_ayam: ayam.jumlah_ayam, // Overwrite dengan nilai terbaru
                        mortalitas: ayam.mortalitas,
                        usia_ayam: ayam.usia_ayam,
                    });
                }
    
                // Simpan data terakhir
                lastData = { ...dataMap.get(key) };
            });
    
            // Pastikan data yang tidak ada pembaruan tetap muncul dengan data terakhir
            const mergedArray = Array.from(dataMap.values()).sort(
                (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
            );
    
            // Update state dengan data yang sudah digabungkan
            setCombinedHistory(mergedArray);
        };
    
        mergeData();
    }, [historyParameter, historyData]);
    
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
                            <TableHead>Jumlah Ayam</TableHead>
                            <TableHead>Mortalitas</TableHead>
                            <TableHead>Usia Ayam</TableHead>
                            <TableHead>Skor</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {combinedHistory.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{new Date(item.timestamp).toLocaleString()}</TableCell>
                                <TableCell className="font-medium">{item.temperature}</TableCell>
                                <TableCell className="font-medium">{item.humidity}</TableCell>
                                <TableCell className="font-medium">{item.ammonia}</TableCell>
                                <TableCell className="font-medium">{item.jumlah_ayam}</TableCell>
                                <TableCell className="font-medium">{item.mortalitas}</TableCell>
                                <TableCell className="font-medium">{item.usia_ayam}</TableCell>
                                <TableCell className="font-medium">{item.score}</TableCell>
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
