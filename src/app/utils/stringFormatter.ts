function splitWithLimit(
	inputText: string,
	pattern: RegExp,
	limit: number
): string[] {
	const indices: number[] = [];
	let result: RegExpExecArray | null;

	const shouldContinue = (): boolean =>
		limit === -1 || indices.length < limit;

	while (shouldContinue() && (result = pattern.exec(inputText)) !== null) {
		indices.push(result.index);
	}

	if (indices.length === 0) return [inputText];

	const parts: string[] = [];
	let startIndex = 0;

	indices.forEach((index) => {
		parts.push(inputText.substring(startIndex, index));
		startIndex = index + result![0].length;
	});

	if (startIndex < inputText.length) {
		parts.push(inputText.substring(startIndex));
	}

	return parts;
}

interface ExtractedInfo {
	genre?: string;
	unethicalContent?: string;
}

function extractGenreNContent(responseText: string): ExtractedInfo {
	const responseLowerCase = responseText.toLowerCase();

	const extractedInfo: ExtractedInfo = {};

	const genreIndex = responseLowerCase.indexOf("genre:");
	if (genreIndex !== -1) {
		const genreStartIndex = genreIndex + "genre:".length;
		const genreEndIndex = responseText.indexOf("\n", genreStartIndex);
		const genre = responseText
			.substring(genreStartIndex, genreEndIndex)
			.trim()
            .replace(/^\[|\]$/g, '');
        const cleanedGenre = genre.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
		extractedInfo.genre = cleanedGenre;

		const unethicalContentIndex = responseLowerCase.indexOf(
			"unethical content:",
			genreEndIndex
		);
		if (unethicalContentIndex !== -1) {
			const unethicalContentStartIndex =
				unethicalContentIndex + "unethical content:".length;
			const unethicalContent = responseText
				.substring(unethicalContentStartIndex)
				.trim()
				.replace(/^\[|\]$/g, '');
			extractedInfo.unethicalContent = unethicalContent;
		}
	}

	return extractedInfo;
}

// U-Test-
const responseText = `Sure, I'd be happy to help! Based on the content you provided, here is the classification and any unethical content types:\n Genre: Informative Article\nUnethical content:\nThe article does not contain any unethical content. It is a well-researched and informative piece that provides a comprehensive overview of the complex issues surrounding poverty and hunger in Africa. The article does not promote any harmful or discriminatory practices, and it does not perpetuate any false or misleading information.\nThe article does, however, highlight some of the systemic and structural issues that contribute to poverty and hunger in Africa, such as colonialism, political instability, corruption, climate change, and inadequate healthcare and education. These issues are complex and multifaceted, and they require a sustained and collective effort to address them.\nOverall, the article provides a balanced and nuanced perspective on the issues surrounding poverty and hunger in Africa, and it does not contain any unethical content.`;
const extractedInfo = extractGenreNContent(responseText);
console.log(extractedInfo);

export { splitWithLimit, extractGenreNContent };
