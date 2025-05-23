import assert from 'tiny-invariant'

import get_db from '../db.ts'
import { type PUser } from '../users/index.ts'
import { logger } from '../utils/index.ts'
import type { PKeyValue } from './types.ts'
import { TABLE__KEY_VALUES } from './consts.ts'

////////////////////////////////////

export async function get<T>(
	{
		user_id,
		key
	}: {
		user_id: PUser['id'],
		key: string,
	},
	trx: ReturnType<typeof get_db> = get_db()
): Promise<PKeyValue<T> | null> {
	logger.log('⭆ reading a KV entry…', { user_id, key })

	const rows = await trx(TABLE__KEY_VALUES)
		.select()
		.where({ user_id, key })
	assert(rows.length <= 1, 'single or no result expected when reading a kv entry')

	if (rows.length === 0) {
		logger.log('⭅ read a KV entry: EMPTY ✔')
		return null
	}

	//console.log(rows)
	const data = rows[0]
	logger.log('⭅ read a KV entry ✔', data)

	return data
}


export async function get_value<T>(
	{ user_id, key }: {
		user_id: PUser['id'],
		key: string,
	},
	trx: ReturnType<typeof get_db> = get_db()
): Promise<T | null> {
	logger.log('⭆ reading a KV entry value…', { user_id, key })

	const data = await get<T>({ user_id, key }, trx)
	if (!data) {
		logger.log('⭅ read a KV entry value: EMPTY ✔')
		return null
	}

	const { value } = data
	logger.log('⭅ read a KV entry value ✔', { value })

	return value as any
}
