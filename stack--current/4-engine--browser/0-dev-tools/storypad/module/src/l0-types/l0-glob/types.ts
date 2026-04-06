
/////////////////////////////////////////////////

export type GlobLeaveⳇSync = { [exportKey: string]: any } // exports, incl. default
export type GlobLeaveⳇAsync = () => Promise<GlobLeaveⳇSync>

export type GlobLeave =
	| GlobLeaveⳇSync
	| GlobLeaveⳇAsync

/////////////////////////////////////////////////
