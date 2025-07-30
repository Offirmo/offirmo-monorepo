/* For readability.
 * Unfortunately, this doesn't add real type safety
 */

export type Basename = string

export type RelativePath = string // implied relative to some "working dir"
export type AbsolutePath = string
export type AnyPath =
	| RelativePath
	| AbsolutePath
