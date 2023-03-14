/////////////////////

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types
// TODO Symbol?
export type JSPrimitiveType = boolean | null | undefined | number | string

/////////////////////

export interface NumberMap {
	[k: string]: number
}

/////////////////////

export interface I18nMessages {
	[k: string]: string | I18nMessages
}

/////////////////////

// https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
export type HashOf<T> = Record<string, T>

/////////////////////
// for readability. Unfortunately this doesn't cause a real additional safety

export type Integer = number
export type Percentage = number

export type TimeZone = string // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

export type Basename = string
export type RelativePath = string // implied relative to "root"
export type AbsolutePath = string
