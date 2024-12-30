

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
	console.log(`Please wait, testing storage capacity…`)
	let size = 10_000_000 // limit is supposed to be 5Mb
	const buffer = 'X'.repeat(size)

	let last_failure_size = undefined
	let last_try = undefined
	do {
		if (size === last_try) {
			throw new Error('Loop!')
		}

		try {
			//console.log(`trying`, size)
			last_try = size
			storage.setItem(LSKEY_FILL, buffer.slice(0, size))

			// success
			if (last_failure_size === undefined) {
				// safety
				throw new Error(`can't fill the storage, please update algo (starting too low)!`)
			}
			else if (last_failure_size > (size + 1)) {
				size = Math.ceil((size + last_failure_size) / 2)
			}
			else {
				//console.log(`remaining storage found:`, size)
				return size + LSKEY_FILL.length
			}
		}
		catch (err) {
			last_failure_size = size
			if (err.message.toLowerCase().includes('quota')) {
				size = Math.ceil(size/2)
			}
			else {
				throw err
			}
		}
	} while (size > 1);
	return last_try ?? 0
}

function getRemainingStorageSpace(storage) {
	const remaining = fillStorage(storage)
	try {
		storage.removeItem(LSKEY_FILL)
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

	_reportꓽstorage(localStorage, node, LIB)

	LIB.add_child(parent, node)
}

function reportꓽsessionStorage(parent, LIB) {
	const node = LIB.create_node('sessionStorage')

	node.references.push(
		'https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage',
	)

	_reportꓽstorage(sessionStorage, node, LIB)

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
