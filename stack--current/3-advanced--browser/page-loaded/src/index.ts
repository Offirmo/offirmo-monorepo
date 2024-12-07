/* Expose the state of page load/readiness
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
 * loading -> interactive -> complete
 * Beware of using the correct one!
 * 1. loading
 * 2. interactive
 *    fired as soon as the page DOM has been loaded, without waiting for resources to finish loading.
 *    The document has finished loading and we can access DOM elements.
 *    Sub-resources such as scripts, images, stylesheets and frames are still loading.
 * 3. complete
 *    The whole page has loaded,
 *    including all dependent resources such as
 *    stylesheets, scripts, iframes, and images, except those that are loaded lazily.
 */

/////////////////////////////////////////////////
// DOMContentLoaded
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// use case: we need HTML to start attaching react for ex.

const ೱᐧDOMContentLoaded: Promise<void> = (() => {
	const { promise, resolve, reject } = Promise.withResolvers<void>()

	if (document.readyState === 'loading') {
		// Loading hasn't finished yet
		document.addEventListener('DOMContentLoaded', () => resolve())
	} else {
		// `DOMContentLoaded` has already fired
		resolve()
	}

	return promise
})()

/////////////////////////////////////////////////
// page loaded
// https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
// use case: some viewport stuff is not fully resolved until page loaded

const ೱᐧpage_loaded: Promise<void> = (() => {
	const { promise, resolve, reject } = Promise.withResolvers<void>()

	if (document.readyState !== 'complete') {
		document.addEventListener('load', () =>
			// ensure the promises are resolved in the right order
			// even if the page is already loaded when this library is imported
			ೱᐧDOMContentLoaded.then(() => resolve())
		)
	} else {
		// already loaded
		// ensure the promises are resolved in the right order
		// even if the page is already loaded when this library is imported
		ೱᐧDOMContentLoaded.then(() => resolve())
	}

	return promise
})()

/////////////////////////////////////////////////

export {
	ೱᐧDOMContentLoaded,
	ೱᐧpage_loaded,
}
