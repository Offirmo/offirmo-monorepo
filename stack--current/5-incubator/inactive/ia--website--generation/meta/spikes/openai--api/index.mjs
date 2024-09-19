import { strict as assert } from 'node:assert';
import * as util from 'node:util';
const INSPECT_OPTIONS = {
	depth: Infinity,
	colors: true,
	maxArrayLength: Infinity,
	//breakLength: getꓽterminal_size().columns,
	//compact: true,
}
function dump(...args) {
	if (args.length === 1) {
		console.log(util.inspect(args[0], INSPECT_OPTIONS))
	}
	else {
		console.log(util.inspect(args, INSPECT_OPTIONS))
	}
}

/////////////////////////////////////////////////

const OPENAI_API_KEY = process.env.SESAME_IA_OUVERT
assert(!!OPENAI_API_KEY, 'missing OPENAI_API_KEY')

import OpenAI from "openai"

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY,
});

const chatCompletion = await openai.chat.completions.create({
	messages: [{ role: "user", content: "Say this is a test" }],
	model: "gpt-3.5-turbo",
});

/////////////////////////////////////////////////

dump(chatCompletion)
