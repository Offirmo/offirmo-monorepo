// https://developer.mozilla.org/en-US/docs/Web/API/Screen
// https://developer.mozilla.org/en-US/docs/Web/API/Window/screen

/////////////////////////////////////////////////

function dump(s = globalThis.top.screen) {
	console.group(`Screen`)

	console.log(`screen =`, s)

	console.groupEnd()
}

/////////////////////////////////////////////////

export default dump
