
import { filter_in_last_quoted_sentence_if_any } from '../utils/ai/index.js'

const state = {

	assistants: [
		/*
		abort_controller: new AbortController(),
		session
		 */
	],
}


// TODO https://devdocs.io/dom/device_memory_api

export default async function main() {
	const elt_section_results = document.getElementById('results')
	if (!globalThis.ai) {
		elt_section_results.innerHTML = `<p class="o⋄colorꘌerror">AI feature not available! Please follow <a href="https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit#heading=h.witohboigk0o">this link</a>.</p>`
		throw new Error(`AI feature not available!`)
	}


	const elt_button_prompt = document.getElementById('ask')
	const elt_question = document.getElementById('question')

	const capabilities = await ai.assistant.capabilities()
	console.log({ capabilities })
	const default_session = await ai.assistant.create({
		// TODO on day monitor
	})
	console.log({ default_session })

	function on_click_ask() {
		state.assistants.forEach(a => {
			console.log('aborting', a)
			a.abort_controller.abort()
			a.abort_controller = new AbortController()
			// TODOelt_response_ai.value = '(pondering…)'
		})

		const question = (elt_question?.value ?? '').normalize('NFC').trim()
		// TODO
	}

	elt_button_prompt.onclick = on_click_ask
	on_click_ask() // for tests, TODO remove

	// https://gemini.google.com/share/a4665036f4b9
	// temperature = 0...1
	// low = 0.2
	// high = 0.8
	// Top-k = 1...100
	// small = 5
	// large = 40
}

function get_random_standard_8ball_answer() {
	const d20 = getRandomIntInRange(1, 20)
	const sentence = STANDARD_RESPONSES[d20 - 1]

	return { d20, sentence }
}

async function get_response__ai(question, d20) {
	console.log({ question, d20 })

	const session = await ai.assistant.create({
		// TODO on day monitor
	})

	const result_raw = await(async () => {
		if (d20 <= 10) {
			// affirmative
			return session.prompt("Generate an affirmative, reassuring prompt to proceed.");
		}
		else if (d20 <= 15) {
			// non-committal
			return session.prompt("Generate an excuse saying you'll answer this question later.");
		}
		else {
			// negative
			return session.prompt("Generate a gentle but firm prompt to NOT proceed. Make excuses or invoke sources.");
		}
	})()

	return filter_in_last_quoted_sentence_if_any(result_raw)
}
