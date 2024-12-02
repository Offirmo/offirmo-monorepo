/* PROMPT
 * ’
 */

import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////
// Notes: Typescript
// https://stackoverflow.com/questions/49464634/difference-between-object-and-object-in-typescript
// {} = any (non-null/undefined) value with zero or more properties, Doesn't Mean object! https://github.com/microsoft/TypeScript/wiki/FAQ#primitives-are---and---doesnt-mean-object
// object = values which have Object in their prototype chain https://github.com/microsoft/TypeScript/wiki/FAQ#primitives-are---and---doesnt-mean-object
// Object = ??? accepts numbers??

// use case: to avoid it!
// https://2ality.com/2012/03/signedzero.html (outdated)
function isꓽnegative_zero(x: number): x is -0 {
	return Object.is(x, -0)
}

// use case: to avoid it!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values
/*function isꓽprimitive_object_wrapper(o: object): boolean {
	throw new Error('NIMP!')
}*/

// use case: for type guards
// naming: difficult!!!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals
// also JSON "object is an unordered set of name/value pairs"
function isꓽobjectⵧliteral(o: Immutable<object>): o is object {
	if (typeof o !== 'object')
		return false

	if (!o)
		return false

	if (Array.isArray(o))
		return false

	// "normal" objects have Object as constructor
	// technically we could also accept null proto https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects
	// but they're unlikely to be "normal"
	const proto = Object.getPrototypeOf(o)
	return proto && proto.constructor === Object
}


// https://devdocs.io/javascript/global_objects/promise#thenables
interface Thenable<T> {
	then<TResult1 = T, TResult2 = never>(
		// inspired by interface PromiseLike<T>
		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
	): void
}

// credits: inspired by https://github.com/then/is-promise/blob/master/index.mjs
function isꓽthenable<T>(p: Immutable<Thenable<T> | any>): p is Thenable<T> {
	return typeof p?.then === 'function'
}

/////////////////////////////////////////////////

export {
	isꓽnegative_zero,
	//isꓽprimitive_object_wrapper,
	isꓽobjectⵧliteral,
	isꓽthenable,
}
