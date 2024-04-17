// Import axios and cheerio with TypeScript imports.
import axios from "axios";
import cheerio, { load } from "cheerio";
import { fetchHTML } from "./scrape";
import { Content } from "@/interfaces/CSVDataTypes";

async function scrapeContent(url: string): Promise<Content | null> {
	try {
		const html = await fetchHTML(url);
		if (!html) return null;

		const $ = load(html);
		const title = $("title").text().trim();
		const content = $("body").text().trim();
		return { URL: url, Title: title, Content: content };
	} catch (err) {
		console.log('Error:', err);
		// return { error: err };
		return null;
	}
}

async function scrapeAllContents(urls: string[]): Promise<Content[] | null> {
	try {
		const contents: Content[] = [];
		for (const url of urls) {
			const content = await scrapeContent(url);
			if (content) contents.push(content);
		}
		return contents;
	} catch (err) {
		console.log('Error:', err);
		// return { error: err };
		return null;
	}
}

export { scrapeAllContents, scrapeContent };
