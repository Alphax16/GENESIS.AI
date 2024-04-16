import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { BarGraphProps } from "@/interfaces/charts/BarGraphPropsTypes";

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart<"bar"> | null>(null);

    useEffect(() => {
        if (!chartRef.current || !data) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy(); // Destroy the previous chart instance
        }

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        chartInstanceRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.map((item) => item.imageType),
                datasets: [
                    {
                        label: "Positiveness",
                        data: data.map((item) => item.positiveness),
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: "Negativeness",
                        data: data.map((item) => item.negativeness),
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy(); // Cleanup chart instance on unmount
            }
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default BarGraph;
