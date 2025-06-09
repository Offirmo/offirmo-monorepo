// https://platform.openai.com/docs/overview
// https://platform.openai.com/docs/quickstart

import OpenAI from "openai";
const client = new OpenAI({
	apiKey: 'foo',
	baseURL: 'http://127.0.0.1:1337/v1'
});

import { extract_categories } from './business/index.ts'

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const some_file = path.join(__dirname, './evals/Code_of_Business_Conduct_and_Ethics.md')
const content = fs.readFileSync(some_file, 'utf8')

//console.log(content)

extract_categories({
	texts: [
		content
	]
})
