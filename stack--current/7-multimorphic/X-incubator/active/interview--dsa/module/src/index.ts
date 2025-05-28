import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////


/////////////////////////////////////////////////

function foo(expression: string): number {
	throw new Error(`NIMP!`)
}

/////////////////////////////////////////////////

describe('exercise', () => {
	const FUT = foo
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

	test_case('1 - 1', 0)

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
