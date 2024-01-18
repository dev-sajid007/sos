// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { webData } from './fileData';

export type IWebData = {
	home_banner_heading: string;
	home_banner_sub_heading: string;
}[];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<IWebData>
) {
	res.status(200).json(webData);
}
