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

export function RiwayatTable() {
    const {
        overallStatus,
        averageScore,
        historyData,
        historyParameter,
    } = useDataContext();

    // State for combined history
    const [combinedHistory, setCombinedHistory] = useState<any[]>([]);

    useEffect(() => {
        const mergeData = () => {
            const merged: any[] = [];
            let i = 0;
            let j = 0;

            while (i < historyParameter.length && j < historyData.length) {
                const param = historyParameter[i];
                const ayam = historyData[j];

                // Compare timestamps, merge data if they match
                if (new Date(param.timestamp).getTime() === new Date(ayam.timestamp).getTime()) {
                    merged.push({
                        ...param,
                        ...ayam,
                    });
                    i++;
                    j++;
                } else if (new Date(param.timestamp).getTime() < new Date(ayam.timestamp).getTime()) {
                    merged.push({
                        ...param,
                        jumlah_ayam: null,
                        mortalitas: null,
                        usia_ayam: null,
                    });
                    i++;
                } else {
                    merged.push({
                        ...ayam,
                        temperature: null,
                        humidity: null,
                        ammonia: null,
                        averageScore: null,
                    });
                    j++;
                }
            }

            // Add remaining items from historyParameter
            while (i < historyParameter.length) {
                merged.push({
                    ...historyParameter[i],
                    jumlah_ayam: null,
                    mortalitas: null,
                    usia_ayam: null,
                });
                i++;
            }

            // Add remaining items from historyData
            while (j < historyData.length) {
                merged.push({
                    ...historyData[j],
                    temperature: null,
                    humidity: null,
                    ammonia: null,
                    averageScore: null,
                });
                j++;
            }

            setCombinedHistory(merged);
        };

        mergeData();
    }, [historyParameter, historyData]); // Re-run when either history changes

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
                                <TableCell className="font-medium">{averageScore}</TableCell>
                                <TableCell>
                                    <Button variant={getButtonVariant(overallStatus.text)}>
                                        {overallStatus.text}
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
