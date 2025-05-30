import { describe, it, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////


/////////////////////////////////////////////////

function getꓽcounts(nums: Array<1 | 0>): [ number, number ] {

	return nums.reduce((acc, val) => {
		acc[val] += 1
		return acc
	}, [0, 0])
}

function _longestOnes(nums: Array<1 | 0>, k: number, counts: [ number, number ]): number {
	if (counts[0] === 0)
		return counts[1]

	if (k === 0) {
		return Math.max(...nums.join('').split('0').map(s => s.length))
	}

	let result = Number.NEGATIVE_INFINITY
	nums.forEach((num, index) => {
		if (num != 0) return

		const variation = nums.toSpliced(index, 1, 1);
		result = Math.max(result, _longestOnes(variation, k-1, [ counts[0] -1, counts[1] + 1]))
	})

	return result
}

function longestOnes(nums: Array<1 | 0>, k: number): number {
	const counts = getꓽcounts(nums)

	k = Math.min(k, counts[0])

	return _longestOnes(nums, k, counts)
}

/////////////////////////////////////////////////

describe('exercise', () => {
	const FUT = longestOnes
	function test_case(...args: [ ...Parameters<typeof FUT>, ReturnType<typeof FUT> ]) {
		const result__expected: ReturnType<typeof FUT> = args.pop() as any
		const params: Parameters<typeof FUT> = args as any

		const test_id = `${util.inspect(params)} => ${util.inspect(result__expected)}`

		return it(`should work -- ${test_id}`, () => {
			console.group(`starting test ${test_id}...`)
			try {
				const result__actual = (() => {
					try {
						return FUT(...params)
					}
					catch (err) {
						console.error(`Error encountered executing!`, err)
						throw err
					}
				})()

				if (!util.isDeepStrictEqual(result__actual, result__expected)) {
					// extra debug
					console.error(`!isDeepStrictEqual !!!`)
					const INSPECT_OPTIONS = {
						depth: Infinity,
						colors: true,
						maxArrayLength: Infinity,
						//breakLength: getꓽterminal_size().columns,
						//compact: true,
					}
					console.log(`expected:\n` + util.inspect(result__expected, INSPECT_OPTIONS))
					console.log(`actual:\n` + util.inspect(result__actual, INSPECT_OPTIONS))
					console.log('now continuing test...')
				}

				assert.deepEqual(
					result__actual,
					result__expected,
				)
			}
			finally {
				console.groupEnd()
			}
		})
	}

	// test_case([], 0, 0)
	//
	// test_case([1], 0, 1)
	// test_case([1], 1, 1)
	// test_case([1], 2, 1)
	//
	// test_case([0, 1], 0, 1)
	// test_case([0, 1], 1, 2)
	// test_case([0, 1], 2, 2)
	//
	// test_case([1,1,1,0,0,0,1,1,1,1,0], 2, 6)
	// test_case([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3, 10)

	test_case([
		1,
		0,0,0,
		1,1,
		0,0,
		1,1,
		0,0,0,0,0,0,
		1,1,1,1,
		0,
		1,
		0,
		1,1,1,1,1,1,
		0,
		1,
		0,
		1,
		0,0,
		1,1,
		0,
		1,1
	], 8, 12)

	/*it('should be fast', async () => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 })

		bench
			.add('v0', () => V0(40))
			.add('current', () => FUT(40))

		await bench.warmup() // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run()
		console.table(bench.table())
	})*/
})
