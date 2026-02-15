// for use in array.sort()

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

function getꓽcompareFn<T>(to_index: (val: T) => number): (a: T, b: T) => number {
	return function compare(a: T, b: T): number {
		const index_a: number = to_index(a)
		if(typeof index_a !== 'number' || isNaN(index_a)) throw new Error('getꓽcompareFn(): to_index() should return a number')
		const index_b: number = to_index(b)
		if(typeof index_b !== 'number' || isNaN(index_b)) throw new Error('getꓽcompareFn(): to_index() should return a number')

		return index_a - index_b
	}
}

// ???
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

// ex sort { flow: 'main' } { flow: 'side' } against [ 'main', 'side' ]
function getꓽcompareFnⵧby_string_key<T>(key: string | ((val: T) => string), ordered_values: string[]): (a: T, b: T) => number {

	function get_index_key(val: T): string {
		if (typeof key === 'string') {
			const index: string = (val as any)[key]
			if(typeof index !== 'string') throw new Error('getꓽcompareFnⵧby_string_key(): index key should always reference a string!')
			return index
		}

		const index = key(val)
		if(typeof index !== 'string') throw new Error('getꓽcompareFnⵧby_string_key(): index key() should always return a string!')
		return index
	}

	function to_index(val: T): number {
		const key = get_index_key(val)
		const index = ordered_values.indexOf(key)
		if(index === -1) throw new Error('getꓽcompareFnⵧby_string_key(): value was not found in the ordered values list!')
		return index
	}

	return getꓽcompareFn<T>(to_index)
}

/////////////////////////////////////////////////

export {
	type ComparisonOperator,
	compare,

	getꓽcompareFn,
	getꓽcompareFnⵧcompose,
	getꓽcompareFnⵧby_string_key,
}
