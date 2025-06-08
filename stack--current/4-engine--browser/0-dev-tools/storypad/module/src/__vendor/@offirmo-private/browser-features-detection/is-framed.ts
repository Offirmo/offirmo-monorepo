
/////////////////////////////////////////////////

function isꓽframed(currentWindow = window): boolean {
	return currentWindow.self !== currentWindow.top // https://stackoverflow.com/a/326076/587407
}

/////////////////////////////////////////////////

export {
	isꓽframed,
}
