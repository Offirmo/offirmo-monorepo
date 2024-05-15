export default function decorateWithCSSDiagnostics(story) {
	import('npm:@offirmo-private/css--utils/src/diagnostics/index.css')
	return story
}
