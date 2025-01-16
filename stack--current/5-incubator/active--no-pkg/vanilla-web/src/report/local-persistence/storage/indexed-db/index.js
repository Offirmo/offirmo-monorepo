/**
 *
 */

import { INTERNAL_PROP } from '../../../consts.js'

/////////////////////////////////////////////////

function reportꓽdb(parent, LIB, {name, version}) {
	const node = LIB.create_node_and_work(`database "${name}" rev${version}`, node => {
		LIB.try_or_report(node, 'trying Y…', () => {
			throw new Error('TEST error!')
		})

		node.notifications.push(['NIMP!', new Error(`Not implemented!`)])
	})
	LIB.add_child(parent, node)
}


// TODO externalize
async function toPromise(req /** : IDBRequest */ ) {
	const resolved = false

	const { promise, resolve, reject } = Promise.withResolvers();

	function try_to_resolve() {
		if (req.readyState !== 'done')
			return false

		if (resolved)
			return false

		if (req.error) {
			reject(error)
			return true
		}

		const { result, transaction, source } = req
		resolve([ result, transaction, source ])

		return true
	}

	try_to_resolve()

	if (!resolved) {
		req.addEventListener('error', try_to_resolve)
		req.addEventListener('success', try_to_resolve)

		promise.finally(() => {
			req.removeEventListener('error', try_to_resolve)
			req.removeEventListener('success', try_to_resolve)
		})
	}

	return promise
}



function report(parent, LIB) {
	const node = LIB.create_node_and_work('IndexedDB', node => {
		const { indexedDB } = globalThis

		if (!indexedDB) {
			node.notifications.push(['indexedDB is missing!'])
		}
		else {
			const ↆdatabases = indexedDB.databases()
			const result = ['databases =', ↆdatabases, 'pending…']
			node.results.push(result)
			ↆdatabases.then(res => {
				result[2] = res

				res.forEach((db_infos) => {
					reportꓽdb(node, LIB, db_infos)
				})
			})

			const _ↆreq = indexedDB.open(INTERNAL_PROP, 1)
			console.log(`XXX `, _ↆreq)
			const ↆreq = toPromise(_ↆreq)
			node.results.push(['test db =', ↆreq])
			ↆreq.then(res => {
				console.log(`XXX `, res)
				const [ db ] = res

				const objectStore = db
					.transaction(["toDoList"], "readwrite")
					.objectStore("toDoList");
			})
		}
	})
	LIB.add_child(parent, node)
}

/////////////////////////////////////////////////

export default report
