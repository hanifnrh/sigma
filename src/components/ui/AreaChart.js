"use client";

import ApexCharts from 'apexcharts';
import { useEffect, useState } from 'react';

const AreaChart = ({ id, color, apiUrl, dataType }) => {
    // Local state to hold the fetched data
    const [chartData, setChartData] = useState({ seriesData: [], categories: [] });

    const dataTypeMapping = {
        ammonia: "Amonia",
        temperature: "Suhu",
        humidity: "Kelembapan",
        score: "Skor",
        mortalitas: "Mortalitas",
    };
    const dataTypeLabel = dataTypeMapping[dataType] || "Data";
    
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl); // Fetch data from the API
                const data = await response.json();
        
                // Log data to check the structure
                console.log('Fetched data:', data);
        
                // Sort data by timestamp in ascending order
                const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
                // Get the last 5 data points from the sorted data
                const lastFiveData = sortedData.slice(-5);
        
                // Extract the requested data type (ammonia, temperature, or humidity)
                const seriesData = lastFiveData.map(item => item[dataType]); // Use dynamic dataType
                const categories = lastFiveData.map(item => new Date(item.timestamp).toLocaleString()); // Timestamps as x-axis categories
        
                setChartData({ seriesData, categories });
            } catch (error) {
                // console.error("Error fetching data:", error);
                console.log('Data grafik kosong')
            }
        };
        
    
        fetchData();
    }, [apiUrl, dataType]); // Run this effect when apiUrl or dataType changes
    

    // Chart options using fetched data
    useEffect(() => {
        const options = {
            chart: {
                maxHeight: "100%",
                maxWidth: "100%",
                type: "area",
                fontFamily: "Body Light, sans-serif",
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
                y: {
                    formatter: function (value) {
                        // Format the value to two decimal places
                        return value.toFixed(2);
                    },
                },
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
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 6,
                colors: [color],
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: 0
                },
            },
            series: [
                {
                    name: dataTypeLabel,
                    data: chartData.seriesData,
                    color: color,
                },
            ],
            xaxis: {
                categories: chartData.categories,
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                title: {
                    text: "Garis horizontal menunjukkan waktu",
                    style: {
                        fontFamily: "Body Light, sans-serif",
                        fontWeight: "light",
                        fontSize: "14px",
                        color: "#333"
                    }
                }
            },
            yaxis: {
                title: {
                    text: `Tingkat ${dataTypeLabel}`,
                    style: { fontFamily: "Body Light, sans-serif", fontWeight: "light", fontSize: "14px", color: "#333" },
                },
                labels: {
                    show: false,
                },
            },
        };

        if (typeof window !== 'undefined' && document.getElementById(id)) {
            const chart = new ApexCharts(document.getElementById(id), options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [id, color, chartData, dataType]);

    return (
        <div id={id} className="h-full" />
    );
};

export default AreaChart;
