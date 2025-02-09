import { strict as node_assert } from 'node:assert'

import { normalizeError } from '@offirmo/error-utils'
import type { Immutable } from '@offirmo-private/ts-types'
import { getꓽjson_difference } from '@offirmo-private/state-utils'

import '../../__test_shared/mocha_spec.js'
import { type State } from './types.js'


export function expectㆍfileㆍstatesㆍdeepㆍequal(s1: Immutable<State>, s2: Immutable<State>, should_log = true): void {
	const s1_alt = {
		...s1,
		//memoized: null
	}
	const s2_alt = {
		...s2,
		//memoized: null
	}

	try {
		node_assert.deepStrictEqual(s1_alt, s2_alt)
	}
	catch (err) {
		if (should_log)
			console.error('expectㆍfileㆍstatesㆍdeepㆍequal() FALSE', getꓽjson_difference(s1_alt, s2_alt))
		throw err
	}
}

export function expectㆍfileㆍstatesㆍNOTㆍdeepㆍequal(s1: Immutable<State>, s2: Immutable<State>): void {
	try {
		expectㆍfileㆍstatesㆍdeepㆍequal(s1, s2, false)
	}
	catch (_err) {
		const err = normalizeError(_err)
		if (err.message.includes('Expected values to be strictly deep-equal'))
			return

		throw err
	}
}
