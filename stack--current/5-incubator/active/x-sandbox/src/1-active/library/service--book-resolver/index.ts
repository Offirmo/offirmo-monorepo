import { BookRegistry } from './observable.ts'

/////////////////////////////////////////////////

const registry = new BookRegistry()

/////////////////////////////////////////////////

export type { BookResolver } from './types.ts'
export {
	registry,
}
