import axios from "axios";

export interface Response {
	alternatives: string[];
	code: number;
	data: string;
	id: number;
	method: string;
	source_lang: string;
	target_lang: string;
}

export default defineEventHandler(async (event) => {
	const body = await readBody<{
		text: string;
		source_lang: string;
		target_lang: string;
	}>(event);
	console.log(body);
	const data = await axios
		.post<Response>("http://37.120.189.116:1188/translate", {
			...body
		})
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.catch((err) => {
			return null;
		});
	console.log(data);
	return data;
});
