/////////////////////////////////////////////////

type ComparisonOperator =
	| '==='
	| '!=='
	| '>'
	| '>='
	| '<'
	| '<='

function compare<T>(a: T, operator: ComparisonOperator, b: T, to_index: (val: T) => number): boolean {
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

/////////////////////////////////////////////////

// for use in array.sort()
function getꓽcompareFn<T>(to_index: (val: T) => number): (a: T, b: T) => number {
	return function compare(a: T, b: T): number {
		const index_a: number = to_index(a)
		const index_b: number = to_index(b)

		return index_a - index_b
	}
}

function getꓽcompareFnⵧcompose<T>(to_indexⵧordered: Array<(val: T) => number>): (a: T, b: T) => number {
	return function compare(a: T, b: T): number {
		return to_indexⵧordered.reduce((acc, to_index) => {
			if (acc !== 0) return acc

			const index_a: number = to_index(a)
			const index_b: number = to_index(b)

			return index_a - index_b
		}, 0)
	}
}

/////////////////////////////////////////////////

export {
	type ComparisonOperator,
	compare,

	getꓽcompareFn,
	getꓽcompareFnⵧcompose,
}
