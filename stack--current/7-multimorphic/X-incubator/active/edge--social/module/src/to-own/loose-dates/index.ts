/* PROMPT
 * ’
 */

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { isꓽexact_stringified_number } from '@offirmo-private/type-detection'

/////////////////////////////////////////////////

interface LooseDate {
	YYYY?: number
	MM?: number
	DD?: number
}

function createⵧfrom_str(raw: string): LooseDate {
	assert(raw.length, `LD empty string!`)

	const [RYYYY, RMM, RDD] = raw.split('/')

	const YYYY: LooseDate['YYYY'] = (() => {
		if (!RYYYY)
			return undefined

		assert(isꓽexact_stringified_number(RYYYY), `YYYY format issue! "${RYYYY}"`)
		return parseInt(RYYYY, 10)
	})()

	const MM: LooseDate['MM'] = (() => {
		if (!RMM)
			return undefined

		//assert(isꓽexact_stringified_number(RMM), `MM format issue! "${RMM}"`)
		return parseInt(RMM, 10)
	})()

	const DD: LooseDate['DD'] = (() => {
		if (!RDD)
			return undefined

		//assert(isꓽexact_stringified_number(RDD), `RD format issue! "${RDD}"`)
		return parseInt(RDD, 10)
	})()

	assert(YYYY || MM, `LD format issue! "${raw}"`) // can't have just DD
	assert(!YYYY || MM, `LD format issue! "${raw}"`) // can't have YYYY//DD

	return {
		...(YYYY && { YYYY }),
		...(MM && { MM }),
		...(DD && { DD }),
	}
}

function isꓽpart(c: string): boolean {
	return '0123456789/'.includes(c)
}

/////////////////////////////////////////////////

export {
	type LooseDate,

	createⵧfrom_str,
	isꓽpart,
}
