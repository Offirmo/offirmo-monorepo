/* inspired by npm:pathval
 * but modified to
 * - allow dots in the path, for package exports
 * - allow deletes
 * - support immutability
 */

import assert from 'tiny-invariant'

/////////////////////////////////////////////////

const DELETE = '>DELETE<' as const // using a string instead of a symbol to be usable in a json file

function setꓽpropertyⵧdeep<V, O = any>(target: O, path: string, value: V | (typeof DELETE)): O {
	const SEPARATOR = path.startsWith('|') ? '|' : '.'
	const path‿split = path.split(SEPARATOR)
	if (SEPARATOR === '|') {
		path‿split.shift()
	}

	let hasꓽmutation = false // so far
	let result = {...target} as any
	let current = result as any
	path‿split.forEach((segment, index) => {
		assert(!!segment, `All segments should be truthy: #${index} of "${path}"!`)

		const hasꓽleaf = Object.hasOwn(current, segment)

		if (index === path‿split.length - 1) {
			// last segment

			if (value === DELETE) {
				if (!hasꓽleaf) {
					// already absent
					// no change
					return
				}

				// delete the property
				delete current[segment]
				hasꓽmutation = true
				return
			}

			if (hasꓽleaf && current[segment] === value) {
				// no change
				return
			}

			current[segment] = value
			hasꓽmutation = true
			return
		}

		if (!hasꓽleaf) {
			// create the property
			// but this doesn't count as a mutation yet (depends on the last item)
			current[segment] = {}
		}
		current[segment] = {...current[segment]}
		current = current[segment]
	})

	return hasꓽmutation
		? result
		: target
}

/////////////////////////////////////////////////

export {
	DELETE,
	setꓽpropertyⵧdeep,
}
