import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'
import * as console from 'node:console'

/////////////////////////////////////////////////
// https://leetcode.com/problems/game-of-life/

// can't store undefined, of course!
type SparseArray<T> = undefined | Array<undefined | T>
type SparseMatrix<T> = SparseArray<SparseArray<T>>

/////////////////////////////////////////////////

function get_from_sparse_array<T>(matrix: SparseMatrix<T>, x: number, y: number, fallback: T): T {
	if (!matrix) return fallback

	if (x < 0) return fallback
	if (y < 0) return fallback

	const col = matrix[x]
	if (!col) return fallback

	const cell = col[y]
	return cell ?? fallback
}

class DynamicMatrix<T> {
	underlying: SparseMatrix<T>
	minX: number
	minY: number
	maxX: number
	maxY: number

	constructor(initial = undefined as SparseMatrix<T>) {
		this.underlying = []
		this.minX = this.minY = this.maxX = this.maxY = 0

		if (initial) {
			initial.forEach((col, x) => {
				col?.forEach((val, y) => {
					if (val !== undefined)
						this.set(x, y, val)
				})
			})
		}
	}

	get(x: number, y: number, fallback: T): T {
		return get_from_sparse_array<T>(this.underlying, x, y, fallback)
	}

	set(x: number, y:number, v: T): void {
		this.underlying![x] ??= []
		this.underlying![x]![y] = v
		this.minX = Math.min(x, this.minX)
		this.minY = Math.min(x, this.minY)
		this.maxX = Math.max(x, this.maxX)
		this.maxY = Math.max(x, this.maxY)
	}
}

/////////////////////////////////////////////////
const DEBUG = true

/**
 Do not return anything, modify board in-place instead.
 */
function gameOfLife_V0(board: number[][]): void {
	const previous_state = structuredClone(board)

	function get_neighbor_count(x: number, y: number): number {
		let count = 0
		for (let dx = -1; dx <= 1; ++dx) {
			for (let dy = -1; dy <= 1; ++dy) {
				if (dx === 0 && dy === 0) continue
				const val = get_from_sparse_array(previous_state, x + dx, y + dy, 0)
				count += val
			}
		}
		return count
	}

	board.forEach((col, x) => {
		col.forEach((val, y) => {
			const neighbor_count = get_neighbor_count(x, y)
			DEBUG && console.log(`cell [${x}][${y}] has ${neighbor_count} neighbors`)

			if (neighbor_count < 2) {
				DEBUG && console.log(`cell [${x}][${y}] dies of underpop`)
				board[x]![y] = 0
				return
			}

			if (neighbor_count > 3) {
				DEBUG && console.log(`cell [${x}][${y}] dies of overpop`)
				board[x]![y] = 0
				return
			}

			if (neighbor_count === 3) {
				if (!val) {
					DEBUG && console.log(`cell [${x}][${y}] get born`)
					board[x]![y] = 1
					return
				}
			}

			DEBUG && console.log(`cell [${x}][${y}] stays ${val}`)
			board[x]![y] = val
		})
	})
}

function gameOfLife_V1(board: number[][]): void {
	function get_neighbor_count(x: number, y: number): number {
		let count = 0
		for (let dx = -1; dx <= 1; ++dx) {
			for (let dy = -1; dy <= 1; ++dy) {
				if (dx === 0 && dy === 0) continue
				let val = get_from_sparse_array(board, x + dx, y + dy, 0)
				if (val >= 10) {
					val = val % 2
				}
				count += val
			}
		}
		return count
	}

	board.forEach((col, x) => {
		col.forEach((val, y) => {
			const neighbor_count = get_neighbor_count(x, y)
			DEBUG && console.log(`cell [${x}][${y}] has ${neighbor_count} neighbors`)

			if (neighbor_count < 2) {
				DEBUG && console.log(`cell [${x}][${y}] dies of underpop`)
				board[x]![y] = val ? 1 : 0
				return
			}

			if (neighbor_count > 3) {
				DEBUG && console.log(`cell [${x}][${y}] dies of overpop`)
				board[x]![y] = val ? 1 : 0
				return
			}

			if (neighbor_count === 3) {
				if (!val) {
					DEBUG && console.log(`cell [${x}][${y}] get born`)
					board[x]![y] = val ? 11 : 10
					return
				}
			}

			DEBUG && console.log(`cell [${x}][${y}] stays ${val}`)
			board[x]![y] = val ? 11 : 0
		})
	})

	board.forEach((col, x) => {
		col.forEach((val, y) => {
			board[x]![y] = board[x]![y]! >= 10 ? 1 : 0
		})
	})
}

function gameOfLife(board: number[][]): void {
	const previous_state = new DynamicMatrix(board)

	function get_neighbor_count(x: number, y: number): number {
		let count = 0
		for (let dx = -1; dx <= 1; ++dx) {
			for (let dy = -1; dy <= 1; ++dy) {
				if (dx === 0 && dy === 0) continue
				const val = previous_state.get(x + dx, y + dy, 0)
				count += val
			}
		}
		return count
	}

	board.forEach((col, x) => {
		col.forEach((val, y) => {
			const neighbor_count = get_neighbor_count(x, y)
			DEBUG && console.log(`cell [${x}][${y}] has ${neighbor_count} neighbors`)

			if (neighbor_count < 2) {
				DEBUG && console.log(`cell [${x}][${y}] dies of underpop`)
				board[x]![y] = 0
				return
			}

			if (neighbor_count > 3) {
				DEBUG && console.log(`cell [${x}][${y}] dies of overpop`)
				board[x]![y] = 0
				return
			}

			if (neighbor_count === 3) {
				if (!val) {
					DEBUG && console.log(`cell [${x}][${y}] get born`)
					board[x]![y] = 1
					return
				}
			}

			DEBUG && console.log(`cell [${x}][${y}] stays ${val}`)
			board[x]![y] = val
		})
	})
}

/////////////////////////////////////////////////

function _iterateGameOfLife(board: number[][]): number[][] {
	gameOfLife(board)
	return board
}

/////////////////////////////////////////////////

describe('exercise', () => {

	const FUT = _iterateGameOfLife
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

	test_case([[0,0,0],[0,0,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]])
	test_case([[0,0,0],[0,1,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]])
	test_case([[0,1,0],[0,1,0],[0,0,0]], [[0,0,0],[0,0,0],[0,0,0]])
	test_case([
		[1,1],
		[1,0],
	], [
		[1,1],
		[1,1],
	])
	test_case([
			[0,1,0],
			[0,0,1],
			[1,1,1],
			[0,0,0],
		],
		[
			[0,0,0],
			[1,0,1],
			[0,1,1],
			[0,1,0],
		])


	/*
	it('should be fast', async() => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 })

		bench
			.add('v0', () => fullJustify_v0(words, 60))
			.add('current', () => fullJustify(words, 60))

		await bench.warmup() // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run()
		console.table(bench.table())
	})*/
})
