
import { hasꓽbrowser_environment } from '../../../environment/execution-context/index.js'

/////////////////////////////////////////////////

/**
 * returns a K/V representation of all the content of the given storage, for snapshot purpose.
 */
function getStorageSnapshot(
	storage,
) {
	if (!storage) {
		return {};
	}

	return Array.from({ length: storage.length })
		.map((_, index) => storage.key(index))
		.sort() // for stability across snapshots
		.reduce((acc, key) => {
			acc[key] = storage.getItem(key);
			return acc;
		}, {});
}


// fill storage and return the bytes written
// or throw if other unexpected behavior
const LSKEY_FILL = '_FILL'
function fillStorage(storage) {
	console.log(`⏳ Please wait, testing storage capacity…`)

	const OVER_QUOTA_SIZE = 10_000_000 // limit is supposed to be 5Mb
	const buffer = 'X'.repeat(OVER_QUOTA_SIZE)

	let last_success = (storage.setItem(LSKEY_FILL, ''), 0)
	let last_failure = OVER_QUOTA_SIZE
	let last_try = undefined
	do {
		const size = Math.ceil((last_success + last_failure) / 2)
		//console.log(`last success = ${last_success} <= trying = ${size} <= last failure = ${last_failure}`)
		if (size === last_try) {
			throw new Error('Loop!')
		}
		last_try = size

		try {
			storage.setItem(LSKEY_FILL, buffer.slice(0, size))

			// success
			last_success = size
			// we need to try a higher value
			if (last_failure === OVER_QUOTA_SIZE && last_success === 0) {
				// safety
				throw new Error(`can't fill the storage, please update algo (starting too low)!`)
			}
			else if (last_failure === last_success + 1) {
				//console.log(`remaining storage found:`, size)
				return size + LSKEY_FILL.length
			}
		}
		catch (err) {
			if (err.message.toLowerCase().includes('quota')) {
				last_failure = size
			}
			else {
				throw err
			}
		}
	} while (true)
	return last_try ?? 0
}

function getRemainingStorageSpace(storage) {
	const remaining = fillStorage(storage)

	// is the algo working?
	try {
		storage.setItem('', 'X')
		console.error(`Unexpectedly can still write in storage!`)
	}
	catch (err) {
		// as expected
	}

	/* test of behavior when full
	try {
		const existing = storage.getItem(LSKEY_FILL)
		storage.setItem(LSKEY_FILL, existing)
		console.log(`success rewriting...`)

		storage.setItem('', '')
		console.log(`success minimal entry...`)

		storage.setItem('a', '')
		console.log(`success minimal entry...`)
	}
	catch (err) {
		console.error(`error filling LS:`, err)
	}*/

	// cleanup
	try {
		storage.removeItem(LSKEY_FILL)
		storage.removeItem('')
	}
	catch { /* swallow */ }

	return remaining
}

function _reportꓽstorage(storage, node, LIB) {
	try {
		// clear potential previous failed invocation of this code
		storage.removeItem(LSKEY_FILL)
	}
	catch { /* swallow */ }

	LIB.try_or_report(node, 'snapshotting storage', () => {
		const snapshot = getStorageSnapshot(storage)
		node.results.push(['snapshot =', snapshot])

		const keys = Object.keys(snapshot)
		node.results.push(['entries count =', keys.length])

		const currently_used_size_bytes = keys.reduce((acc, k) => {
			acc += k.length
			acc += (snapshot[k] || '').length
			return acc
		}, 0)
		node.results.push(['size -- currently used         =', LIB.formatNumberToPrettyBytesSI(currently_used_size_bytes)])

		const currently_usable_size = getRemainingStorageSpace(storage)
		node.results.push(['size -- currently max writable =', LIB.formatNumberToPrettyBytesSI(currently_usable_size)])
		node.results.push(['size -- total                  =', LIB.formatNumberToPrettyBytesSI(currently_used_size_bytes + currently_usable_size) + ` (${LIB.formatNumber(currently_used_size_bytes + currently_usable_size)})`])
	})
}

function reportꓽlocalStorage(parent, LIB) {
	const node = LIB.create_node('localStorage')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage',
		'https://www.rdegges.com/2018/please-stop-using-local-storage/',
	)

	if (!globalThis.localStorage) {
		const isꓽexpected = hasꓽbrowser_environment()
		if (isꓽexpected)
			node.notifications.push(['missing localStorage ❌'])
		else {
			// nothing to report
		}
	}
	else {
		// could be native or polyfilled, we can't know
		_reportꓽstorage(localStorage, node, LIB)
	}

	LIB.add_child(parent, node)
}

function reportꓽsessionStorage(parent, LIB) {
	const node = LIB.create_node('sessionStorage')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage',
	)

	if (!globalThis.sessionStorage) {
		const isꓽexpected = hasꓽbrowser_environment()
		if (isꓽexpected)
			node.notifications.push(['missing sessionStorage ❌'])
		else {
			// nothing to report
		}
	}
	else {
		// could be native or polyfilled, we can't know
		_reportꓽstorage(sessionStorage, node, LIB)
	}

	LIB.add_child(parent, node)
}

export default function report(parent, LIB) {
	const node = LIB.create_node('Web Storage')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API',
		'https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria',
	)

	reportꓽsessionStorage(node, LIB)
	reportꓽlocalStorage(node, LIB)

	LIB.add_child(parent, node)
}

/////////////////////////////////////////////////
