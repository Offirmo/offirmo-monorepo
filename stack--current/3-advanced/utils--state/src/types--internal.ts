import {
	BaseRootState,
	BaseTState,
	BaseUState,
	BaseState,
} from './types.js'


export interface AnyBaseState extends BaseState {
	[k: string]: any
}
export interface AnyBaseUState extends BaseUState {
	[k: string]: any
}
export interface AnyBaseTState extends BaseTState {
	[k: string]: any
}
export interface AnyRootState extends BaseRootState<AnyBaseUState, AnyBaseTState> {
}
