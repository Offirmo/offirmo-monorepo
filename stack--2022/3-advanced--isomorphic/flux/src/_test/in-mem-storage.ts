import { Storage, HashOf } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

class StorageInMem {
	#data: HashOf<any>

	constructor() {
		this.#data = {}
	}

	get length(): number {
		return Object.keys(this.#data).length
	}

	clear(): void {
		this.#data = {}
	}

	getItem(key: string): string | null {
		return this.#data[key] ?? null
	}

	removeItem(key: string): void {
		delete this.#data[key]
	}

	setItem(key: string, value: string): void {
		this.#data[key] = value
	}
}


function createꓽstorageⵧin_mem(): Storage {
	return new StorageInMem()
}

/////////////////////////////////////////////////

export {
	createꓽstorageⵧin_mem,
}
export default createꓽstorageⵧin_mem
