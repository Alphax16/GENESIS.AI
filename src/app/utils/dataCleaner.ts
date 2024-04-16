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
	inputFilename: string,
	outputFilename: string,
	columnsToClean: string[] | null = null
) {
	return new Promise<void>((resolve, reject) => {
		const writeStream = fs.createWriteStream(outputFilename);
		let headerWritten = false;

		if (columnsToClean !== null) {
			fs.createReadStream(inputFilename)
				.pipe(csv())
				.on("data", (row: any) => {
					if (!headerWritten) {
						writeStream.write(`${Object.keys(row).join(",")}\n`);
						headerWritten = true;
					}

					Object.keys(row).forEach((column) => {
						if (
							!columnsToClean ||
							columnsToClean.includes(column)
						) {
							if (row[column]) {
								row[column] = cleanText(row[column]);
							}
						}
					});

					const cleanedRow = Object.values(row).join(",");
					writeStream.write(`${cleanedRow}\n`);
				})
				.on("end", () => {
					writeStream.end();
					resolve();
				})
				.on("error", (err: any) => {
					reject(err);
				});
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

export {
	cleanText,
	cleanCsv,
};
