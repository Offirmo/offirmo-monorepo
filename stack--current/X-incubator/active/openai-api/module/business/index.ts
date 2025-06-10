import OpenAI from "openai"
import assert from 'tiny-invariant'

import { zodTextFormat } from "openai/helpers/zod"
import { z, type ZodType } from "zod"

/////////////////////////////////////////////////



const RECOMMENDED_UNICODE_NORMALIZATION = 'NFC' // https://www.win.tue.nl/~aeb/linux/uc/nfc_vs_nfd.html


// https://stackoverflow.com/a/1981366/587407
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types
const ANY_BLANK_REGEXP = /\s+/g
function coerce_blanks_to_single_spaces(s: string): string {
	return s.replace(ANY_BLANK_REGEXP, ' ')
}

const lineseps = Array.from({ length: 7}, () => '\n').join('')
function normalize_long_text(raw: string): string {
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


/////////////////////////////////////////////////

// see OpenAi EasyInputMessage
interface ConversationEntry {
	role: 'user' | 'assistant' | 'system' | 'developer'
	content: string
}
type Conversation = Array<ConversationEntry>

const MARKER_BEGIN = '~#BEGIN#~'
const MARKER_END = '~#END#~'

async function prompt_to_single_text_output(client: OpenAI, input: Conversation, _fake_response?: Awaited<ReturnType<typeof client.responses.create>>) {
	const response = await (_fake_response || client.responses.create({
		model: "gpt-4o-mini", // XXX
		input,
	}))

	if (!_fake_response) {
		console.log('/////// GOT prompt-to-text response', response)
		debugger
	}

	const { error, output } = response
	if (error)
		throw error

	assert(output.length === 1, `unexpected multi output!`)

	const message = output[0]!
	assert(message.status === 'completed', `unexpected message status!`)
	assert(message.role === 'assistant', `unexpected message role!`)
	assert(message.content.length === 1, `unexpected multi message!`)

	let content = message.content[0]!.text.trim()
	if (content.startsWith(MARKER_BEGIN)) content = content.slice(MARKER_BEGIN.length)
	if (content.endsWith(MARKER_END)) content = content.slice(0, -MARKER_END.length)

	return content.normalize(RECOMMENDED_UNICODE_NORMALIZATION).trim()
}

async function prompt_to_json(client: OpenAI, input: Conversation, zodObject: ZodType, _fake_response?: Awaited<ReturnType<typeof client.responses.parse>>) {
	// TODO 1D auto wrap + unwrap arrays

	const response = await (_fake_response || client.responses.parse({
		model: "gpt-4o-mini", // XXX
		input,
		text: {
			format: zodTextFormat(zodObject, "result"),
		},
	}))

	if (!_fake_response) {
		console.log('/////// GOT prompt-to-JSON response', response)
		debugger
	}

	const { error, output } = response
	if (error)
		throw error

	assert(output.length === 1, `unexpected multi output!`)

	const message = output[0]!
	assert(message.status === 'completed', `unexpected message status!`)
	assert(message.role === 'assistant', `unexpected message role!`)
	assert(message.content.length === 1, `unexpected multi message!`)

	const parsed = message.content[0]!.parsed

	return parsed
}

/////////////////////////////////////////////////

const ZKnowledgeBaseSection = z.object({
	title: z.string(),
	subtitle: z.string(),
	excerpt: z.string(),
});
const ZKnowledgeBaseSections = z.object({
	categories: z.array(ZKnowledgeBaseSection)
})

interface ExtractedStructure {
	raw_cleaned: string
	categories: Array<z.infer<typeof ZKnowledgeBaseSection>>
}

interface ExtractStructureInput {
	texts: Array<string>
}
async function extract_categories(client: OpenAI, input: ExtractStructureInput, _fake_responses_chain: Array<any> = []): Promise<ExtractedStructure> {
	const improved_concatenated_input_1_safe = input.texts
		.map(normalize_long_text)
		.filter(t => !!t)
		.join(lineseps.slice(-2))

	const improved_concatenated_input_2_improved = await prompt_to_single_text_output(client, [
		{
			role: 'system',
			content: `
You are a genius content writer, proofreader and grammarian. You can easily fix typos, formatting mistakes and minor grammatical errors.
			`
		},
		{
			role: 'developer',
			content: `
Proofread the texts that you're given by the user:
1. fix misformatted words, for example cut in half with a space: "he llo" -> "hello".
1. fix typos.
1. fix misspelled words.
1. fix small grammatical mistakes.
1. remove spurious numbers appearing at the beginning or end of a line when you're sure they're not part of the surrounding sentences.
1. collate split sentences when you're sure words on different lines are from the same sentence.

Return a text as close as possible to the original. Only fix what you're very confident is an error. Do NOT add content. Do NOT delete content, unless you replace it with fixed content.
			`
		},
		{
			role: 'developer',
			content: `
Example: This text:

${MARKER_BEGIN}
42 Repor ting Work-Related
Grievances
Atlassian™s should report
03
${MARKER_END}

Should be fixed into:

${MARKER_BEGIN}
## Reporting Work-Related Grievances
Atlassians should report
${MARKER_END}
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
1. remove spurious numbers appearing at the beginning or end of a line when you're sure they're not part of the surrounding sentences.
1. collate split sentences when you're sure words on different lines are from the same sentence.

Return a text as close as possible to the original. Only fix what you're very confident is an error. Do NOT add content. Do NOT delete content, unless you replace it with fixed content.

Proofread this text and return only the improved text without any other message:
			`
		},
		{
			role: 'user',
			content: [ MARKER_BEGIN, improved_concatenated_input_1_safe, MARKER_END ].join('\n')
		}
	], _fake_responses_chain.shift())

	const improved_concatenated_input_3_improved = normalize_long_text(improved_concatenated_input_2_improved)

	const { categories } = await prompt_to_json(client, [
			{
				role: 'system',
				content: `
You are a genius knowledge worker specialized in writing clear and structured documentation.
			`
			},
			{
				role: 'developer',
				content: `
Read the raw text below and group the knowledge it contains into broader categories.

Output an ordered list of those categories with a title, a subtitle and an excerpt for each category.

The subtitle MUST hint at the content and MUST NOT paraphrase the title.

The excerpt MUST contain the most critical and relevant 1 or 2 paragraphs of text that correspond to this category.

Order the categories in logical order AND importance order.
			`
			},
			{
				role: 'developer',
				content: `
Example: This text:

${MARKER_BEGIN}
work hours
Employees are expected to work 9 to 5.

recruitment process
Employees will have to provide 2 references and an ID.

flexible working hours
Employees can move their work hours flexibly by agreement with their team.
${MARKER_END}

Should yield:

${MARKER_BEGIN}
{
  "sections": [
    { "title": "Recruitment process", "subtitle": "More details about your obligations during the recruitment process.", "excerpt: "Employees will have to provide 2 references and an ID." },
    { "title": "Work hours", "subtitle": "Everything you need to know about normal and flexible work hours.", "excerpt: "Employees are expected to work 9 to 5. Employees can move their work hours flexibly by agreement with their team." },
  ]
}
${MARKER_END}
			`
			},
			{
				role: 'developer',
				content: `
Read the raw text below and extract ordered categories as instructed:
			`.trim()
			},
			{
				role: "user",
				content: [ MARKER_BEGIN, improved_concatenated_input_3_improved, MARKER_END ].join('\n')
			},
		], ZKnowledgeBaseSections, _fake_responses_chain.shift())

	const result: ExtractedStructure = {
		//raw: improved_concatenated_input_1_safe,
		raw_cleaned: improved_concatenated_input_3_improved,
		categories,
	}

	return result
}

/////////////////////////////////////////////////

interface ImprovedKnowledgeBaseSection {
	title: string
	subtitle: string
	content: string

	_original_content_for_review: string
}

interface FilterAndImproveInput {
	raw_kb_content: string

	topic: string
	topic_details: string
}
async function filter_and_improve_content(client: OpenAI, input: FilterAndImproveInput, _fake_responses_chain: Array<any> = []): Promise<ImprovedKnowledgeBaseSection> {

	const relevant_kb_content = await prompt_to_single_text_output(client, [
		{
			role: 'system',
			content: `
You are a genius knowledge worker specialized in writing clear and structured documentation.
			`
		},
		{
			role: 'developer',
			content: `
Select from the given text the parts related to the given topic. Filter out the parts NOT related to the given topic.

Do NOT add content. Only REMOVE irrelevant content.
			`
		},
		{
			role: 'developer',
			content: `
Example: Starting from this text:

${MARKER_BEGIN}
work hours
Employees are expected to work 9 to 5.

recruitment process
Employees will have to provide 2 references and an ID.

flexible working hours
Employees can move their work hours flexibly by agreement with their team.
${MARKER_END}

When asked to keep only parts related to "work hours", should yield:

${MARKER_BEGIN}
work hours
Employees are expected to work 9 to 5.

flexible working hours
Employees can move their work hours flexibly by agreement with their team.
${MARKER_END}
			`
		},
		{
			role: 'developer',
			content: `
Now select from the given text the parts related to the given topic "${input.topic}". Filter out the parts NOT related to the given topic "${input.topic_details}":
			`
		},
		{
			role: 'user',
			content: [ MARKER_BEGIN, input.raw_kb_content, MARKER_END ].join('\n')
		}
	], _fake_responses_chain.shift())

	const improved_kb_content_1 = normalize_long_text(relevant_kb_content)

	let improved_kb_content_2 = await prompt_to_single_text_output(client, [
		{
			role: 'system',
			content: `
You are a genius knowledge worker specialized in writing clear and structured documentation.
			`
		},
		{
			role: 'developer',
			content: `
Improve the given text:
1. remove duplicated content.
1. sort the content in logical order: introduce base concepts first and in order of criticity.
1. make the content clear and readable using the best writing practices: keep things simple; get rid of extra words; Write short sentences; Avoid putting multiple thoughts in one sentence; Use active voice.
1. if a concept is unclear or not previously introduced, you MAY add an introduction of the concept or expend it a little.
1. make the content engaging but stay professional.
1. turn the content into well-formatted markdown.

Do NOT add any new content, only reformat/reword/improve the existing content.
			`
		},
		{
			role: 'developer',
			content: `
Now turn this text into a well structured, clear, engaging improved markdown version:
			`
		},
		{
			role: 'user',
			content: [ MARKER_BEGIN, improved_kb_content_1, MARKER_END ].join('\n')
		}
	], _fake_responses_chain.shift())

	improved_kb_content_2 = improved_kb_content_2.trim()
	if (improved_kb_content_2.startsWith('```markdown')) improved_kb_content_2 = improved_kb_content_2.slice('```markdown'.length).trim()
	if (improved_kb_content_2.startsWith('```md')) improved_kb_content_2 = improved_kb_content_2.slice('```md'.length).trim()
	if (improved_kb_content_2.startsWith('```')) improved_kb_content_2 = improved_kb_content_2.slice('```'.length).trim()
	if (improved_kb_content_2.endsWith('```')) improved_kb_content_2 = improved_kb_content_2.slice(0, -'```'.length).trim()

	const result: ImprovedKnowledgeBaseSection = {
		title: input.topic,
		subtitle: input.topic_details,
		content: improved_kb_content_2,
		_original_content_for_review: relevant_kb_content,
	}

	return result
}

/////////////////////////////////////////////////

export {
	type ExtractStructureInput,
	extract_categories,
	type ExtractedStructure,

	type FilterAndImproveInput,
	filter_and_improve_content,
}
