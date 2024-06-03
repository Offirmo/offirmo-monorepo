/////////////////////
// for readability. Unfortunately this doesn't cause a real additional safety

export type Basename = string
export type RelativePath = string // implied relative to some "working dir"
export type AbsolutePath = string
export type AnyPath = RelativePath | AbsolutePath
