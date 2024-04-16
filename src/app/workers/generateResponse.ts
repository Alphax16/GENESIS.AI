import { replaceTokens } from "../utils/formatter";
// import { getPrompts } from "../prompt-templates/promptTemplate";
import { getPrompt } from "../utils/getPrompt";

export interface Env {
  AI: any;
}

const account_id = process.env.CLOUDFLARE_ACCOUNT_ID;
const api_token = process.env.CLOUDFLARE_API_TOKEN;

const generateResponse = async (
	content: string,
	tokenCount=1000, // LLAMA Worker API Max-Limit: 6144 tokens
	model = `@cf/meta/llama-2-7b-chat-fp16`
) => {
	try {
		const contentLim = content.substring(0, tokenCount);
		console.log("Content-16:", contentLim);
		
		// const messages = getPrompts(content[0]);
		const prompt = getPrompt('website-code-analyzer');
		console.log("Prompt: ", prompt);
		
		const messages = replaceTokens(prompt, { content: contentLim });
		// const messages = getPrompts(content[0]);
		console.log("Messages-29:", messages);

		console.log("Messages-31:", JSON.stringify(messages));

		const response = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${account_id}/ai/run/${model}`,
			{
				// headers: { Authorization: `Bearer ${api_token}`, C },
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${api_token}`, // Add Authorization header with token
				},
				body: JSON.stringify(messages),
				// body: JSON.stringify(prompt),
				// body: messages,
			}
		);
		const result = await response.json();
		// const result = response;
		return result;
	} catch (err) {
		return err;
	}
};



//   const data = await fetch(request: Request, env: Env) {
//     const ai = new Ai(env.AI);

//     const messages = [
//       { role: "system", content: "You are a friendly assistant" },
//       {
//         role: "user",
//         content: "What is the origin of the phrase Hello, World",
//       },
//     ];
//     const response = await ai.run("@cf/meta/llama-2-7b-chat-fp16", { messages });

//     return Response.json(response);
//   }
//   export default {
// data
// };

export { generateResponse };
