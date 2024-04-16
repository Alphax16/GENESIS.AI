import axios, { AxiosResponse } from "axios";
// import * as cheerio from "cheerio";
import cheerio, { load } from "cheerio";

type ExtractedLinks = Set<string>;

async function fetchHTML(url: string): Promise<string | any> {
	try {
		const response: AxiosResponse<string> = await axios.get(url);
		return response.data;
	} catch (err) {
		console.error(`Failed to fetch ${url}: ${err}`);
		return Promise.resolve(err);
	}
}

function extractLinks(html: string, baseUrl: string): string[] {
	const $ = load(html);
	const links: string[] = [];
	$("a[href]").each((_: any, element: any) => {
		const link: string = $(element).attr("href")!.trim();
		links.push(new URL(link, baseUrl).href);
	});
	return links;
}

async function crawlWebsite(
	url: string,
	visited: Set<string> = new Set(),
	maxDepth: number,
	depth: number = 0,
	allLinks: ExtractedLinks = new Set()
): Promise<string[]> {
	try {
		if (depth > maxDepth) {
			return Array.from(allLinks);
		}

		visited.add(url);
		const html: string | null = await fetchHTML(url);
		if (html) {
			console.log(`Scraping: ${url}`);
			const links: string[] = extractLinks(html, url);
			allLinks.add(url);
			const promises: Promise<string[]>[] = [];
			for (const link of links) {
				if (!visited.has(link)) {
					promises.push(
						crawlWebsite(link, visited, maxDepth, depth + 1, allLinks)
					);
				}
			}
			await Promise.all(promises);
		}
		return Array.from(allLinks);
	} catch (err) {
		console.log('Error:', err);
		return Promise.resolve([]);
	}
}

export { crawlWebsite, fetchHTML, extractLinks };
