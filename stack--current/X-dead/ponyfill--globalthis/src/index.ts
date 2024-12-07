/* global globalThis, self, window, global */

const lastResort: { [k:string]: any } = {}

export default function getGlobalThis<T = typeof globalThis>(this: any): T {

	if (typeof globalThis !== 'undefined') return globalThis as any

	// check node first https://github.com/ljharb/globalThis/issues/2
	if (typeof global !== 'undefined') return global as any

	// @ts-expect-error TS2304
	if (typeof self !== 'undefined') return self

	// @ts-expect-error TS2304
	if (typeof window !== 'undefined') return window

	if (typeof this !== 'undefined') return this

	return lastResort as any // should never happen
}

export { getGlobalThis }
