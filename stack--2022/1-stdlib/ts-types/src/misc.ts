/////////////////////
// unsure where to sort those types for now

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types
// TODO add Symbol?
export type JSPrimitiveType = boolean | null | undefined | number | string

/////////////////////

export interface NumberMap {
	[k: string]: number
}

/////////////////////

// https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
export type HashOf<T> = Record<string, T>

/////////////////////

export type Emoji = string
