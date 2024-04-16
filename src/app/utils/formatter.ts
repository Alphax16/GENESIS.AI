interface TokenValueMap {
	[key: string]: string;
}

// function replaceTokens(input: any, tokenValueMap: TokenValueMap): any {
// 	if (typeof input === "string") {
// 		const tokenRegex = new RegExp("{(\\w+)}", "g");
// 		return input.replace(tokenRegex, (match, token) => {
// 			if (tokenValueMap.hasOwnProperty(token)) {
// 				return tokenValueMap[token];
// 			} else {
// 				return match;
// 			}
// 		});
// 	} else if (Array.isArray(input)) {
// 		return input.map((item) => replaceTokens(item, tokenValueMap));
// 	} else if (typeof input === "object" && input !== null) {
// 		const replacedObject: any = {};
// 		for (let key in input) {
// 			replacedObject[key] = replaceTokens(input[key], tokenValueMap);
// 		}
// 		return replacedObject;
// 	} else {
// 		return input;
// 	}
// }

function replaceTokens(input: any, tokenValueMap: TokenValueMap): any {
	if (typeof input === "string") {
		const tokenRegex = /{([^{}]+)}/g; // Adjusted regular expression pattern
		return input.replace(tokenRegex, (match, token) => {
			if (tokenValueMap.hasOwnProperty(token)) {
				return tokenValueMap[token];
			} else {
				return match;
			}
		});
	} else if (Array.isArray(input)) {
		return input.map((item) => replaceTokens(item, tokenValueMap));
	} else if (typeof input === "object" && input !== null) {
		const replacedObject: any = {};
		for (let key in input) {
			replacedObject[key] = replaceTokens(input[key], tokenValueMap);
		}
		return replacedObject;
	} else {
		return input;
	}
}

// Unit Testing-
const input: any = {
	key1: "Hello {TOKEN-1}, welcome to {TOKEN-2}.",
	key2: "Another example with {TOKEN-3}.",
	nestedObject: {
		key3: "Nested object with {TOKEN-4}.",
		nestedArray: [
			"Nested array element with {TOKEN-5}.",
			{ key4: "Another nested object with {TOKEN-6}." },
		],
	},
	nestedArray: [
		"Array element with {TOKEN-7}.",
		{ key5: "Another nested object with {TOKEN-8}." },
		[
			"Nested array with {TOKEN-9}.",
			{ key6: "Nested object in nested array with {TOKEN-10}." },
		],
	],
};

const tokenValueMap: TokenValueMap = {
	"TOKEN-1": "John",
	"TOKEN-2": "JavaScript World",
	"TOKEN-3": "Reusability",
	"TOKEN-4": "Nested Values",
	"TOKEN-5": "Array Values",
	"TOKEN-6": "Nested Object Value",
	"TOKEN-7": "Array Value 7",
	"TOKEN-8": "Object Value 8",
	"TOKEN-9": "Array Value 9",
	"TOKEN-10": "Object Value 10",
};

const replacedInput = replaceTokens(input, tokenValueMap);
console.log(replacedInput);

export { replaceTokens };
