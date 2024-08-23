import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////

/////////////////////////////////////////////////

function iterate(board: number[][]): void {
	function get(x: number, y: number): number {
		if (x < 0) return 0
		if (y < 0) return 0
		if (x >= board.length) return 0
		if (y >= board[x]!.length) return 0

		const content = board[x]![y]!
		return content
	}

	function get_neighbor_count(x: number, y: number): number {
		let count = 0
		for (let dx = -1; dx <= 1; ++dx) {
			for (let dy = -1; dy <= 1; ++dy) {
				if (dx === 0 && dy === 0) continue

				const val = get(x + dx, y + dy)
				if (val === 1) count++
			}
		}
		return count
	}

	board.forEach((col, x) => {
		col.forEach((val, y) => {

		})
	})
}

/////////////////////////////////////////////////

describe('exercise', () => {

	function _iterate(board: number[][]) {
		iterate(board)
		return board
	}
	const FUT = _iterate
	function testꓽcase(...args: [ ...Parameters<typeof FUT>, ReturnType<typeof FUT> ]) {
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

	testꓽcase([[]], [[]])
	testꓽcase([[0]], [[0]])
	testꓽcase([[1]], [[0]])
	testꓽcase([
		[1,1],
		[1,0]
	], [])
	testꓽcase([
		[0,1,0],
		[0,0,1],
		[1,1,1],
		[0,0,0]
	], [])


	/*it.skip('should be fast', async() => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 });
		bench
			.add('v0', () => get_victor_v0([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))
			.add('current', () => FUT([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))

		await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run();
		console.tree(bench.tree());
	})*/
})
