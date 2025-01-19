/**
 *
 */

import { INTERNAL_PROP } from '../../../consts.js'

/////////////////////////////////////////////////

function reportꓽdb(parent, LIB, {name, version}) {
	const node = LIB.create_node_and_work(`database "${name}" rev${version}`, node => {
		const ↆreq = toPromise(indexedDB.open(name, version))
		ↆreq
			.then(async ([db]) => {
				node.results.push(['object store names:', db.objectStoreNames])
			})
			.catch(err => {
				node.notifications.push(['indexedDB access issue!', err])
			})
	})
	LIB.add_child(parent, node)
}


// TODO externalize
async function toPromise(req /** : IDBRequest */ ) {
	const resolved = false

	const { promise, resolve, reject } = Promise.withResolvers()

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
			// DEBUG
			const ↆreq = toPromise(indexedDB.open(INTERNAL_PROP, 1))
			ↆreq.then(([db]) => {
				// TODO populate with data
					/*console.log(`XXX `, db)
					const objectStore = db
						.transaction(["toDoList"], "readwrite")
						.objectStore("toDoList");*/
				})
				.catch(err => {
					node.notifications.push(['indexedDB access issue!', err])
				})

			const ↆdatabases = indexedDB.databases()
			const result = ['databases =', ↆdatabases, 'pending…']
			node.results.push(result)
			ↆdatabases.then(res => {
				result[2] = res

				res.forEach((db_infos) => {
					reportꓽdb(node, LIB, db_infos)
				})
			})
		}
	})
	LIB.add_child(parent, node)
}

/////////////////////////////////////////////////

export default report
