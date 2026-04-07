import { assert, assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'
import * as RichText from '@monorepo-private/rich-text-format'

import '@monorepo-private/css--framework'

import type { Props } from '../types.ts'

/////////////////////////////////////////////////

function RichTextToDebug({$doc}: Props) {
	console.log(`🔄 <RichTextToDebug>`, $doc)

	return 'not implemented'
}

/////////////////////////////////////////////////

export {
	RichTextToDebug,
}
