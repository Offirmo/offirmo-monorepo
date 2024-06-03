
import {
	Module‿Parcelv2, isꓽModule‿Parcelv2,
	Glob‿Parcelv2,
} from './parcel/v2'


export type ImportModule = Module‿Parcelv2
export function isꓽImportModule(x: any): x is ImportModule { return isꓽModule‿Parcelv2(x)}
export type ImportGlob = Glob‿Parcelv2
export function isꓽImportGlob(x: any): x is ImportGlob { return !isꓽImportModule(x)}
