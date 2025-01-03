

export default function report(parent, LIB) {
	const node = LIB.create_node('Environment')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Glossary/WindowProxy',
	)

	const self = LIB.try_or_report(node, 'accessing self…', () => {

		node.results.push(['self =', self])

		return self
	}, undefined)

	LIB.add_child(parent, node)
}


// TODO check if dev!
// TODO check browser
// are we a window or a worker?
// TODO listen to all postMessages
// TODO detect webextensions?
// https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning
