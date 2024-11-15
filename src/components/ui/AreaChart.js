"use client";

import ApexCharts from 'apexcharts';
import { useEffect, useState } from 'react';

const AreaChart = ({ id, color, apiUrl, dataType }) => {
    // Local state to hold the fetched data
    const [chartData, setChartData] = useState({ seriesData: [], categories: [] });

    // Fetch data based on the selected dataType (ammonia, temperature, humidity)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl); // Fetch data from the API
                const data = await response.json();

                // Get the last 5 data points from the API response
                const lastFiveData = data.slice(-5);

                // Extract the requested data type (ammonia, temperature, or humidity)
                const seriesData = lastFiveData.map(item => item[dataType]); // Use dynamic dataType
                const categories = lastFiveData.map(item => new Date(item.timestamp).toLocaleString()); // Timestamps as x-axis categories

                setChartData({ seriesData, categories });
            } catch (error) {
                console.error("Error fetching data:", error);
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
                fontFamily: "Poppins, sans-serif",
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
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
                    shade: color,  // Use the passed color
                    gradientToColors: [color], // Use the passed color
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 6,
                colors: [color], // Set the stroke color to the passed color
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
                    name: dataType ? `${dataType.charAt(0).toUpperCase()}${dataType.slice(1)}` : "Data",
                    data: chartData.seriesData,
                    color: color, // Use the passed color
                },
            ],
            xaxis: {
                categories: chartData.categories, // Use fetched timestamps as x-axis categories
                labels: {
                    show: false,  // Show x-axis labels (timestamps)
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                title: {
                    text: "Garis horizontal menunjukkan waktu", // Add the custom title for the x-axis
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
                    text: `Tingkat ${dataType ? `${dataType.charAt(0).toUpperCase()}${dataType.slice(1)}` : "Data"}`,
                    style: { fontFamily: "Body Light, sans-serif", fontWeight: "light", fontSize: "14px", color: "#333" },
                },
                labels: {
                    show: false, // Hide Y-axis labels
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
    }, [id, color, chartData, dataType]); // Re-run when chartData or dataType changes

    return (
        <div id={id} className="h-full" />
    );
};

export default AreaChart;
