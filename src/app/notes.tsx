"use client";

import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";

const AreaChart = ({ id, color, apiUrl, dataType }) => {
    const [chartData, setChartData] = useState({ seriesData: [], categories: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const lastFiveData = data.slice(-5);
                const seriesData = lastFiveData.map(item => item[dataType]);
                const categories = lastFiveData.map(item => new Date(item.timestamp).toLocaleString());
                setChartData({ seriesData, categories });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [apiUrl, dataType]);

    useEffect(() => {
        const options = {
            chart: {
                maxHeight: "100%",
                maxWidth: "100%",
                type: "area",
                fontFamily: "Body, sans-serif",
                dropShadow: { enabled: false },
                toolbar: { show: false },
            },
            tooltip: {
                enabled: true,
                x: { format: "dd MMM yyyy HH:mm" }, // Format waktu di tooltip
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0,
                    shade: color,
                    gradientToColors: [color],
                },
            },
            dataLabels: { enabled: false },
            stroke: { width: 6, colors: [color] },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: { left: 2, right: 2, top: 0 },
            },
            series: [
                {
                    name: dataType ? `${dataType.charAt(0).toUpperCase()}${dataType.slice(1)}` : "Data",
                    data: chartData.seriesData,
                },
            ],
            xaxis: {
                categories: chartData.categories, // Tetap gunakan data kategori
                labels: { show: false }, // Sembunyikan label timestamp di sumbu-x
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: {
                title: {
                    text: `Tingkat ${dataType ? `${dataType.charAt(0).toUpperCase()}${dataType.slice(1)}` : "Data"}`,
                    style: { fontFamily: "Body, sans-serif", fontSize: "14px", color: "#333" },
                },
            },
        };

        if (typeof window !== "undefined" && document.getElementById(id)) {
            const chart = new ApexCharts(document.getElementById(id), options);
            chart.render();
            return () => chart.destroy();
        }
    }, [id, color, chartData, dataType]);

    return (
        <div className="h-full">
            <div id={id} />
            <p className="text-center text-sm mt-2">Garis horizontal menyatakan waktu</p>
        </div>
    );
};

export default AreaChart;
