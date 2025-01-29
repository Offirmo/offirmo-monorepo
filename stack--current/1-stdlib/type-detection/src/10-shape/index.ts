
import {assert } from '../00-embedded-deps/assert/index.ts'
import {
	isꓽobjectⵧkv,
	isꓽobjectⵧliteral,
} from '../01-primitives/index.ts'
import {
	isꓽthenable,
} from '../02-thenable/index.ts'

/////////////////////////////////////////////////

// same as typeof but for better matching
// returns:
// - "undefined"
// - "array" NEW
// - "null" NEW
// - "boolean"
// - "number"
// - "bigint"
// - "string"
// - "symbol"
// - "function"
// - "thenable" NEW
// - "object"
// Use case: shape matching, see below
function getꓽtypeofⵧimproved(x: any): string {
	const t = typeof x

	switch(t) {
		case 'object':
			if (Array.isArray(x))
				return 'array'
			if (x === null)
				return 'null'
			break
		default:
			break
	}

	if (isꓽthenable(x))
		return 'thenable'

	return t
}

/////////////////////////////////////////////////

type Options = {
	match_reference_props:
		| 'all' // all properties from ref must be matched by tested
		| 'some' // tested must have at least 1 prop from ref
		// add more one day if needed

	allow_extra_props: boolean // allow/disallow extraneous properties

	type_match:
		| 'any' // no type test on matching props
		//| 'typeof' // typeof
		| 'simple' // typeof + slight improvements to not match arrays/null

	test_depth: 0 // which depth to go. !0 not supported yet
}

function hasꓽshape<T extends object>(reference: T, under_test: object, {
	match_reference_props = 'all',
	allow_extra_props = true,
	type_match = 'simple',
	test_depth = 0,
}: Partial<Options> = {}): under_test is T {
	assert(isꓽobjectⵧkv(reference), `hasꓽshape: ref should be a k/v object!`)
	assert(isꓽobjectⵧkv(under_test), `hasꓽshape: under_test should be a k/v object!`)

	const keysⵧref = new Set<string>(Object.keys(reference))
	const keysⵧunder_test = new Set<string>(Object.keys(under_test))

	const keysⵧmatching = keysⵧunder_test.intersection(keysⵧref) as Set<keyof typeof reference>

	switch (match_reference_props) {
		case 'all':
			if (!keysⵧunder_test.isSupersetOf(keysⵧref))
				return false
			break
		case 'some':
			if (keysⵧmatching.size === 0)
				return false
			break
		default:
			throw new Error(`hasꓽshape: unsupported match_reference_props value!`)
	}

	if (!allow_extra_props) {
		if (keysⵧunder_test.union(keysⵧref).size > keysⵧref.size)
			return false
	}


	switch (type_match) {
		case 'any':
			// no further test
			// no need to recurse
			break
		case 'simple': {
			for (const key of keysⵧmatching) {
				if (getꓽtypeofⵧimproved(reference[key]) !== getꓽtypeofⵧimproved((under_test as any)[key]))
					return false
			}
			assert(test_depth === 0, `unsupported test_depth!`)
			break
		}
		default:
			throw new Error(`hasꓽshape: unsupported type_match value!`)
	}

	return true
}

/////////////////////////////////////////////////

export {
	getꓽtypeofⵧimproved,
	hasꓽshape,
}
