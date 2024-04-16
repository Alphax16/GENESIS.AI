import fs from "fs";

export interface Env {
	AI: any;
}

// Reference cURL format-
// curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/microsoft/resnet-50 \
//     -X POST \
//     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
//     --data-binary @orange-llama.png

const account_id = process.env.CLOUDFLARE_ACCOUNT_ID;
const api_token = process.env.CLOUDFLARE_API_TOKEN;
const hf_api_token = process.env.HF_API_TOKEN;

const classifyImages = async (
	imagePath: string,
	model = `@cf/microsoft/resnet-50`
) => {
	try {
        // const imageData = await fs.promises.readFile(imagePath);
	    const imageData = fs.readFileSync(imagePath);

        /*
        console.log('imageData-21:', imageData);

        const blob = new Blob([imageData], { type: 'image/png' });

        const formData = new FormData();
        // formData.append('file', blob, 'image.png');
        formData.append('file', blob, 'orange-llama.png');
        // formData.append('file', fs.createReadStream(imagePath));
        */

        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${account_id}/ai/run/${model}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${api_token}`,
                },
                // body: formData,
                // body: Buffer.from(imageData).toString('base64'),
                body: imageData,
            }
        );

        // console.log('response-38:', response);

        // if (!response.ok) {
        //     throw new Error(`Error: ${response.status} - ${response.statusText}`);
        // }

        const result = await response.json();
        console.log('AI Model Result:', result.result);

        return result.result;
    } catch (err) {
        console.error('Error running AI model:', err);
    }
};

async function classifyImagesV2(imagePath: string, model = `google/vit-base-patch16-224`) {
	const data = fs.readFileSync(imagePath);
	const response = await fetch(
		`https://api-inference.huggingface.co/models/${model}`,
		{
			headers: { Authorization: `Bearer ${hf_api_token}` },
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
};

// classifyImagesV2("cats.jpg").then((response) => {
// 	console.log(JSON.stringify(response));
// });

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

export { classifyImages, classifyImagesV2 };
