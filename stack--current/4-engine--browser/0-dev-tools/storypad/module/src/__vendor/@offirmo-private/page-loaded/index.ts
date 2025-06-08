
const DEBUG = false

/////////////////////////////////////////////////
// page loaded
// https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
// use case: some viewport stuff is not fully resolved until page loaded

const ೱᐧpage_loaded: Promise<void> = (() => {
	const { promise, resolve, reject } = Promise.withResolvers<void>()

	if (document.readyState !== 'complete') {
		DEBUG && console.log(`ೱᐧpage_loaded: adding a listener… (readyState = ${document.readyState})`)
		// important: this event is on "window"
		window.addEventListener('load', () => {
			DEBUG && console.log(`ೱᐧpage_loaded: ⚡️load`)
			DEBUG && console.log(`ೱᐧpage_loaded: resolving…`)
			resolve()
		})
	} else {
		// already loaded
		DEBUG && console.log(`ೱᐧpage_loaded: already loaded ✅`)
		// ensure the promises are resolved in the right order
		// even if the page is already loaded when this library is imported
		DEBUG && console.log(`ೱᐧpage_loaded: resolving…`)
		resolve()
	}

	promise.then(() => {
		DEBUG && console.log(`ೱᐧpage_loaded: fulfilled ✅`)
	})

	return promise
})()

/////////////////////////////////////////////////

export {
	ೱᐧpage_loaded,
}
