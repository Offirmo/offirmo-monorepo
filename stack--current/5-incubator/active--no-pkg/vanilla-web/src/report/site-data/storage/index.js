
import reportꓽcookies from "./cookies/index.js"
import reportꓽwebᝍstorage from "./web-storage/index.js"




function reportꓽhasStorageAccess(parent, LIB) {
	const node = LIB.create_node('document.hasStorageAccess()')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Web/API/Document/hasStorageAccess',
	)

	LIB.try_or_report(node, 'invoking hasStorageAccess()', () => {
		node.results.push(['document.hasStorageAccess()=', document.hasStorageAccess()])
		return document.hasStorageAccess()
			.then(hasStorageAccess => {
				node.results.push(['resolved to =', hasStorageAccess])

				if (!hasStorageAccess)
					node.notifications.push(['not storage access!'])
			})
	})

	LIB.add_child(parent, node)
}


export default function report(parent, LIB) {
	const node = LIB.create_node('Storage')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Client-side_storage',
	)

	reportꓽhasStorageAccess(node, LIB)
	reportꓽcookies(node, LIB)
	reportꓽwebᝍstorage(node, LIB)

	LIB.add_child(parent, node)
}

// TODO https://developer.mozilla.org/en-US/docs/Web/API/Storage_API
