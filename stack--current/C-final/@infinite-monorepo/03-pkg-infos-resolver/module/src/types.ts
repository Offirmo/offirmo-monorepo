/////////////////////////////////////////////////

// subset of interest to us
interface PackageJson {
	name: string // full, including scope/namespace
	version?: string
	types?: string // https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package
	private?: true
}

/////////////////////////////////////////////////

export {
	type PackageJson,
}
