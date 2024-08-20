import { describe, it, mock, before, beforeEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////


/////////////////////////////////////////////////

function foo(s: never): never {
	throw new Error('TODO!')
}

/////////////////////////////////////////////////

describe('exercise', () => {

	const FUT = foo
	function test_case(...args: [ ...Parameters<typeof FUT>, ReturnType<typeof FUT> ]) {
		const resultⵧexpected = args.pop()
		const params: Parameters<typeof FUT> = args as any

		return it(`should work -- ${util.inspect(params)} => ${util.inspect(resultⵧexpected)}`, (t) => {
			const resultⵧactual = FUT(...params)
			assert.deepEqual(
				resultⵧactual,
				resultⵧexpected,
			)
		})
	}

	test_case([
		'romane',
		'romanus',
		'romulus',
	], 'rom')

	
	/*it.skip('should be fast', async() => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 });
		bench
			.add('v0', () => get_victor_v0([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))
			.add('current', () => FUT([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))

		await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run();
		console.table(bench.table());
	})*/
})
