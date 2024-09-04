
import { registry } from './wc--result/index.js'


// How many r are there in "strawberry"?

// TODO https://devdocs.io/dom/device_memory_api

export default async function main() {
	const elt_button_prompt = document.getElementById('button--prompt')

	function on_click_ask() {
		const systemPrompt = (document.getElementById('input--system-prompt').value).normalize('NFC').trim()
		const prompt = (document.getElementById('input--prompt').value).normalize('NFC').trim()

		for (let key in registry) {
			registry[key].prompt({
				systemPrompt,
				prompt,
			})
		}
	}

	elt_button_prompt.onclick = on_click_ask
	//setTimeout(on_click_ask, 500) // for tests, TODO remove

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
