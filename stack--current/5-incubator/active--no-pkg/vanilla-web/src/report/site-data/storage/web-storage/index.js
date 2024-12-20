
function reportꓽStorage(parent, LIB) {
	const node = LIB.create_node('localStorage')

	node.references.push(
		'link'
	)

	LIB.try_or_report(node, 'trying X', () => {
		node.results.push(['X=', undefined])
	})

	LIB.add_child(parent, node)
}


export default function report(parent, LIB) {
	const node = LIB.create_node('Web Storage')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API',
		'https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria',
	)

	reportꓽStorage(node, LIB)

	LIB.add_child(parent, node)
}
