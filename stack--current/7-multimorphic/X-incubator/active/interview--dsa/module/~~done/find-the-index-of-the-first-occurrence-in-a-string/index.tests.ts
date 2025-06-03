import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/submissions/1652274620/

function strStr0(haystack: string, needle: string): number {

	for (let i = 0; i < haystack.length - needle.length + 1; ++i) {
		if (haystack[i] !== needle[0]) continue

		const found = Array.from(Array.from(needle).keys()).every(j => needle[j] === haystack[i+j])
		if (found) return i
	}

	return -1
}

function strStr(haystack: string, needle: string): number {
	const ni = Array.from(Array.from(needle).keys()).slice(1)

	let next_i = -1
	for (let i = 0; i < haystack.length - needle.length + 1; ++i) {
		if (haystack[i] !== needle[0]) continue

		const found = ni.every(j => {
			const h = haystack[i+j]
			if (h === needle[0] && next_i <= i)
				next_i = i + j
			return h === needle[j]
		})
		if (found) return i

		if (next_i > i)
			i = next_i - 1 // fast forward
	}

	return -1
}

/////////////////////////////////////////////////

describe('exercise', () => {
	const FUT = strStr
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

	test_case('', 'a', -1)
	test_case('a', 'a', 0)
	test_case('aa', 'a', 0)
	test_case('abc', 'a', 0)
	test_case('abc', 'b', 1)
	test_case('abc', 'c', 2)
	test_case('abc', 'abcd', -1)

	test_case('sadbutsad', 'sad', 0)
	test_case('leetcode', 'leeto', -1)

	it('should be fast', async () => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 10 })

		bench
			.add('v0', () => strStr0('sabbutsad', 'sad'))
			.add('current', () => FUT('sabbutsad', 'sad'))

		await bench.run()
		console.table(bench.table())
	})
})
