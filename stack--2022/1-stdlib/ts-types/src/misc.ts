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

// Arithmetic
export type Integer = number
export type PositiveInteger = number
export type PositiveIntegerInRange<min = number, max = number> = number
export type Percentage = number
export type Real = number
export type RealInRange<min = number, max = number> = number

// https://en.wikipedia.org/wiki/IETF_language_tag
// https://en.wikipedia.org/wiki/ISO_639-1
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
// https://www.w3.org/International/articles/language-tags/
export type IETFLanguageType = string

export type Charset = string

export type TimeZone = string // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

export type Basename = string
export type RelativePath = string // implied relative to some "working dir"
export type AbsolutePath = string

export type CssColor = string
export type UrlString = string
