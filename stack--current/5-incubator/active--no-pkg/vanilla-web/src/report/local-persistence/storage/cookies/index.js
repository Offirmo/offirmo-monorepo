// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

function reportꓽDocumentCookies(parent, LIB) {
	const node = LIB.create_node('document.cookies')

	node.references.push('https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie')

	const raw_cookies = (() => {
		try {
			node.results.push(['document.cookies=', document.cookies])
			return document.cookies
		} catch (err) {
			node.notifications.push(['error reading document.cookies', err])
		}
		return undefined
	})()

	if (typeof raw_cookies === 'undefined') {
		// no cookies ever set
		node.results.push(['(empty)'])
	}
	else if (typeof raw_cookies !== 'string') {
		// is that possible ?
		node.notifications.push(['document.cookies is not a string!', {typeof: typeof raw_cookies}])
	}
	else {
		node.results.push(['length', raw_cookies.length])

		const split = String(raw_cookies)
			.split(';')
			.map(s => s.trim())
			.filter(s => !!s)
		node.results.push(['# of entries', split.length])

		const entries = split.map(s => s.split('='))
		node.results.push([Object.fromEntries(entries)])

		// TODO warn if too big?
		// TODO check if writable
	}

	LIB.add_child(parent, node)
}



export default function report(parent, LIB) {
	const node = LIB.create_node('Cookies')

	node.references.push('https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies')

	reportꓽDocumentCookies(node, LIB)

	LIB.add_child(parent, node)
}

// TODO 3p cookies allowed?
// TODO write allowed?
// TODO https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API
