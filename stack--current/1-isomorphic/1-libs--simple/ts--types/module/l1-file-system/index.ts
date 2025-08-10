/* For readability.
 * Unfortunately, this doesn't add real type safety
 */

/////////////////////////////////////////////////

export type PathSeparator =
	| '/'
	| '\\'

export type EndOfLine =
	| '\n'

/////////////////////////////////////////////////

// no sep
export type PathSegment = string
export type Basename = PathSegment

/////////////////////////////////////////////////

export type RelativePath = string // implied relative to some "working dir"
export type AbsolutePath = string
export type AnyPath =
	| RelativePath
	| AbsolutePath

/////////////////////////////////////////////////

export type RelativeDirPath = `${RelativePath}${PathSeparator}`
export type AbsoluteDirPath = `${AbsolutePath}${PathSeparator}`

/////////////////////////////////////////////////

export type RelativeFilePath = RelativePath
export type AbsoluteFilePath = AbsolutePath

/////////////////////////////////////////////////
