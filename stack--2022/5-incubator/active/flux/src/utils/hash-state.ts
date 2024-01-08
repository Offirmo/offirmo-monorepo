import { hashꓽobjectⵧmurmur128 } from '@offirmo-private/murmurhash'
import { Immutable } from '@offirmo-private/ts-types'

export function hashꓽstate(state: Immutable<Object>): string {
	return hashꓽobjectⵧmurmur128(state)
}
