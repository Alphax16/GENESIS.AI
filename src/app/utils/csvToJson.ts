// import { CSVRow } from "@/interfaces/CSVDataTypes";
import { Content } from "@/interfaces/CSVDataTypes";
import csv from "csvtojson";
import fs from "fs";
import path from "path";

async function convertCSVtoJSON(
	csvFilePath: string | null,
	outputFilePath: string | null,
	data: object[] | null,
	fileMode: boolean = true
): Promise<object[] | Content[]> {
	try {
		let jsonData: object[];

		if (fileMode && csvFilePath) {
			// Read from CSV file and convert to JSON
			jsonData = await new Promise((resolve, reject) => {
				const results: object[] = [];

				fs.createReadStream(csvFilePath)
					.pipe(csv())
					.on("data", (data: object) => results.push(data))
					.on("end", () => resolve(results))
					.on("error", reject);
			});
		} else if (!fileMode && data !== null) {
			// Use provided data directly if not null
			jsonData = data;
		} else {
			throw new Error("Invalid parameters provided");
		}

		if (outputFilePath && fileMode) {
			// Save JSON data to output file
			const jsonString = JSON.stringify(jsonData, null, 2);
			await fs.promises.writeFile(outputFilePath, jsonString, "utf8");
			console.log(
				`Conversion complete. JSON file saved as ${outputFilePath}`
			);
		}

		const contentData: Content[] = jsonData.map((obj: any) => {
			return {
				URL: obj.URL,
				Title: obj.Title,
				Content: obj.Content,
			};
		});

		// return jsonData;
		return contentData;
	} catch (err) {
		console.error("Error converting CSV to JSON:", err);
		throw err;
	}
}

export { convertCSVtoJSON };
