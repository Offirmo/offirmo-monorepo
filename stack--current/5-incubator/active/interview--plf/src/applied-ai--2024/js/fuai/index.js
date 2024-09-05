
import { registry } from './wc--result/index.js'


// How many r are there in "strawberry"?

// TODO https://devdocs.io/dom/device_memory_api

export default async function main() {
	let abortController = new AbortController()

	const elt_button_prompt = document.getElementById('button--prompt')

	function on_click_ask() {
		abortController.abort()
		abortController = new AbortController()

		const systemPrompt = (document.getElementById('input--system-prompt').value).normalize('NFC').trim()
		const prompt = (document.getElementById('input--prompt').value).normalize('NFC').trim()

		for (let key in registry) {
			registry[key].prompt({
				signal: abortController.signal,
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
