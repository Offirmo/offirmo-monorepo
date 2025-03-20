export default function decorateWithCSSDiagnostics(story) {
	import('npm:@offirmo-private/css--utils/diagnostics')
	return story
}
