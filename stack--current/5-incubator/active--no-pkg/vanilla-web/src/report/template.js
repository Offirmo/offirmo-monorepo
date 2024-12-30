
function reportꓽx(parent, LIB) {
	const node = LIB.create_node('XXX')

	node.references.push(
		'link'
	)

	LIB.try_or_report(node, 'trying X', () => {
		node.results.push(['X=', undefined])
	})

	LIB.add_child(parent, node)
}


function reportꓽy(parent, LIB) {
	const node = LIB.create_node('YYY')

	node.references.push(
		'link',
	)

	LIB.try_or_report(node, 'trying Y', () => {
		throw new Error('TEST error!')
	})

	node.notifications.push(['NIMP!', new Error(`Not implemented!`)])

	LIB.add_child(parent, node)
}


export default function report(parent, LIB) {
	const node = LIB.create_node('Demo')

	reportꓽx(node, LIB)
	reportꓽy(node, LIB)

	LIB.add_child(parent, node)
}
