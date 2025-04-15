export default function decorateWithCSSDiagnostics(story: any) {
	// @ts-expect-error
	import('@offirmo-private/css--utils--diagnostics')
	return story
}
