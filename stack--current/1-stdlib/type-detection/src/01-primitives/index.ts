/* runtime type detection: primitive types
 */

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

// Is it a "key/value" object (not null, not an array)
// naming: difficult!!!
// use case: for type guards
function isꓽobjectⵧkv(o: object): o is object {
	if (typeof o !== 'object')
		return false

	if (!o)
		return false

	if (Array.isArray(o))
		return false

	return true
}

// is it a "key/value" object (not null, not an array) ALSO not a complex/class one
// naming: difficult!!!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals
// use case: for type guards
// also JSON "object is an unordered set of name/value pairs"
function isꓽobjectⵧliteral(o: object): o is object {
	if (!isꓽobjectⵧkv(o))
		return false

	// "normal" objects have Object as constructor
	// technically we could also accept null proto https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects
	// but they're unlikely to be "normal"
	const proto = Object.getPrototypeOf(o)
	return proto && proto.constructor === Object
}

// use case: in RichText, avoid wrong ordering of numeric keys
function isꓽexact_stringified_number(s: string): boolean {
	if (typeof s !== 'string')
		return false

	const n = Number(s)
	if (isNaN(n)) return false // bc NOT a number

	return String(n) === s
}

/////////////////////////////////////////////////

export {
	isꓽnegative_zero,
	isꓽobjectⵧkv,
	isꓽobjectⵧliteral,
	isꓽexact_stringified_number,
}
