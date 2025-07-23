// https://platform.openai.com/docs/overview
// https://platform.openai.com/docs/quickstart

import OpenAI from "openai";
const client = new OpenAI({
	apiKey: 'foo',
	//baseURL: 'http://127.0.0.1:1337/v1'
});

const response = await client.responses.create({
	model: "gpt-4.1",
	input: "Write a one-sentence bedtime story about a unicorn.",
});

console.log(response.output_text);
