import OpenAI from "openai"

import { zodTextFormat } from "openai/helpers/zod"
import { z } from "zod"

interface Input {
	texts: Array<string>
}

type Title = string

interface Output {
	raw: string
	improved: string
	categories: Array<Title>
}

const RECOMMENDED_UNICODE_NORMALIZATION = 'NFC' // https://www.win.tue.nl/~aeb/linux/uc/nfc_vs_nfd.html

const lineseps = Array.from({ length: 7}, () => '\n').join('')
const spaces = Array.from({ length: 7}, () => ' ').join('')

// https://stackoverflow.com/a/1981366/587407
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
const ANY_BLANK_REGEXP = /\s+/g
function coerce_blanks_to_single_spaces(s: string): string {
	return s.replace(ANY_BLANK_REGEXP, ' ')
}

function _normalize_text(raw: string): string {
	let result = raw || ''
	result = result.normalize(RECOMMENDED_UNICODE_NORMALIZATION)
	result = result.trim()

	for (let i = lineseps.length; i > 1; --i) {
		result = result.split(lineseps.slice(-i)).join(lineseps.slice(-2))
	}

	result = result.split(lineseps.slice(-2))
		.map(p => p.split(lineseps.slice(-1))
			.map(coerce_blanks_to_single_spaces)
			.map(fragment => fragment.trim())
			.join(' ')
		)
		.join(lineseps.slice(-2))

	return result

}

const Category = z.object({
	title: z.string(),
	subtitle: z.string(),
});


// see OpenAi EasyInputMessage
interface ConversationEntry {
	role: 'user' | 'assistant' | 'system' | 'developer'
	content: string
}
type Conversation = Array<ConversationEntry>

async function prompt(client: OpenAI, input: Conversation) {
	const response = await client.responses.create({
		model: "gpt-4o-mini", // XXX
		input,
	});

	return response
}


async function extract_categories(openai: OpenAI, input: Input): Output {
	const improved_concatenated_input_1_safe = input.texts
		.map(_normalize_text)
		.filter(t => !!t)
		.join(lineseps.slice(-2))

	const improved_concatenated_input_2_improved = await prompt(openai, [
		{
			role: 'developer',
			content: `
You are a genius proofreader and grammarian. You can easily fix typos, formatting mistakes and minor grammatical errors.
			`.trim()
		},
		{
			role: 'developer',
			content: `
Proofread the texts that you're given by the user:
1. fix misformated words, for example cut in half with a space: "he llo" -> "hello".
1. fix typos.
1. fix misspelled words.
1. fix small grammatical mistakes.
1. Detect page numbers mistakenly embedded inside the text and remove them when you're sure they're not part of sentences.
1. collate split sentences when you're sure words on different lines are from the same sentence.
1. When you recognize titles, use markdown to emphasize them.

Return a text as close as possible to the original. Only fix what you're very confident is an error. Do NOT add content. Do NOT delete content, unless you replace it with fixed content.
			`
		},
		{
			role: 'developer',
			content: `
Example: This text:

BEGIN
42 Repor ting Work-Related
Grievances
Atlassian™s should report
03
END

Should be fixed into:

BEGIN
## Reporting Work-Related Grievances
Atlassians should report
END
			`
		},
		{
			role: 'developer',
			content: `
Reminder:
1. fix misformated words, for example cut in half with a space: "he llo" -> "hello".
1. fix typos.
1. fix misspelled words.
1. fix small grammatical mistakes.
1. Detect page numbers mistakenly embedded inside the text and remove them when you're sure they're not part of sentences.
1. collate split sentences when you're sure words on different lines are from the same sentence.
1. When you recognize titles, use markdown to emphasize them.

Return a text as close as possible to the original. Only fix what you're very confident is an error. Do NOT add content. Do NOT delete content, unless you replace it with fixed content.

Proofread this text and return only the improved text without any other message:
			`
		},
		{
			role: 'user',
			content: [ 'BEGIN', improved_concatenated_input_1_safe, 'END' ].join('\n')
		}
	])
	console.log('///////', improved_concatenated_input_2_improved)

	debugger

	const result: Output = {
		raw: improved_concatenated_input_1_safe,
		improved: improved_concatenated_input_2_improved,
		categories: [],
	}

	return result
}

export {
	extract_categories,
}
