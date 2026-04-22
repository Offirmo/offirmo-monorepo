import { assert, assert_from } from '@monorepo-private/assert'
import type { Immutable, LineNumber } from '@monorepo-private/ts--types'
import { normalizeꓽurlⵧhttpₓ } from '@monorepo-private/normalize-string'

import { isꓽUrl‿str } from '../utils/index.ts'
import  { type LineRecord, SEGMENT__WHO_IS_WHO } from './types.ts'
import { coerce_blanks_to_single_spaces, normalize_unicode } from '@monorepo-private/normalize-string'

/////////////////////////////////////////////////

function createꓽLineRecord(raw_line: string, lineno: LineNumber): LineRecord {
	return {
		_lineno: lineno,
		_raw: raw_line,
		_source: coerce_blanks_to_single_spaces(normalize_unicode(raw_line))
			.trim()
			.replaceAll('<->', '⮂')
			.replaceAll('<-', '←')
			.replaceAll('->', '→')
			.replaceAll('<=', '⇐')
			.replaceAll('=>', '⇒')
			.split(' ')
			.map(s => {
				if (isꓽUrl‿str(s)) {
					// TODO 1D also clean
					return normalizeꓽurlⵧhttpₓ(s)
				}

				if (s.toLowerCase() === SEGMENT__WHO_IS_WHO) {
					return SEGMENT__WHO_IS_WHO
				}

				return s
			})
			.join(' ')
	}
}

function createꓽLineRecords(mm_txt: string): LineRecord[] {
	return mm_txt
		.split('\n')
		.map((raw_line, index) => createꓽLineRecord(raw_line, index + 1))
		.filter(lr => !!lr._source)
}

/////////////////////////////////////////////////

export {
	createꓽLineRecord,
	createꓽLineRecords,
}
