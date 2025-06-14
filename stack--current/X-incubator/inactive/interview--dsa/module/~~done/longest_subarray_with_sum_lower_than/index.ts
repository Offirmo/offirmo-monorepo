import { describe, it, mock, before, beforeEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

/////////////////////////////////////////////////

// Big O = recursive with branch = 2x branches, n depth = O(2^n)
function find_longest_subarray_with_sum_lower_than__v0(a: number[], k: number): number[] {
	const sum = a.reduce((a, n) => a + n, 0)
	if (sum <= k)
		return a

	const left = find_longest_subarray_with_sum_lower_than(a.slice(0, -1), k)
	const right = find_longest_subarray_with_sum_lower_than(a.slice(1), k)
	return (left.length > right.length) ? left : right
}

// Big O = 3 loops (incl. reduce) = bit lower than O(n^3)
function find_longest_subarray_with_sum_lower_than__v1(a: number[], k: number): number[] {
	for (let l = a.length; l >=0; --l) {
		for (let start = 0; start <= a.length - l; ++start) {
			const candidate = a.slice(start, start + l)
			const sum = candidate.reduce((a, n) => a + n, 0)
			if (sum <= k)
				return candidate
		}
	}
	return []
}

// TODO better
function find_longest_subarray_with_sum_lower_than(a: number[], k: number): number[] {
	for (let l = a.length; l >=0; --l) {
		for (let start = 0; start <= a.length - l; ++start) {
			const candidate = a.slice(start, start + l)
			const sum = candidate.reduce((a, n) => a + n, 0)
			if (sum <= k)
				return candidate
		}
	}
	return []
}

/////////////////////////////////////////////////

describe('subarray finder', () => {
	function test_case<F extends (...args: any) => any>(...args: [ ...Parameters<F>, ReturnType<F> ]): void {
		const expected = args.pop()

		it(`should work -- ${util.inspect(args)} => ${util.inspect(expected)}`, () => {
			assert.deepEqual(
				// @ts-ignore
				find_longest_subarray_with_sum_lower_than(...args),
				expected,
			)
		})
	}

	test_case([], 0, [])
	test_case([ 0 ], 0, [ 0 ])
	test_case([ 1, 1, 1 ], 2, [ 1, 1 ])
	test_case([ 1, -1, 1, -1 ], 2, [ 1, -1, 1, -1 ])
	test_case([ 1, 1, 1, -1 ], 2, [ 1, 1, 1, -1 ])
	test_case([ 10, 1, 1, 10 ], 2, 0, [ 1, 1 ])
	test_case([ 10, 1, 10, 1, 1, 10 ], 2, [ 1, 1 ])
	// TODO add micro-bench
})
