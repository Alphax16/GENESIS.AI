// curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/huggingface/distilbert-sst-2-int8 \
//   -X POST \
//   -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
//   -d '{ "text": "This pizza is great!" }'


const account_id = process.env.CLOUDFLARE_ACCOUNT_ID;
const api_token = process.env.CLOUDFLARE_API_TOKEN;
const hf_api_token = process.env.HUGGINGFACE_API_TOKEN;

const classifyText = async (
	text: string,
	model = `@cf/huggingface/distilbert-sst-2-int8`
) => {
	try {

        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${account_id}/ai/run/${model}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${api_token}`,
                },
                // body: formData,
                // body: Buffer.from(imageData).toString('base64'),
                body: JSON.stringify({ text }),
            }
        );

        // console.log('response-38:', response);

        // if (!response.ok) {
        //     throw new Error(`Error: ${response.status} - ${response.statusText}`);
        // }

        const result = await response.json();
        console.log('result-37:', result);
        console.log('AI Model Result-38:', result.result);

        let res = { imageType: '', positiveness: 0, negativeness: 0 };
        for (let item of result.result) {
            if (item.label.toUpperCase() === 'POSITIVE') {
                res.positiveness = item.score;
            } else if (item.label.toUpperCase() === 'NEGATIVE') {
                res.negativeness = item.score;
            } else {
                continue;
            }
        }

        res.imageType = text;

        return res;
    } catch (err) {
        console.error('Error running AI model:', err);
    }
};

export { classifyText };
