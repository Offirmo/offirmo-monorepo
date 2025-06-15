
/////////////////////////////////////////////////
// for readability. Unfortunately this doesn't cause a real additional safety

type Basename = string
type Extension = string // '.' included, ex. '.ts'

type RelativePath = string // implied relative to some "working dir"
type AbsolutePath = string
type AnyPath = RelativePath | AbsolutePath

type Semver = string
type SPDXLicense = string

/////////////////////////////////////////////////

type ProgLang =
	| 'css'
	| 'html'
	| 'js'
	| 'json'
	| 'jsx' // also covers tsx
	| 'md'
	| 'ts'

/////////////////////////////////////////////////

type DependencyFQName = string // ex. @offirmo/cli

type DependencyType =
	| 'normal'
	| 'dev'
	| 'peer'
	| 'optional'
	| 'vendored' // special, TODO

interface Dependency {
	label: DependencyFQName
	type: DependencyType
}

interface DependencyDetails {
	type?: DependencyType
	v?: Semver
}

/////////////////////////////////////////////////

export {
	type Basename,
	type Extension,

	type RelativePath,
	type AbsolutePath,
	type AnyPath,

	type Semver,
	type SPDXLicense,

	type ProgLang,

	type DependencyFQName,
	type DependencyType,
	type Dependency,
	type DependencyDetails,
}
