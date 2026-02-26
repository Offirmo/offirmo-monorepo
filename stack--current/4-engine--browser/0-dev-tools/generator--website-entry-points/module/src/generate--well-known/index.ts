// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

import { DIR_FILES_TO_SERVE } from '../consts.ts'
import type { WebPropertyEntryPointSpec, EntryPoints } from '../types.ts'

import generateꓽsecurityᐧtxt from './security-txt/index.ts'

/////////////////////////////////////////////////

// Well-known https://en.wikipedia.org/wiki/Well-known_URI
function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		[`${DIR_FILES_TO_SERVE}/.well-known/security.txt`]: generateꓽsecurityᐧtxt(spec),
	}
}

/////////////////////////////////////////////////

export default generate
