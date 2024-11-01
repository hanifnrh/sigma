"use client";

import ApexCharts from 'apexcharts';
import { useEffect } from 'react';

const AreaChart = ({ id, color }) => {
    useEffect(() => {
        const options = {
            chart: {
                maxHeight: "100%",
                maxWidth: "100%",
                type: "area",
                fontFamily: "Inter, sans-serif",
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
                    name: "New users",
                    data: [6500, 6418, 6456, 6526, 6356, 6456],
                    color: color, // Use the passed color
                },
            ],
            xaxis: {
                categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
        };

        if (typeof window !== 'undefined' && document.getElementById(id)) {
            const chart = new ApexCharts(document.getElementById(id), options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [id, color]); // Add color to dependencies

    return (
        <div id={id} className="h-full" />
    );
};

export default AreaChart;
