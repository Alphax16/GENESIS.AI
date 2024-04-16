import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	message: string;
};

// export default function handler(
export async function GET(
	req: Request,
	res: NextApiResponse<ResponseData>
) {
	// res.status(200).json({ message: "Hello from Next.js!" });
	return Response.json({ message: "Hello from Next.js!" });
}
