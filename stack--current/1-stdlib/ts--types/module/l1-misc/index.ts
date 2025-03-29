// unsure where to sort those types for now

/////////////////////////////////////////////////

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types
// TODO add Symbol?
// TODO usage?
export type JSPrimitiveType = boolean | null | undefined | number | string

/////////////////////////////////////////////////

// TODO usage?
export interface NumberMap {
	[k: string]: number
}

/////////////////////////////////////////////////

// https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
// TODO usage?
export type HashOf<T> = Record<string, T>
