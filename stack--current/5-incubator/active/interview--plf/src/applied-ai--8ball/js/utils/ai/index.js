


export function filter_in_last_quoted_sentence_if_any(ai_response) {
	ai_response = (ai_response || '').normalize('NFC').trim()

	const splited = ai_response.split('"').map(s => s.trim()).filter(s => !!s)

	if (splited.length > 1)
		return splited.at(-1)

	return ai_response
}


function clean_ai_response(response) {
	console.group('clean_ai_response')
	console.log('initial=', response)
	response = (response || '').normalize('NFC').trim()

	response = (function pick_last_quote_if_any() {
		const splited = response.split('"').map(s => s.trim()).filter(s => !!s)

		if (splited.length > 1)
			return splited.at(-1)
	})()

	console.log('cleaned=', response)
	console.groupEnd()
	return response
}
