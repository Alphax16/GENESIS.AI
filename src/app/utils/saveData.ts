// pages/api/saveDataToCSV.js

import fs from "fs";
import path from "path";
import axios from "axios";
import { createObjectCsvWriter } from "csv-writer";
import {
	extractImagesFromHTML,
	extractImagesFromWebsite,
	fetchHTMLContent,
} from "./dataExtractor";

let serialNumber = 0;

async function saveDataToCSV(data: object[], filePath: string) {
	const csvWriter = createObjectCsvWriter({
		path: filePath,
		header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
	});
	await csvWriter.writeRecords(data);
	console.log(`Data saved to ${filePath}`);
}

async function downloadAndSaveImage(
	imageUrl: string,
	folderPath: string
): Promise<void> {
	const timestamp = new Date().getTime();
	const imageName = `image-${timestamp}-${serialNumber++}.jpg`; // Increment serial number here
	const imagePath = path.join(folderPath, imageName);

	const response = await axios.get(imageUrl, { responseType: "stream" });
	response.data.pipe(fs.createWriteStream(imagePath));

	return new Promise((resolve, reject) => {
		response.data.on("end", () => {
			console.log(
				`Image ${imageName} downloaded and saved successfully!`
			);
			resolve();
		});
		response.data.on("error", (error: any) => {
			console.error("Error downloading image:", error);
			reject(error);
		});
	});
}

async function downloadAndSaveImages(
	imageUrls: string[],
	folderPath: string
): Promise<void> {
	try {
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true });
		}

		const deletionPromises = await fs.promises.readdir(folderPath)
            .then(files => Promise.all(files.map(async file => await fs.promises.unlink(path.join(folderPath, file)))));
		
		console.log(`${folderPath} directory emptied successfully!`);

		const downloadPromises = imageUrls.map((imageUrl) => {
			return downloadAndSaveImage(imageUrl, folderPath);
		});

		await Promise.all(downloadPromises);
	} catch (err) {
		console.log("Error-75:", err);
	}
}

async function extractAndSaveImagesFromWebsite(
	url: string,
	maxDepth: number,
	folderPath: string
): Promise<string[]> {
	try {
		const images = await extractImagesFromWebsite(url, maxDepth);
		await downloadAndSaveImages(images, folderPath);
		return images.map((imageUrl, index) => {
			const timestamp = new Date().getTime();
			return path.join(folderPath, `image-${timestamp}-${index}.jpg`);
		});
	} catch (error) {
		console.error("Error extracting and saving images:", error);
		return [];
	}
}

async function saveMedia(
	mediaUrls: string[],
	mediaType: string,
	downloadDir: string
) {
	const downloadedFiles = [];
	for (const mediaUrl of mediaUrls) {
		try {
			const response = await axios.get(mediaUrl, {
				responseType: "arraybuffer",
			});
			const fileExtension = path.extname(mediaUrl).toLowerCase();
			const fileName = `${mediaType}_${new Date().getTime()}${fileExtension}`;
			const filePath = path.join(downloadDir, fileName);
			fs.writeFileSync(filePath, response.data);
			downloadedFiles.push(filePath);
			console.log(
				`Downloaded ${mediaType} from ${mediaUrl} to ${filePath}`
			);
		} catch (err: any) {
			console.error(
				`Error downloading ${mediaType} from ${mediaUrl}: ${err.message}`
			);
		}
	}
	return downloadedFiles;
}

export {
	saveDataToCSV,
	downloadAndSaveImage,
	extractAndSaveImagesFromWebsite,
	saveMedia,
};
