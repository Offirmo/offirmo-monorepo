import { describe, it, mock, before, after, beforeEach, afterEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////

const OPERATIONS_ORDERED = [ '^', '*', '-' ] as const
type Operator = typeof OPERATIONS_ORDERED[number]

type Operand = Node | number | string | null
type VarMap = Map<string, number>

/////////////////////////////////////////////////

interface Node {
	op: Operator
	left: Operand
	right: Operand
}

function create_node(op: Node['op'], left: Node['left'], right: Node['right']): Node {
	return {
		op,
		left,
		right
	}
}

function create_tree_representation(expression: string, var_map: VarMap): Node | number | string {
	expression = expression.normalize('NFC').trim()

	const semicolon_splited = expression.split(';')
	if (semicolon_splited.length > 1) {
		expression = semicolon_splited.pop()!
		semicolon_splited.forEach(decl_str => {
			let [ varname, value ] = decl_str.split('=')
			varname = varname!.trim()

			const expr = create_tree_representation(value!, var_map)
			const val = evaluate_tree(expr, var_map)

			var_map.set(varname, val)
		})
	}

	// @ts-ignore
	for (let op of OPERATIONS_ORDERED.toReversed()) {
		const elements = expression.split(op)
		if (elements.length > 1) {
			const right = elements.pop()
			const left = elements.join(op)

			return create_node(
				op,
				create_tree_representation(left!, var_map),
				create_tree_representation(right!, var_map),
			)
		}
	}

	const candidate_as_number = Number(expression)
	if (String(candidate_as_number) === expression) {
		return candidate_as_number
	}

	return expression
}

const DEBUG = true

function evaluate_tree(node: Operand, var_map: VarMap): number {
	if (typeof node === 'number')
		return node

	if (typeof node === 'string') {
		const varname = node
		const value = var_map.get(varname)
		return evaluate_tree(value!, var_map)
	}

	if (node === null) {
		throw new Error(`NIMP!`)
	}

	const left = evaluate_tree(node.left, var_map)
	const right = evaluate_tree(node.right, var_map)
	console.log(`now resolving ${left} ${node.op} ${right}`)

	switch (node.op) {
		case '^': {
			const result = left ** right
			console.log(`-> ${result}`)
			return result
		}

		case '-': {
			const result = left - right
			console.log(`-> ${result}`)
			return result
		}
		case '*': {
			const result = left * right
			console.log(`-> ${result}`)
			return result
		}
		default:
			throw new Error(`NIMP!`)
	}
}


/////////////////////////////////////////////////

function evaluate(expression: string): number {
	const var_map: VarMap = new Map()

	const tree = create_tree_representation(expression, var_map)

	return evaluate_tree(tree, var_map)
}

/////////////////////////////////////////////////

describe('exercise', () => {
	const FUT = evaluate
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
	test_case('2 ^ 2', 4)
	test_case('2 * 2', 4)
	test_case('7 - 3 * 2', 1)
	test_case('5 * 4 - 3 - 5 ^ 3', -108)
	test_case('a = 1; b = a - 1; b = b - 100; b * a - 100', -200)

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
