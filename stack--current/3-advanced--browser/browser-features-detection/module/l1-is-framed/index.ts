/**
 * Use case: switching behavior (ex. storybook story vs full app)
 * Use case: reject being framed
 */

/////////////////////////////////////////////////

function isꓽframed(currentWindow = window): boolean {
	return currentWindow.self !== currentWindow.top // https://stackoverflow.com/a/326076/587407

	// TODO what if not browser env?
	// most likely throw!
}

/////////////////////////////////////////////////

export {
	isꓽframed,
}
