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

function _longestOnes(repr: Array<number>, k: number, counts: [ number, number ]): number {
	if (counts[1] === 0)
		return Math.min(counts[0], k)

	if (counts[0] === 0)
		return counts[1]

	if (k === 0) {
		return Math.max(...repr)
	}

	if (k < Math.abs(Math.max(...repr.filter(s => s < 0)))) {
		// no more holes is fillable
		// the best we can do is to extend the longest
		return Math.max(...repr.filter(s => s > 0)) + k
	}

	let longest = Number.NEGATIVE_INFINITY
	repr.forEach((segment, index) => {
		if (segment > 0) {
			return;
		}
		else if (segment === 0) {
			throw new Error('Impossible!')
		}
		else {
			// string of 0. is it a hole?
			if (index > 0 && index < (repr.length - 1 )) {
				// yes. can we fill it?
				if (k >= -segment) {
					// yes!
					const variation = repr.toSpliced(index - 1, 3, repr.at(index-1)! - segment + repr.at(index + 1)!)
					longest = Math.max(longest, _longestOnes(variation, k + segment, [ counts[0] + segment, counts[1] - segment]))
				}
			}
		}
	})

	if (longest === Number.NEGATIVE_INFINITY) {
		// there is no holes but side 0
		// the best we can do is to extend the longest
		return Math.max(...repr.filter(s => s > 0)) + k
	}

	return longest
}

function longestOnes(nums: Array<1 | 0>, k: number): number {
	const counts = getꓽcounts(nums)

	k = Math.min(k, counts[0])

	let prev = undefined
	const repr: Array<number> = nums.reduce((acc, num) => {
		const increment = num ? +1 : -1
		if (num === prev)
			acc.splice(-1, 1, (acc.at(-1) ?? 0) + increment)
		else {
			acc.push(increment)
		}
		prev = num
		return acc
	}, [] as Array<number>)

	return _longestOnes(repr, k, counts)
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
	// test_case([0, 0, 0, 0], 0, 0)
	test_case([0, 0, 0, 0], 2, 2)

	test_case([1], 0, 1)
	test_case([1], 1, 1)
	test_case([1], 2, 1)

	test_case([0, 1], 0, 1)
	test_case([0, 1], 1, 2)
	test_case([0, 1], 2, 2)

	test_case([1,1,1,0,0,0,1,1,1,1,0], 2, 6)
	test_case([0,0, 1,1, 0,0, 1,1,1, 0, 1,1, 0,0,0, 1,1,1,1], 3, 10)

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
	], 8, 25)

	test_case(
		[1,1,1,0,0,1,0,1,0,1,0,1,1,0,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,0,0,1,1,0,1,1,1,1,1,1,0,1,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,1,0,1,0,1,0,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,1,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,0,0,1,1,1,1,0,1,0,0,0,1,1,0,0,1,0,1,0,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1,0,1,0,0,1,0,0,0,0,1,1,0,1,1,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,0,0,1,0,0,0,0,1,1,1,1,0,0,1,0,0,1,0,0,0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,1,0,1,0,1,1,1,0,0,0,0,1,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,1,0,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,1,1,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1,1,1,1,0,0,1,0,1,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,0,1,0,1,0,1,1,0,0,1,0,0,1,0,1,1,1,1,1,0,1,0,0,0,0,1,1,0,1,1,0,1,1,0,1,0,1,1,1,0,0,1,0,1,1,0,0,0,0,1,1,0,1,1,1,0,1,1,1,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,0,0,0,1,0,1,1,1,0,0,0,0,0,1,1,0,1,0,0,0,0,1,1,0,0,1,0,1,0,0,1,1,1,0,1,0,1,1,0,0,1,1,0,1,1,0,0,0,0,0,0,0,1,0,1,1,0,1,1,0,0,0,0,0,0,1,0,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,0,0,1,0,1,1,1,1,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,1,1,0,0,0,0,1,0,1,0,0,0,1,0,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,0,0,1,0,0,1,1,0,0,1,1],
		144,
		20 // ???
	)

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
