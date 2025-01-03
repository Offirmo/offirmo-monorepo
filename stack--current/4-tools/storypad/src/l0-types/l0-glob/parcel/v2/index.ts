
/////////////////////////////////////////////////

type GlobLeaveⳇSync = { [exportKey: string]: any } // exports, incl. default
type GlobLeaveⳇAsync = () => Promise<GlobLeaveⳇSync>

type GlobLeave =
	| GlobLeaveⳇSync
	| GlobLeaveⳇAsync

/////////////////////////////////////////////////

export type Module‿Parcelv2 = {
	// Modules are indexed by their extension.
	// Usually only one should be present,
	// UNLESS we have both files! Ex. siblings index.ts AND index.tsx -> but in this case it's not really a module!
	js?: GlobLeave
	jsx?: GlobLeave
	ts?: GlobLeave
	tsx?: GlobLeave
}

// this thing happen if siblings ex. index.ts AND index.tsx
export function isꓽMultiModule‿Parcelv2(x: any): x is Module‿Parcelv2 {
	const keys = Object.keys(x)

	if (!keys.every(key => ['js', 'jsx', 'ts', 'tsx'].includes(key)))
		return false

	return keys.length > 1
}

export function isꓽModule‿Parcelv2(x: any): x is Module‿Parcelv2 {
	const keys = Object.keys(x)

	if (keys.length !== 1) return false

	if (!keys.every(key => ['js', 'jsx', 'ts', 'tsx'].includes(key)))
		return false

	return true
}

export interface Glob‿Parcelv2 {
	[k: string]: Glob‿Parcelv2 | Module‿Parcelv2
}
