/* Utilities related to Promises
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

type MapFn<T> = (elt: T, index: number, array: ReadonlyArray<T>) => Promise<void>

// TODO improve readability
function forArray<T = any>(elements: ReadonlyArray<T>) {
	return {
		// TODO clarify behaviour on failure -> continue with next?
		async executeSequentially(mapFn: MapFn<T>): Promise<void> {
			return elements.reduce(async (acc, elt: T, i: number) => {
				await acc
				const awaitable = mapFn(elt, i, elements)
				await Promise.resolve(awaitable) // wrapping for safety in dynamic situation
			}, Promise.resolve())
		},
	}
}

/////////////////////////////////////////////////

export {
	forArray,
}
