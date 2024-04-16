import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { LineGraphProps } from "@/interfaces/charts/LineGraphPropTypes";

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"line"> | null>(null);

	useEffect(() => {
		if (!chartRef.current || !data) return;

		if (chartInstanceRef.current) {
			chartInstanceRef.current.destroy(); // Destroy the previous chart instance
		}

		const chartData = {
			labels: data.map((item) => item.date),
			datasets: [
				{
					label: "Data",
					borderColor: "rgba(75, 192, 192, 1)",
					data: data.map((item) => item.value),
				},
			],
		};

		const config = {
			type: "line",
			data: chartData,
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		};

		if (!chartRef.current) return;

        // @ts-ignore
		chartInstanceRef.current = new Chart(chartRef.current, config);

		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy(); // Cleanup chart instance on unmount
			}
		};
	}, [data]);

	return <canvas ref={chartRef} />;
};

export default LineGraph;
