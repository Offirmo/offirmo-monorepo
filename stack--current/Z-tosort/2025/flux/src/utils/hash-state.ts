import type { Immutable } from '@monorepo-private/ts--types'
import MurmurHash from '@monorepo-private/murmurhash'

export function hashꓽstate(state: Immutable<Object>): string {
	return 'mm:' + MurmurHash.v3.x64ⵧ128.hashꓽobject(state)
}
