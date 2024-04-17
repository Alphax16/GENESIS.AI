interface Content {
    URL: string;
    Title: string;
    Content: string;
}

interface CSVRow {
	[key: string]: string | number;
}

export type { Content, CSVRow };
