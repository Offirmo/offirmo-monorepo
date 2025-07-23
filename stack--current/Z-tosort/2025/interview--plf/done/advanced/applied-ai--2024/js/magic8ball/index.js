
import { getRandomIntInRange } from '../utils/random/index.js'
import { STANDARD_RESPONSES } from './consts.js'
import { filter_in_last_quoted_sentence_if_any } from '../utils/ai/index.js'

export default async function main() {
	const elt_button_ask = document.getElementById('ask')
	const elt_question = document.getElementById('question')
	const elt_response_noai = document.getElementById('response-noai')
	const elt_response_ai = document.getElementById('response-ai')

	let abort_controller = new AbortController()

	function on_click_ask() {
		if (abort_controller) {
			abort_controller.abort()
			abort_controller = new AbortController()
		}
		elt_response_noai.value = '(pondering…)'
		elt_response_ai.value = '(pondering…)'

		const { d20, sentence } = get_random_standard_8ball_answer()
		console.log({ d20, sentence })
		elt_response_noai.value = sentence

		const question = (elt_question?.value ?? '').normalize('NFC').trim()
		get_response__ai(question, d20)
			.then(response => {
				console.log({ response })
				elt_response_ai.value = response
			})
			.catch(err => {
				elt_response_ai.value = `[Internal Error: ${err?.message || 'unknown'}]`
			})
	}

	elt_button_ask.onclick = on_click_ask
	//on_click_ask()
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
