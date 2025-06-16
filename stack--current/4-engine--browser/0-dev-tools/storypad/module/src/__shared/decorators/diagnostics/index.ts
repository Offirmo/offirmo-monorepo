function decorateWithCSSDiagnostics(story: any) {
	// @ts-expect-error TODO fake TS
	import('@offirmo-private/css--utils--diagnostics')
	return story
}

/////////////////////////////////////////////////

export {
	decorateWithCSSDiagnostics
}
export default decorateWithCSSDiagnostics
