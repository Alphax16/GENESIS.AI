"use client";
import { useEffect, useState } from "react";
import { FaSpider } from "react-icons/fa6";
import { jsPDF } from "jspdf";
import { isAnyValueEmpty } from "../../utils/dsUtils";
import instance from "@/config/instance";
import AnalyticsModal from "@/components/AnalyticsModal";
import Spinner from "@/components/Spinner";
import AlertBox from "@/components/AlertBox";

const ContentAnalyzerPage = () => {
	const [siteURL, setSiteURL] = useState("");
	const [maxDepth, setMaxDepth] = useState(1);
	const [loading, setLoading] = useState(false);

	const [showResponse, setShowResponse] = useState(false);
	const [contentResponse, setContentResponse] = useState({
		genre: "",
		unethicalContent: "",
	});
	const [classificationsData, setClassificationsData] = useState([]);
	const [showAnalytics, setShowAnalytics] = useState(false);
	const [alert, setAlert] = useState({ type: "", title: "", message: "" });

	useEffect(() => {
		console.log("Content Response:", contentResponse);
	}, [contentResponse]);

	useEffect(() => {
		console.log("Alert:", alert);
	}, [alert]);

	const handleButtonClick = () => {
		if (!siteURL.trim()) {
			setAlert({
				type: "warning",
				title: "Warning!",
				message: "Please enter a URL.",
			});
			return;
		}

		const urlRegex =
			/^(https?:\/\/)?((?:\d{1,3}\.){3}\d{1,3}|([^\s:/?#]+\.?)+(\/[^\s]*)?)$/i;

		if (!urlRegex.test(siteURL)) {
			setAlert({
				type: "error",
				title: "Error!",
				message: "Please enter a valid URL.",
			});
			return;
		}

		setLoading(true);
		const fetchData = async () => {
			try {
				const response = await instance.post("/content-analyzer", {
					siteURL,
					maxDepth,
				});
				const data = response.data;
				if (data.status === 200) {
					setContentResponse({
						genre: data.response.genre,
						unethicalContent: data.response.unethicalContent,
					});
					setClassificationsData(data.classifications);
					setShowResponse(true);
				}
			} catch (err) {
				console.log("Error:", err);
				return { error: err };
			} finally {
				setLoading(false); // Set loading state back to false
			}
		};
		fetchData();
	};

	const handleKeyPress = (event: any) => {
		if (event.key === "Enter") {
			handleButtonClick();
		}
	};

	const handleDownloadBtnClick = async () => {
		const pdf = new jsPDF();

		// Add title
		pdf.setFontSize(24);
		pdf.text("Website Content Analysis Report", 20, 20);

		// Add table headers
		pdf.setFontSize(12);
		pdf.text("Analysis", 40, 40);
		pdf.text("Details", 120, 40);

		// Add borders to table headers
		pdf.rect(20, 40, 80, 10);
		pdf.rect(100, 40, 80, 10);

		// Add genre and unethical content in table format
		pdf.text("Genre", 40, 50);
		pdf.text(contentResponse.genre, 120, 50);

		pdf.text("Unethical Content", 40, 60);
		pdf.text(contentResponse.unethicalContent, 120, 60);

		// Add borders to table cells
		pdf.rect(20, 40, 80, 40);
		pdf.rect(100, 40, 80, 40);

		pdf.text("Classifications:", 40, 90);

		classificationsData.map((item, index) => {
			pdf.text("Image Type", 40, 100 * (index + 1));
			// @ts-ignore
			pdf.text(item.imageType.toUpperCase(), 120, 100 * (index + 1));

			pdf.text("Positiveness", 40, 120 * (index + 1));
			// @ts-ignore
			pdf.text(item.positiveness.toString(), 120, 120 * (index + 1));

			// Add borders to table cells
			pdf.rect(20, 40, 80, 70);
			pdf.rect(100, 40, 80, 70);

			pdf.text("Negativeness", 40, 130 * (index + 1));
			// @ts-ignore
			pdf.text(item.negativeness.toString(), 120, 130 * (index + 1));

			// Add borders to table cells
			pdf.rect(20, 40, 90, 100);
			pdf.rect(100, 40, 90, 100);
		});

		// Save the PDF
		pdf.save("Content_Analysis_Report.pdf");
	};

	const handleAnalyticsBtnClick = () => {
		setShowAnalytics(!showAnalytics);
	};

	const handleClose = () => {
		setShowResponse(false);
	};

	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h2 className="text-3xl font-extrabold text-[#fff] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
				Website (Multi-Media) Content Anaylzer
			</h2>
			{/* <div className="bg-cover bg-center bg-no-repeat h-screen" style={{ backgroundImage: "url('https://i.ibb.co/dP6Km46/Crawler-Image.png')" }}> */}
			<div className="mt-20">
				<div>
					<label
						htmlFor="website"
						className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
					>
						Website URL
					</label>
					{/* <div className="inline-block"> */}
					<div className="flex">
						<input
							type="url"
							id="website"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[40vw]"
							placeholder="Enter site URL to anaylze."
							required
							value={siteURL}
							onChange={(e) => {
								setSiteURL(e.target.value);
							}}
							onKeyDown={handleKeyPress}
						/>
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-transparent border-none cursor-pointer"
							onClick={handleButtonClick}
						>
							<FaSpider width={"10"} height={"10"} />
						</button>
					</div>
					<div className="mt-14">
						<label
							htmlFor="max-depth"
							className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
						>
							Max-Depth
						</label>
						<input
							type="number"
							id="max-depth"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center w-32"
							placeholder="Enter max-content depth."
							required
							min={1}
							// defaultValue={1}
							value={maxDepth}
							onChange={(e) => {
								setMaxDepth(parseInt(e.target.value));
							}}
							onKeyDown={handleKeyPress}
						/>
					</div>
				</div>
			</div>

			<div>
				{alert.type && (
					<AlertBox
						type={alert.type}
						title={alert.title}
						message={alert.message}
					/>
				)}
			</div>

			<div>
				{loading && (
					<div className="spinner ">
						<Spinner />
					</div>
				)}
			</div>

			{showResponse && !isAnyValueEmpty(contentResponse) && (
				<div>
					{/* // <!-- Main modal --> */}
					<div
						id="default-modal"
						tabIndex={-1}
						aria-hidden="true"
						// className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
						className="mt-[10%] ml-[28%] overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
					>
						<div className="relative p-4 w-full max-w-2xl max-h-full">
							{/* <!-- Modal content --> */}
							<div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
								{/* <!-- Modal header --> */}
								<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
										Multi-media Content Analysis Report
									</h3>
									<button
										type="button"
										className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
										data-modal-hide="default-modal"
										onClick={handleClose}
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
								{/* <!-- Modal body --> */}
								<div className="p-4 md:p-5 space-y-4">
									<p className="text-lg leading-relaxed text-gray-500 dark:text-white">
										Genre :
									</p>

									<p className="text-lg font-bold leading-relaxed text-gray-500 dark:text-gray-400">
										{contentResponse.genre.toUpperCase()}
									</p>

									<p className="text-lg leading-relaxed text-gray-500 dark:text-white">
										Unethical Textual Content :
									</p>
									<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
										{contentResponse.unethicalContent}
									</p>

									<div>
										<p className="text-lg leading-relaxed text-gray-500 dark:text-white">
											Image Classification Results :
										</p>
										<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
											Average Image Positiveness Score of
											the Site(%): &nbsp;
											{Math.round(
												((classificationsData
													.map((data) => {
														// @ts-ignore
														return data.positiveness;
													})
													.reduce(
														(partialSum, a) =>
															partialSum + a,
														0
													) *
													100) /
													classificationsData.length +
													Number.EPSILON) *
													100
											) / 100 || 0}
											%
										</p>
										<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
											Average Image Negativeness Score of
											the Site(%): &nbsp;
											{Math.round(
												((classificationsData
													.map((data) => {
														// @ts-ignore
														return data.negativeness;
													})
													.reduce(
														(partialSum, a) =>
															partialSum + a,
														0
													) *
													100) /
													classificationsData.length +
													Number.EPSILON) *
													100
											) / 100 || 0}
											%
										</p>
									</div>
								</div>
								{/* <!-- Modal footer --> */}
								<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
									<button
										data-modal-hide="default-modal"
										type="button"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										onClick={handleDownloadBtnClick}
									>
										Download Report
									</button>
									<button
										data-modal-hide="default-modal"
										type="button"
										className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
										onClick={handleAnalyticsBtnClick}
									>
										View Analytics
									</button>
								</div>
							</div>
						</div>
					</div>
					<div>
						{showAnalytics && (
							<div>
								<AnalyticsModal
									title="Generated Data Analytics"
									data={classificationsData}
									handleClose={handleAnalyticsBtnClick}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</main>
	);
};

export default ContentAnalyzerPage;
