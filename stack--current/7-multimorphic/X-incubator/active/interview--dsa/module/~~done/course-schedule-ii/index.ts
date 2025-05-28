import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////
// https://leetcode.com/problems/course-schedule-ii/


/////////////////////////////////////////////////


/////////////////////////////////////////////////

type CourseId = number

interface Course {
	deps: Set<CourseId>
}

function create_course(): Course {
	return {
		deps: new Set<CourseId>()
	}
}

function add_dep(course: Course, dep_id: CourseId): Course {
	course.deps.add(dep_id)
	return course
}

/////////////////////////////////////////////////

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
	const courses = [] as Course[]

	prerequisites.forEach(([course_id, dep_id]) => {
		// TODO params validation
		courses[course_id!] ??= create_course()
		courses[course_id!] = add_dep(courses[course_id!]!, dep_id!)
	})

	const courses_taken_ordered = new Set<number>()
	const courses_pending = new Set<number>()

	let has_loop = false
	function take_course_recursive_ordered(id: number): void {
		if (has_loop) return

		if (courses_taken_ordered.has(id))
			return // already taken
		if (courses_pending.has(id)) {
			// loop!
			has_loop = true
			return
		}

		const course = courses[id]
		if (!course) {
			// this course has no deps
			// we can take it asap
			courses_taken_ordered.add(id)
			return
		}

		// need to do the deps first
		courses_pending.add(id)
		for (let dep_id of course.deps) {
			take_course_recursive_ordered(dep_id)
			if (has_loop) break
		}
		if (!has_loop) {
			courses_pending.delete(id)
			courses_taken_ordered.add(id)
		}
	}

	for (let i = 0; i < numCourses; ++i) {
		take_course_recursive_ordered(i)
		if (has_loop) {
			courses_taken_ordered.clear()
			break
		}
	}

	return Array.from(courses_taken_ordered.values())
}

/////////////////////////////////////////////////

describe('exercise', () => {
	const FUT = findOrder
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

	test_case(1, [], [0])
	test_case(3, [], [0, 1, 2])

	test_case(2, [[1, 0]], [0, 1])
	test_case(2, [[0, 1]], [1, 0])

	test_case(2, [[1,0],[0,1]], [])
	test_case(4, [[1,0],[2,0],[3,1],[3,2]], [0, 1, 2, 3])

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
