// PieChart.js
// @ts-nocheck
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart: React.FC<any> = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !data) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy(); // Destroy the previous chart instance
        }

        const chartData = {
            labels: data.map((item) => item.imageType),
            datasets: [
                {
                    label: "Image Type",
                    backgroundColor: [
                        "red",
                        "green",
                        "blue",
                        "yellow",
                        "orange",
                    ],
                    data: data.map((item) => item.count),
                },
            ],
        };

        const config = {
            type: "pie",
            data: chartData,
        };

        chartInstanceRef.current = new Chart(chartRef.current, config);

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy(); // Cleanup chart instance on unmount
            }
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default PieChart;
