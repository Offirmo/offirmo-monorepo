// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import { WebPropertyEntryPointSpec, EntryPoints } from '../types.js'

import generateꓽsecurityᐧtxt from './security-txt/index.js'

/////////////////////////////////////////////////

// Well-known https://en.wikipedia.org/wiki/Well-known_URI
function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		'.well-known/security.txt': generateꓽsecurityᐧtxt(spec),
	}
}

/////////////////////////////////////////////////

export default generate
