


function get_iframe_depth() {

}


function reportꓽparent_windows(parent, LIB) {
	const node = LIB.create_node('Parent browsing contexts')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Web/API/Window/parent'
	)

	LIB.try_or_report(node, 'walking parent contexts', () => {
		// Empirically seen: walking up the tree of parents yields inconsistent results
		// (in the context of a dev local app)
		// so we switched to a set:
		const windowsSet = new Set()

		let current_window = self
		windowsSet.add(current_window)

		const RECURSION_LIMIT = 12
		let ancestors_count = 0
		while (current_window !== current_window.parent && ancestors_count < RECURSION_LIMIT) {
			ancestors_count++
			windowsSet.add(current_window.parent)
			current_window = current_window.parent
		}

		node.results.push([
			'encountered parent browsing contexts:',
			windowsSet.size === 0 ? '(none)' : windowsSet,
		])

		node.results.push([
			'# of parent frames:',
			ancestors_count === 0 ? '(none)' : ancestors_count,
		])
		if (ancestors_count) {
			node.notifications.push([
				'we’re an iframe!'
			])
		}

		if (windowsSet.size !== (ancestors_count + 1)) {
			node.notifications.push([
				'parent loop???',
				{
					self,
					'parent count': windowsSet.size,
				}
			])
		}
	})

	LIB.add_child(parent, node)
}



export default function report(parent, LIB) {
	const node = LIB.create_node('Ancestry')

	reportꓽparent_windows(node, LIB)

	LIB.add_child(parent, node)
}


// TODO check referrer, history
// TODO https://developer.mozilla.org/en-US/docs/Web/API/Window/opener
