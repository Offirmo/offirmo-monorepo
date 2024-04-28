
import {
	Module‿Parcelv2, isꓽModule‿Parcelv2,
	Glob‿Parcelv2,
} from './parcel/v2'


export type Module = Module‿Parcelv2
export function isꓽModule(x: any): x is Module { return isꓽModule‿Parcelv2(x)}
export type Glob = Glob‿Parcelv2
export function isꓽGlob(x: any): x is Glob { return !isꓽModule(x)}
