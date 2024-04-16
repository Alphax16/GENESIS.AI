import fs from 'fs';
import path from 'path';
import axios from 'axios';
import cheerio, { load } from 'cheerio';
import url from 'url';

let serialNumber = 0;

async function fetchHTMLContent(url: string): Promise<string> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching HTML content:', error);
        return '';
    }
}

async function extractImagesFromHTML(html: string, baseUrl: string, maxDepth: number): Promise<string[]> {
    const $ = load(html);
    const images: string[] = [];

    // Extract images from the current page
    $('img').each((_, element) => {
        const imageUrl = $(element).attr('src');
        if (imageUrl) {
            const absoluteImageUrl = url.resolve(baseUrl, imageUrl);
            images.push(absoluteImageUrl);
        }
    });

    // Recursively extract images from linked pages
    if (maxDepth > 0) {
        const links: string[] = [];
        $('a').each((_, element) => {
            const link = $(element).attr('href');
            if (link && link.startsWith('http')) {
                links.push(link);
            }
        });

        for (const link of links) {
            const linkedHtml = await fetchHTMLContent(link);
            const linkedImages = await extractImagesFromHTML(linkedHtml, baseUrl, maxDepth - 1);
            images.push(...linkedImages);
        }
    }

    return images;
}

async function extractImagesFromWebsite(url: string, maxDepth: number): Promise<string[]> {
    try {
        const html = await fetchHTMLContent(url);
        const baseUrl = url;
        const images = extractImagesFromHTML(html, baseUrl, maxDepth);
        return images;
    } catch (error) {
        console.error('Error extracting images from website:', error);
        return [];
    }
}

// // Example usage
// const websiteUrl = 'https://example.com';
// const maxDepth = 2; // Set maximum recursion depth
// const folderPath = './images'; // Specify the folder where images will be saved
// extractAndSaveImagesFromWebsite(websiteUrl, maxDepth, folderPath);

export { fetchHTMLContent, extractImagesFromHTML, extractImagesFromWebsite };
