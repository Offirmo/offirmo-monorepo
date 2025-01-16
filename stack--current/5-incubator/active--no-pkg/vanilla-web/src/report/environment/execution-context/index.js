/** Execution context detection
 * Complicated bc env can be emulated, for ex. unit tests emulating a web environment
 */
// TODO clientInformation
// TODO check if dev!
// TODO check browser
// TODO listen to all postMessages
// TODO detect webextensions?
// https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning

/////////////////////////////////////////////////

function hasꓽbrowser_environment() {
	// TODO improve
	return !!globalThis.window
}

function hasꓽnode_environment() {
	// TODO improve
	return !!globalThis.global
}

/**
 * Complicated bc env can be emulated, for ex. unit tests emulating a web environment
 * must not crash
 */
function getꓽexecution_context__most_likely_type() {
	// TODO improve

	const results = {
		browser: hasꓽbrowser_environment(),
		node: hasꓽnode_environment(),
	}

	// TODO sort out

	if (hasꓽbrowser_environment())
		return 'browser'

	// TODO detect node "global"

	// TODO detect
	return 'unknown'
}

// must not crash
function getꓽexecution_context__id() {
	const type = getꓽexecution_context__most_likely_type()

	switch (type) {
		case 'browser':
			return globalThis.window?.origin
		case 'unknown':
			// fallthrough
		default:
			return 'unknown execution context??'
	}
}


function reportꓽbrowser(parent, LIB) {
	const node = LIB.create_node('Browser')

	node.references.push(
		'link'
	)

	LIB.try_or_report(node, 'trying X…', () => {
		node.results.push(['X =', undefined])
	})

	LIB.add_child(parent, node)
}


function reportꓽnode(parent, LIB) {
	const node = LIB.create_node('Node')

	node.references.push(
		'link',
	)

	LIB.try_or_report(node, 'trying Y…', () => {
		throw new Error('TEST error!')
	})

	node.notifications.push(['NIMP!', new Error(`Not implemented!`)])

	LIB.add_child(parent, node)
}


function report(parent, LIB) {
	const node = LIB.create_node('Execution Context')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Glossary/Global_object',
	)

	LIB.try_or_report(node, 'accessing globalThis…', () => {
		const global = globalThis
		node.results.push(['globalThis =', global])

		const keys = Object.keys(global)
		node.results.push(['#keys =', keys.length])

		// is it a Window? WorkerScope? Node?
	})

	//reportꓽx(node, LIB)
	//reportꓽy(node, LIB)

	LIB.add_child(parent, node)
}

/////////////////////////////////////////////////

export default report
export {
	hasꓽbrowser_environment,
	getꓽexecution_context__id,
}
