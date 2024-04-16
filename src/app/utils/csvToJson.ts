import csv from "csvtojson";
import fs from "fs";
import path from "path";

async function convertCSVtoJSON(csvFilePath: string, outputFilePath = null) {
	try {
		const jsonObj = await csv().fromFile(csvFilePath);

		if (outputFilePath === null) {
			return jsonObj;
		}

		const jsonString = JSON.stringify(jsonObj, null, 2);

		fs.writeFile(outputFilePath, jsonString, "utf8", (err) => {
			if (err) {
				console.error("Error writing JSON to file:", err);
			} else {
				console.log(
					"Conversion complete. JSON file saved as",
					outputFilePath
				);
			}
		});

		return jsonObj;
	} catch (err) {
		console.error("Error converting CSV to JSON:", err);
		throw err; // Rethrow the error to handle it elsewhere if needed
	}
}

export { convertCSVtoJSON };
