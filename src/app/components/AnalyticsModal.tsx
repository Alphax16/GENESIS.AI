import React, { useState } from "react";
import BarGraph from "./charts/BarGraph";
import PieChart from "./charts/PieChart";
import LineGraph from "./charts/LineGraph";
import Chart from "chart.js/auto";
import { AnalyticsModalType } from "@/interfaces/AnalyticsModalTypes";

const AnalyticsModal: React.FC<AnalyticsModalType> = ({ title, data, handleClose }) => {
	const [graphType, setGraphType] = useState("bar"); // Default graph type is bar

	const [chartDataUrl, setChartDataUrl] = useState("");

	// Render the selected chart component based on the graph type
	const renderChart = () => {
		switch (graphType) {
			case "bar":
				return <BarGraph key="bar" data={data} />;
			case "pie":
				// return <PieChart key="pie" data={data} />;
				return (
					<PieChart
						data={data.map((item) => ({
							imageType: item.imageType,
							count: item.positiveness + item.negativeness,
						}))}
					/>
				);
			case "line":
				return (
					<LineGraph
						data={data.map((item) => ({
							date: item.imageType,
							value: item.positiveness + item.negativeness,
						}))}
					/>
				);
			default:
				return null;
		}
	};

	// Function to handle download button click
	const handleDownload = () => {
		// Get the base64 data URL from the chart canvas
		const canvas = document.querySelector("canvas");
		const dataUrl = canvas!.toDataURL();

		// Set the data URL to state
		setChartDataUrl(dataUrl);

		// Create a temporary link element
		const link = document.createElement("a");
		link.href = dataUrl;
		link.download = "chart.png";
		document.body.appendChild(link);

		// Trigger the click event to start download
		link.click();

		// Clean up
		document.body.removeChild(link);
	};

	return (
		<div>
			<div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
				<div className="w-full max-w-lg bg-white shadow-lg rounded-md p-6 relative">
					<div className="flex items-center pb-3 border-b text-black">
						<h3 className="text-xl font-bold flex-1">
							{title || "Generated Data Analytics"}
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={handleClose} // Call handleClose when the close button is clicked
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close</span>
						</button>
					</div>
					<div className="chart-container my-6">{renderChart()}</div>
					<div className="border-t flex justify-between pt-6">
						<div>
							<button
								type="button"
								onClick={() => setGraphType("bar")} // Set graph type to bar
								className={`px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-${
									graphType === "bar"
										? "gray-300"
										: "gray-200"
								} hover:bg-gray-300 active:bg-gray-200`}
							>
								Bar Graph
							</button>
							<button
								type="button"
								onClick={() => setGraphType("pie")} // Set graph type to pie
								className={`px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-${
									graphType === "pie"
										? "gray-300"
										: "gray-200"
								} hover:bg-gray-300 active:bg-gray-200`}
							>
								Pie Chart
							</button>
							<button
								type="button"
								onClick={() => setGraphType("line")} // Set graph type to line
								className={`px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-${
									graphType === "line"
										? "gray-300"
										: "gray-200"
								} hover:bg-gray-300 active:bg-gray-200`}
							>
								Line Graph
							</button>
						</div>
						<button
							type="button"
							onClick={handleDownload} // Handle download button click
							className="px-6 py-2 rounded-md text-white text-sm border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
						>
							Download Chart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsModal;
