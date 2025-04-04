import type { Immutable } from '@offirmo-private/ts-types'
import MurmurHash from '@offirmo-private/murmurhash'

export function hashꓽstate(state: Immutable<Object>): string {
	return 'mm:' + MurmurHash.v3.x64ⵧ128.hashꓽobject(state)
}
