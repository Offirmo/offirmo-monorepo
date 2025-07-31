/* For readability.
 * Unfortunately, this doesn't add real type safety
 */

// no sep
export type PathSegment = string

export type Basename = PathSegment


export type RelativePath = string // implied relative to some "working dir"
export type AbsolutePath = string
export type AnyPath =
	| RelativePath
	| AbsolutePath

export type PathSeparator =
	| '/'
	| '\\'
	//| (string & {})

export type EndOfLine =
	| '\n'
