import prompt from "../prompts/prompt.json";

// interface PromptData {
// 	[key: string]: {
// 		messages: { role: string; content: string }[];
// 	};
// }

// function getPrompt(category: string): PromptData[string] | undefined {}

function getPrompt(category: string): any {
    // someObj[field as keyof typeof someObj]
    console.log('All Prompts:', prompt);
    console.log('All Prompts Keys:', Object.keys(prompt));
    console.log('Typeof all Prompts:', typeof prompt);
    console.log('Category:', category);
    // const promptObj = JSON.parse(`${prompt}`);
    
	const promptCategory = prompt[category as keyof typeof prompt];
	// const promptCategory = promptObj[category];
    console.log('Prompt Category:', promptCategory);
    // if (promptCategory === undefined) {
    //     throw new Error(`Category "${category}" not found in prompt.json`);
    // }
    // const promptCategory = prompt[category];
    return promptCategory;
}

// function getPrompt(category: string): any {
//     console.log('All Prompts:', prompt);
//     console.log('All Prompts Keys:', Object.keys(prompt));
//     console.log('Typeof all Prompts:', typeof prompt);
//     console.log('Category:', category);
    
//     const promptCategory = prompt[category];
//     console.log('Prompt Category:', promptCategory);
//     return promptCategory;
// }

// interface PromptData {
//     [category: string]: {
//         messages: { role: string; content: string; }[];
//     };
// }

// function getPrompt(category: string): { role: string; content: string; }[] | undefined {
//     const categoryData = prompt[category];
//     return categoryData ? categoryData.messages : undefined;
// }

// function getPrompt(category: keyof PromptData): { messages: { role: string; content: string; }[] } | undefined {
//     return prompt[category];
// }

export { getPrompt };
