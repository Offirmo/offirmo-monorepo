
/////////////////////

// isomorphic local storage
// copied from TS libs
// TODO should be SyncStorage ?
export interface Storage {
	readonly length: number
	clear(): void
	getItem(key: string): string | null
	removeItem(key: string): void
	setItem(key: string, value: string): void
}

/////////////////////
