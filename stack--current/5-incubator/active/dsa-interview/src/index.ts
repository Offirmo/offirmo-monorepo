import { describe, it, mock, before, beforeEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

/////////////////////////////////////////////////
// questions:
// - 2 players?
// - required count to win? can be 2? (unlikely)
// - possible to multiple wins?
// - assuming only last move can win? (no previous win)
// - API: return the winning streak?
// - API: return opponent block / one's win?

type PlayerId = string
type Coords = [ x: number, y: number ]
type Move = [ PlayerId, ...Coords ]
type Vector = [ dx: number, dy: number ] // TODO restrict

/////////////////////////////////////////////////

const REQUIRED_COUNT_OF_ALIGNED = 3
let SHIFT_X = 0
let SHIFT_Y = 0

/////////////////////////////////////////////////

// complexity = O(N)
function has_winning_streak(moves: Array<Move>): boolean {
	if (moves.length < REQUIRED_COUNT_OF_ALIGNED) return false

	const map: Array<Array<boolean | undefined> | undefined> = []
	for (const m of moves) {
		const x = m[1] + SHIFT_X
		const y = m[2] + SHIFT_Y
		map[x] ??= []
		map[x]![y] = true
	}

	for (const m of moves) {
		const x = m[1] + SHIFT_X
		const y = m[2] + SHIFT_Y
		let diag: Vector | undefined | null = undefined
		let horz: Vector | undefined | null = undefined
		let vert: Vector | undefined | null = undefined

		// find neighbors in winnable directions: horz, vert & diag
		for (let dx = -1; dx <= 1; ++dx) {
			for (let dy = -1; dy <= 1; ++dy) {
				if (dx === 0 && dy === 0) continue // self
				if (!map[x + dx]?.[y + dy]) continue // no neighbor in this direction

				if (dy === 0) {
					// horizontal neighbor
					if (horz === undefined) {
						horz = [ dx, dy ]
					} else
						horz = null
				}
				else if (dx === 0) {
					// vertical neighbor
					if (vert === undefined)
						vert = [ dx, dy ]
					else
						vert = null
				}
				else {
					// diagonal neighbor
					if (diag === undefined)
						diag = [ dx, dy ]
					else
						diag = null
				}
			}
		}

		const has_streak = [ horz, vert, diag].filter(x => !!x).some(vector => {
			const [ dx, dy ] = vector
			const has_streak = (new Array(REQUIRED_COUNT_OF_ALIGNED - 2))
				.fill(undefined)
				.every((_, i) => {
					i += 2
					return map[x + dx * i]?.[y + dy * i]
				})
			return has_streak
		})
		if (has_streak) return true
	}

	return false
}

function get_victor(moves: Array<Move>): PlayerId | null {
	let xmin = Number.POSITIVE_INFINITY
	let ymin = Number.POSITIVE_INFINITY
	let xmax = Number.NEGATIVE_INFINITY
	let ymax = Number.NEGATIVE_INFINITY
	const moves_per_player = moves.reduce((acc, m) => {
		const [ id, x, y ] = m
		xmin = Math.min(x, xmin)
		ymin = Math.min(y, ymin)
		xmax = Math.max(x, xmax)
		ymax = Math.max(y, ymax)
		acc[id] ??= []
		acc[id].push(m)
		return acc
	}, {} as { [id: PlayerId]: Move[] })
	SHIFT_X = -xmin + 1
	SHIFT_Y = -ymin + 1

	for (const id in moves_per_player) {
		if (has_winning_streak(moves_per_player[id]!))
			return id
	}

	return null
}

/////////////////////////////////////////////////

describe('exercise', () => {
	const FUT = get_victor
	function test_case(...args: [ ...Parameters<typeof FUT>, ReturnType<typeof FUT> ]): void {
		const resultⵧexpected = args.pop()
		const params: Parameters<typeof FUT> = args as any

		it(`should work -- ${util.inspect(params)} => ${util.inspect(resultⵧexpected)}`, () => {
			const resultⵧactual = FUT(...params)
			assert.deepEqual(
				resultⵧactual,
				resultⵧexpected,
			)
		})
	}

	test_case([], null)
	test_case([ ['x', 0, 0], ['x', 0, 1], ['x', 0, 2]], 'x')
	test_case([ ['x', 0, 0], ['x', 1, 0], ['x', 2, 0]], 'x')
	test_case([ ['x', 0, 0], ['x', 1, 1], ['x', 2, 2]], 'x')
	test_case([ ['x', 0, 0], ['x', 1, 0], ['o', 2, 0]], null) // diff players
	test_case([ ['x', 0, 0], ['x', 1, 0], ['x', 0, 1]], null)
	test_case([ ['x', 0, 0], ['x', 1, 1], ['x', -1, -1]], 'x')
	test_case([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]], 'x')
})
