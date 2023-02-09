
export type ComparisonOperator =
	| '==='
	| '!=='
	| '>'
	| '>='
	| '<'
	| '<='

export function compare<T>(a: T, operator: ComparisonOperator, b: T, to_index: (val: T) => number): boolean {
	const index_a: number = to_index(a)
	const index_b: number = to_index(b)

	switch (operator) {
		case '===':
			return index_a === index_b
		case '!==':
			return index_a !== index_b
		case '>':
			return index_a > index_b
		case '>=':
			return index_a >= index_b
		case '<':
			return index_a < index_b
		case '<=':
			return index_a <= index_b
		default:
			throw new Error(`ts-utils.compare: unknown comparison operator "${operator}"!`)
	}
}
