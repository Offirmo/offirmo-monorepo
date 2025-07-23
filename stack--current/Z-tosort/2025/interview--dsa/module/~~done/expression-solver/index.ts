import { describe, it, mock, before, beforeEach } from 'node:test' // https://devdocs.io/node~20_lts/test
import { strict as assert } from 'node:assert' // https://devdocs.io/node~20_lts/assert
import * as util from 'node:util'

import { Bench } from 'tinybench'

/////////////////////////////////////////////////

const OPERATORS = [ '*', '/', '+', '-'] as const
type Operator = typeof OPERATORS[number]
type Operand = Expression | number

interface Expression {
	operator: Operator
	opL: Operand
	opR: Operand
}

/////////////////////////////////////////////////

function create_operand(s: string): Operand {
	s = (s ?? '').normalize('NFC').toLowerCase().trim()
	let operator: Expression['operator'] | undefined = OPERATORS.findLast(op => s.includes(op))
	if (!operator) {
		if (!s) return NaN
		const n: number = Number(s)
		assert(String(n) === s, `"${s}" should be a number!`)
		return n
	}

	const [ opL_raw, ...rest ] = s.split(operator)
	const opR_raw = rest.join(operator)
	return {
		operator,
		opL: create_operand(opL_raw!),
		opR: create_operand(opR_raw!),
	}
}

function _evaluate(e: Operand): number {
	if (typeof e === 'number')
		return e

	const opL_num = _evaluate(e.opL)
	const opR_num = _evaluate(e.opR)
	switch (e.operator) {
		case '*': return opL_num * opR_num;
		case '/': return opL_num / opR_num;
		case '+': return opL_num + opR_num;
		case '-': return opL_num - opR_num;
		default:
			throw new Error(`Unknown op "${e.operator}"!`)
	}
}

function evaluate(s: string): number {
	const expr = create_operand(s)
	return _evaluate(expr)
}

/////////////////////////////////////////////////

describe('exercise', () => {

	const FUT = evaluate
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

	test_case('', NaN)
	test_case('1', 1)
	test_case('1+1', 2)
	test_case(' 1 +  1  ', 2)
	test_case('2 + 2 * 2', 6)
	test_case('2 * 2 + 2', 6)
	test_case('2 * 2 * 2', 8)
	test_case('2 + 2 * 2 - 2 / 2', 5)
	//test_case('(2 + 2) * 2', 8)


	/*it.skip('should be fast', async() => {
		// https://github.com/tinylibs/tinybench
		console.log('Benchmarking…')
		const bench = new Bench({ time: 200 });
		bench
			.add('v0', () => get_victor_v0([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))
			.add('current', () => get_victor([ ['x', 0, 0], ['x', 0, 1], ['x', -1, -1], ['x', -2, -2]]))

		await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
		await bench.run();
		console.table(bench.table());
	})*/
})
