// https://developer.mozilla.org/en-US/docs/Web/API/Navigator

/////////////////////////////////////////////////

function dump(n = globalThis.top.clientInformation) {
	console.group(`Navigator`)

	console.log(`nav =`, n)

	console.groupEnd()
}

/////////////////////////////////////////////////

export default dump
