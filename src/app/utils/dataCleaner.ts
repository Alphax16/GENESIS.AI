import { Writable } from "stream";

const fs = require("fs");
const csv = require("csv-parser");
const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder("utf8");

function cleanText(text: string) {
	text = text.toLowerCase();

	text = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");

	text = text.replace(
		/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
		""
	);

	text = text.replace(/[^\w\s]/g, "");

	text = text.replace(/\s+/g, " ").trim();

	return text;
}

async function cleanCsv(
	inputFilename: string | null,
	outputFilename: string | null,
	columnsToClean: string[] | null = null,
	inputData: object[] | null = null
): Promise<any[]> {
	return new Promise<any[]>((resolve, reject) => {
		let dataStream;
		const cleanedData: any[] = [];

		try {
			if (inputData) {
				console.log("Using provided input data:", inputData);
                // Directly operate on the provided inputData array
                const cleanedData = inputData.map((row) => {
                    const cleanedRow: any = {};
                    Object.keys(row).forEach((column) => {
                        if (columnsToClean === null || columnsToClean.includes(column)) {
                            // Type assertion to avoid TypeScript error
                            cleanedRow[column] = cleanText((row as any)[column]);
                        } else {
                            cleanedRow[column] = (row as any)[column];
                        }
                    });
                    return cleanedRow;
                });
                // No need to write to file, just resolve with cleaned data
                resolve(cleanedData);
			} else if (inputFilename) {
				console.log("Reading input data from file:", inputFilename);
				// Otherwise, read from a file
				dataStream = fs.createReadStream(inputFilename);
			} else {
				throw new Error("No input data or file provided");
			}

			let writeStream: Writable | null = null;
			if (outputFilename) {
				console.log("Writing output data to file:", outputFilename);
				writeStream = fs.createWriteStream(outputFilename);
			}

			let headerWritten = false;

			console.log('dataStream-59:', dataStream);

			dataStream
				.pipe(csv())
				.on("data", (row: any) => {
					console.log("Processing data row:", row);
					if (!headerWritten && writeStream) {
						writeStream.write(`${Object.keys(row).join(",")}\n`);
						headerWritten = true;
					}

					// Clean the data
					Object.keys(row).forEach((column) => {
						if (
							columnsToClean === null ||
							columnsToClean.includes(column)
						) {
							console.log(`Original ${column}:`, row[column]);
							if (row[column]) {
								row[column] = cleanText(row[column]);
								console.log(`Cleaned ${column}:`, row[column]);
							}
						}
					});

					// Add cleaned row to the array
					cleanedData.push(row);

					// Write the cleaned row to the output file if writeStream is set
					if (writeStream) {
						const cleanedRow = Object.values(row)
							.map((columnValue) => {
								if (
									typeof columnValue === "string" &&
									columnValue.includes(",")
								) {
									return `"${columnValue}"`; // Quote fields that contain commas
								}
								return columnValue;
							})
							.join(",");

						writeStream.write(`${cleanedRow}\n`);
					}
				})
				.on("end", () => {
					console.log("Data processing completed");
					if (writeStream) {
						writeStream.end();
					}
					resolve(cleanedData); // Resolve the promise after all data has been processed
				})
				.on("error", (err: any) => {
					console.error("Error processing data:", err);
					reject(err);
				});
		} catch (err) {
			console.error("Error initializing data stream:", err);
			reject(err);
		}
	});
}

async function main() {
	try {
		const inputFilename = "input.csv";
		const outputFilename = "cleaned_output.csv";
		const columnsToClean = ["text_column1", "text_column2"];

		await cleanCsv(inputFilename, outputFilename, columnsToClean);
		console.log(
			"CSV cleaning complete. Cleaned data written to",
			outputFilename
		);
	} catch (err) {
		console.error("An error occurred:", err);
	}
}

// main();

export { cleanText, cleanCsv };
