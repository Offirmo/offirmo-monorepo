import reportꓽexecution_context from './execution-context/index.js'

export default function report(parent, LIB) {
	const node = LIB.create_node('Environment')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Glossary/WindowProxy',
	)

	const self = LIB.try_or_report(node, 'accessing self…', () => {
		node.results.push(['self =', self])

		return self
	}, undefined)

	reportꓽexecution_context(node, LIB)

	LIB.add_child(parent, node)
}
