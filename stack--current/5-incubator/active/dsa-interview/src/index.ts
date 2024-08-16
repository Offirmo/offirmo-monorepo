import { describe, it, mock, before, beforeEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

/////////////////////////////////////////////////

const REQUIRED_COUNT_OF_ALIGNED = 3
type PlayerId = string
type Move = [ number, number, PlayerId ]
type Vector = [ number, number ] // TODO restrict

const BIGG = 10000

// TODO return the winning streak itself
function has_winning_streak(moves: Array<Move>): boolean {
	if (moves.length < REQUIRED_COUNT_OF_ALIGNED) return false

	const map: Array<Array<boolean | undefined> | undefined> = []
	for (const m of moves) {
		const x = m[0] + BIGG
		const y = m[1] + BIGG
		map[x] ??= []
		map[x]![y] = true
	}
	let result = false
	move: for (const m of moves) {
		const x = m[0] + BIGG
		const y = m[1] + BIGG
		let diag: Vector | undefined = undefined
		let horz: Vector | undefined = undefined
		let vert: Vector | undefined = undefined

		for (let dx = -1; dx <= 1; ++dx) {
			for (let dy = -1; dy <= 1; ++dy) {
				if (dx === 0 && dy === 0) continue
				if (!map[x + dx]?.[y + dy]) continue

				// neighbor found

				if (dy === 0) {
					// horizontal neighbor
					if (horz) continue move
					horz = [dx, dy]
				}
				if (dx === 0) {
					// vertical neighbor
					if (vert) continue move
					vert = [dx, dy]
				}

				// diagonal neighbor
				if (diag) continue move
				diag = [dx, dy]
			}

			const has_diag_streak : boolean | undefined = REQUIRED_COUNT_OF_ALIGNED <= 2 ? true : undefined
			const has_horz_streak : boolean | undefined = REQUIRED_COUNT_OF_ALIGNED <= 2 ? true : undefined
			const has_vert_streak : boolean | undefined = REQUIRED_COUNT_OF_ALIGNED <= 2 ? true : undefined
			for (let i = 2; i < REQUIRED_COUNT_OF_ALIGNED; ++i) {
				if (has_diag_streak === t)
			}


		}
	}

	return false
}

function get_victor(moves: Array<Move>): PlayerId | null {
	const moves_per_player = moves.reduce((acc, m) => {
		acc[m[2]] ??= []
		acc[m[2]]?.push(m)
		return acc
	}, {} as { [id: PlayerId]: Move[] })

	// TODO .find
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
		const expected = args.pop()

		it(`should work -- ${util.inspect(args)} => ${util.inspect(expected)}`, () => {
			assert.deepEqual(
				// @ts-ignore
				FUT(...args),
				expected,
			)
		})
	}

	test_case([], null)
	test_case([ [0, 0, 'x'], [0, 1, 'x'], [0, 2, 'x']], 'x')
	test_case([ [0, 0, 'x'], [1, 0, 'x'], [2, 0, 'x']], 'x')
	test_case([ [0, 0, 'x'], [1, 0, 'x'], [0, 1, 'x']], null)
	test_case([ [0, 0, 'x'], [1, 0, 'x'], [2, 0, 'o']], null)
	test_case([ [0, 0, 'x'], [1, 1, 'x'], [2, 2, 'x']], 'x')
	test_case([ [0, 0, 'x'], [1, 1, 'x'], [-1, -1, 'x']], 'x')
	test_case([ [0, 0, 'x'], [0, 1, 'x'], [-1, -1, 'x'], [-2, -2, 'x']], 'x')
})
