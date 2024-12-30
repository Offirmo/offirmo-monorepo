
function reportSecureContext(parent, LIB) {
	const node = LIB.create_node('Secure Context')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts',
		'https://developer.mozilla.org/en-US/docs/Web/API/Window/isSecureContext',
	)
	LIB.try_or_report(node, 'reading isSecureContext', () => {
		node.results.push(['isSecureContext =', isSecureContext, isSecureContext ? '✅' : '📛'])

		if (!isSecureContext)
			node.notifications.push(['not in a secure context! 📛'])
	})

	LIB.add_child(parent, node)
}


export default function report(parent, LIB) {
	const node = LIB.create_node('Security')

	reportSecureContext(node, LIB)

	LIB.add_child(parent, node)
}
