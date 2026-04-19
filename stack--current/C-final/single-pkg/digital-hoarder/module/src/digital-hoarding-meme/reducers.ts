import { assert, assert_from } from '@monorepo-private/assert'
import type { Immutable, LineNumber } from '@monorepo-private/ts--types'

import type { DigitalHoardingMeme, LineRecord } from './types.ts'
import { coerce_blanks_to_single_spaces, normalize_unicode } from '@monorepo-private/normalize-string'

/////////////////////////////////////////////////

function createꓽLineRecord(raw_line: string, lineno: LineNumber): LineRecord {
	return {
		_lineno: lineno,
		_raw: raw_line,
		_source: coerce_blanks_to_single_spaces(normalize_unicode(raw_line))
			.trim()
			.replaceAll('<-', '←')
			.replaceAll('->', '→')
			.replaceAll('<=', '⇐')
			.replaceAll('=>', '⇒'),
	}
}

function createꓽLineRecords(mm_txt: string): LineRecord[] {
	return mm_txt
		.split('\n')
		.map(createꓽLineRecord)
		.filter(lr => !!lr._source)
}

/////////////////////////////////////////////////

export {
	createꓽLineRecord,
	createꓽLineRecords,
}
