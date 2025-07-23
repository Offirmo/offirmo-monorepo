import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { WithoutTimestamps } from '../types.ts'
import type { PKeyValue } from './types.ts'
import { TABLE__KEY_VALUES } from './consts.ts'
import type { PUser } from '../users/index.ts'
import { logger } from '../utils/index.ts'
import get_db from '../db.ts'

////////////////////////////////////

export async function create_kv_entry<T>(
	{ user_id, key, value }: {
		user_id: PUser['id'],
		key: string,
		value: Immutable<T>,
	},
	trx: ReturnType<typeof get_db> = get_db()
): Promise<void> {
	// TODO validate JSON
	const data: Immutable<WithoutTimestamps<PKeyValue<T>>> = {
		user_id,
		key,
		value,
		bkp__recent: null,
		bkp__old: null,
		bkp__older: null,
	}
	logger.log('⭆ creating a KV entry...', { data })

	await trx(TABLE__KEY_VALUES)
		.insert(data)

	logger.log('⭅ created a KV entry ✔')
}
