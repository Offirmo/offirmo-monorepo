/**
 *
 */

/////////////////////////////////////////////////

function reportꓽx(parent, LIB) {
	const node = LIB.create_node_and_work('node X', node => {
		node.references.push(
			'link'
		)

		LIB.try_or_report(node, 'trying X…', () => {
			node.results.push(['X =', undefined])
		})
	})
	LIB.add_child(parent, node)
}


function reportꓽy(parent, LIB) {
	const node = LIB.create_node_and_work('node Y', node => {
		node.references.push(
			'link',
		)

		LIB.try_or_report(node, 'trying Y…', () => {
			throw new Error('TEST error!')
		})

		node.notifications.push(['NIMP!', new Error(`Not implemented!`)])
	})
	LIB.add_child(parent, node)
}


function report(parent, LIB) {
	const node = LIB.create_node_and_work('Demo', node => {
		reportꓽx(node, LIB)
		reportꓽy(node, LIB)
	})
	LIB.add_child(parent, node)
}

/////////////////////////////////////////////////

export default report
