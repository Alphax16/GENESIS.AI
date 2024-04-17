import type { NextApiRequest, NextApiResponse } from "next";
import { crawlWebsite } from "@/utils/scrape";
import { scrapeAllContents } from "@/utils/scrapeContent";
import { downloadAndSaveImage, extractAndSaveImagesFromWebsite, saveDataToCSV } from "@/utils/saveData";
import { convertCSVtoJSON } from "@/utils/csvToJson";
import { generateResponse } from "@/workers/generateResponse";
import { cleanCsv } from "@/utils/dataCleaner";
import { extractGenreNContent } from "@/utils/stringFormatter";
import { extractImagesFromWebsite } from "@/utils/dataExtractor";
import { classifyImages, classifyImagesV2 } from "@/workers/classifyImages";
import fs from "fs";
import path from "path";
import { classifyText } from "@/workers/classifyTexts";

type ResponseData = {
	message: string;
};

// export default async function handler(
export async function POST(
	req: Request,
	res: NextApiResponse<ResponseData>
) {
	try {
        const body = await req.json();
        // console.log(`req.body: ${req.body} & type: ${typeof req.body}`);
        // console.log(`Keys: ${Object.keys(req.body)} & Values: ${Object.values(req.body)}`)

		// const { siteURL, maxDepth } = req.body;
		const { siteURL, maxDepth } = body;
		
        console.log(`siteURL: ${siteURL}, maxDepth: ${maxDepth}`);

		// /*
		const allLinks = await crawlWebsite(siteURL, new Set(), maxDepth);
        console.log('allLinks:', allLinks);

		const scrapedContents = await scrapeAllContents(allLinks);

		console.log("List of all scraped contents:");
		console.log(scrapedContents);

		// let csvData = await saveDataToCSV(
		// 	scrapedContents!,
		// 	"./src/app/data/text/raw/scraped_contents.csv"
		// );

		let csvData = await saveDataToCSV(
			scrapedContents!,
			null,
			false
		);
		console.log('csvData-53:', csvData);
		console.log("Data saved successfully as CSV!");

		// await cleanCsv(
		// 	"./src/app/data/text/raw/scraped_contents.csv",
		// 	"./src/app/data/text/cleaned/scraped_contents.csv",
		// 	["Content"]
		// );
		csvData = await cleanCsv(
			null,
			null,
			["Content"],
			csvData
		);
		console.log('csvData-67:', csvData);
		console.log("CSV Data cleaned successfully!");

		// const jsonData = await convertCSVtoJSON(
		// 	"./src/app/data/text/cleaned/scraped_contents.csv"
		// );
		const jsonData = await convertCSVtoJSON(
			null, null,  csvData, false
		);

		console.log('jsonData-77:', jsonData);

		const content = jsonData
			.map((data) => {
				// @ts-ignore
				if (data.Content !== undefined) return data.Content;
			})
			.filter((content) => content !== undefined);
		console.log("Content:", content);

		// const images = extractImageURLs(content);
		// console.log('Images-62:', images);

		// const response = await contentFilterWorker(content);
		const response = await generateResponse(content[0]);
		console.log("Model Repsonse:", response);

        // const genre = response.result;

        const genreNContent = extractGenreNContent(response.result.response);
        console.log('Genre and Content:', genreNContent);
		// */
		
		let classificationResponses: any = [];


		//! Images AI-

		// const images = await extractImagesFromWebsite(siteURL, maxDepth);
		// console.log('Images-82:', images);
		// images.map((img, index) => {
		// 	downloa(img, "./src/app/data/images/raw");
		// });
		// console.log();


		// const response = { success: true };		// For testing purposes
		// const genreNContent = { genre: 'Test genre ', unethicalContent: 'Test content' };		// For testing purposes

		// const imagePaths = await extractAndSaveImagesFromWebsite(siteURL, maxDepth, "./src/app/data/images/raw");
		const folderPath = "./src/app/data/images/raw"
		await extractAndSaveImagesFromWebsite(siteURL, maxDepth, folderPath);

		let imagePaths = await fs.promises.readdir(folderPath);
		imagePaths = imagePaths.map(file => path.join(process.cwd(), folderPath, file));
		console.log('imagePaths-89:', imagePaths);

		// console.log('CLASSIFIED IMAGES-107:', await classifyImagesV2(imagePaths[0]));
		
		classificationResponses = imagePaths.map((path) => {
			return classifyImages(path);
			// return classifyImagesV2(path);
		});

		classificationResponses = await Promise.all(classificationResponses);

		// classificationResponses = classificationResponses.map((resp: any) => {
		// 	return JSON.stringify(resp);
		// });
		
		let results = classificationResponses.map((resp: any) => {
			console.log('resp-121:', resp);
			return resp.reduce((max: any, curr: any) => {
				return curr.score > max.score ? curr : max
			});
		});

		results = results.map((result: any, index:number ) => {
			const textClasses = classifyText(result.label);
			// results[index].positiveness = textClasses?.positiveness;
			// results[index].positiveness = textClasses?.negativeness;
			return textClasses;
		});

		results = await Promise.all(results);

		console.log('results-135:', results);


		// results = await Promise.all(results);
		// results = results.map((result: any, index:number ) => {
		// 	results[index].positiveness = result?.positiveness;
		// 	results[index].positiveness = result?.negativeness;
		// 	return results;
		// });

		// // console.log('Classification Responses-124:', classificationResponses);
		// console.log('results-125:', results);

        if (response.success) {
            // return Response.json({ response: JSON.parse(`{${response.result.response}}`), status: 200 });
            // return Response.json({ response: genreNContent, classifications: classificationResponses, status: 200 });
            return Response.json({ response: genreNContent, classifications: results, status: 200 });
        }
        else
            return Response.json({ error: response.errors, status: 500 });
		// }
	} catch (err) {
		console.log("Error:", err);
		return Response.json({ error: err, status: 500 });
	}
}

// export const config = {
// 	api: {
// 		externalResolver: true,
// 		// Specify the custom route path
// 		path: "/content-analyzer",
// 	},
// };
