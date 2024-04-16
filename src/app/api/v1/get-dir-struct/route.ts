// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type FileStructure = {
	[key: string]: "file" | FileStructure | string;
};

export async function GET(
	req: NextApiRequest,
	res: NextApiResponse<FileStructure>
) {
	try {
		const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
		const folder = searchParams.get("folder");
		const directoryPath = folder
			? path.join(process.cwd(), folder as string)
			: process.cwd();
		const fileStructure = getDirectoryStructure(directoryPath);
		return res.json(fileStructure, 200);
	} catch (error) {
		console.error("Error:", error);
		return res.json({ error: error.message }, 500);
	}
}

function getDirectoryStructure(directoryPath: string): FileStructure {
	const files = fs.readdirSync(directoryPath);

	const fileStructure: FileStructure = {};

	files.forEach((file) => {
		const filePath = path.join(directoryPath, file);
		const stats = fs.statSync(filePath);

		if (stats.isFile()) {
			fileStructure[file] = "file";
		} else if (stats.isDirectory()) {
			if (file !== "node_modules" && file !== ".next") {
				fileStructure[file] = getDirectoryStructure(filePath);
			} else {
				fileStructure[file] = "skipped";
			}
		}
	});

	return fileStructure;
}
