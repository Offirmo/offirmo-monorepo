import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////
// https://leetcode.com/problems/course-schedule/

/////////////////////////////////////////////////


/////////////////////////////////////////////////

class Course {
	deps: Set<number>
	_is_doable: undefined | 'in progress' | boolean

	constructor() {
		this.deps = new Set<number>()
	}

	is_doable(courses: Course[]): boolean {
		if (this._is_doable === 'in progress') {
			console.error(`loop detected!`)
			return false
		}
		if (typeof this._is_doable === 'boolean')
			return this._is_doable

		this._is_doable = 'in progress'
		this._is_doable = Array.from(this.deps.values()).every(dep_id => {
			if (!courses[dep_id]) return true
			return courses[dep_id]!.is_doable(courses)
		})
		return this._is_doable
	}
}

/////////////////////////////////////////////////

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
	const courses = new Array(numCourses)
	prerequisites.forEach(([course_id, dependency_id]) => {
		courses[course_id!] ??= new Course()
		courses[course_id!].deps.add(dependency_id!)
	})


	return courses.every((course, id) => {
		if (!course) return true // no declared deps
		return course.is_doable(courses)
	})
}

/////////////////////////////////////////////////

describe('exercise', () => {
	const FUT = canFinish
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

	test_case(1, [], true)

	test_case(2, [[1,0]], true)
	test_case(2, [[1,0],[0,1]], false)

	test_case(3, [], true)

	/*it('should be fast', async () => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 })

		bench
			.add('v0', () => fibonacci_V0(40))
			.add('current', () => FUT(40))

		await bench.warmup() // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run()
		console.table(bench.table())
	})*/
})
