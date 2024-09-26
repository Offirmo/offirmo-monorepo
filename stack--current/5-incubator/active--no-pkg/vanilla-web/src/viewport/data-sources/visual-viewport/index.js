// https://developer.mozilla.org/en-US/docs/Web/API/Window

/////////////////////////////////////////////////

function dump(vvp = globalThis.top.visualViewport) {
	console.group(`VisualViewport`)

	console.log(`visual viewport =`, vvp)

	console.groupEnd()
}

/////////////////////////////////////////////////

export default dump

/*

https://developer.mozilla.org/en-US/docs/Web/API/Navigator
	Window.clientInformation = Window.navigator


 */
