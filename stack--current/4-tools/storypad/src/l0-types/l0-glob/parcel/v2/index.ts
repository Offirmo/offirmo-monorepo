
type GlobLeaveⳇSync = { [exportKey: string]: any } // exports, incl. default
type GlobLeaveⳇAsync = () => Promise<GlobLeaveⳇSync>

type GlobLeave = GlobLeaveⳇSync | GlobLeaveⳇAsync

export type Module‿Parcelv2 = {
	js?: GlobLeave
	jsx?: GlobLeave
	ts?: GlobLeave
	tsx?: GlobLeave
}
export function isꓽModule‿Parcelv2(x: any): x is Module‿Parcelv2 {
	const keys = Object.keys(x)
	if (keys.length !== 1) return false
	const key = keys[0]!
	if (!['js', 'jsx', 'ts', 'tsx'].includes(key)) return false

	return true
	//const obj = x[key]
	//const is_sync = obj.__esModule === true
	//const is_async = typeof obj === 'function' && String(obj).includes('require')
}

export interface Glob‿Parcelv2 {
	[k: string]: Glob‿Parcelv2 | Module‿Parcelv2
}
