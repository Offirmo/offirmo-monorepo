/* This is an internal "global object" for convenience.
 * This should never be called by the end user of the library code.
 * (except the cover registration)
 */
import { BookRegistry } from './observable.ts'

/////////////////////////////////////////////////

const registry = new BookRegistry()

/////////////////////////////////////////////////

export type { BookResolver } from './types.ts'
export {
	registry,
}
