import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////


/////////////////////////////////////////////////


/////////////////////////////////////////////////

function _fibonacci_V1(nth: number, prev?: [ number, number ]): [ number, number ] {
	if (nth === 0) return [ 0, 0 ]
	if (nth === 1) return [ 0, 1 ]

	prev ??= _fibonacci_V1(nth - 1)
	return [ prev[1], prev[0] + prev[1]]
}

/////////////////////////////////////////////////

function fibonacci_V0(nth: number): number {
	if (nth === 0) return 0
	if (nth === 1) return 1
	return fibonacci(nth-1) + fibonacci(nth-2)
}

function fibonacci(nth: number): number {
	return _fibonacci_V1(nth)[1]
}

/////////////////////////////////////////////////

describe('exercise', () => {

	const FUT = fibonacci
	function test_case(...args: [ ...Parameters<typeof FUT>, ReturnType<typeof FUT> ]) {
		const result__expected: ReturnType<typeof FUT> = args.pop() as any
		const params: Parameters<typeof FUT> = args as any

		const test_id = `${util.inspect(params)} => ${util.inspect(result__expected)}`
		return it(`should work -- ${test_id}`, () => {
			console.group(`starting test ${test_id}...`)


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
			console.groupEnd()
		})
	}

	test_case(0, 0)
	test_case(1, 1)
	test_case(2, 1)
	test_case(3, 2)
	test_case(4, 3)
	test_case(5, 5)
	test_case(6, 8)
	test_case(7, 13)
	test_case(19, 4181)
	test_case(40, 102334155)

	/*it('should be fast', async() => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 })

		bench
			.add('v0', () => fibonacci_V0(40))
			.add('current', () => FUT(40))

		await bench.warmup() // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run()
		console.table(bench.table())
	}))*/
})
