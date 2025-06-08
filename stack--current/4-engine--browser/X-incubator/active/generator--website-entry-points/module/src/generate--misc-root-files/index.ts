// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { WebPropertyEntryPointSpec, EntryPoints } from '../types.ts'


import generateꓽhost_specific from './generate--host-specific/index.ts'
import generateꓽhumansᐧtxt from './generate--humans-txt/index.ts'
import generateꓽrobotsᐧtxt from './generate--robots-txt/index.ts'

/////////////////////////////////////////////////

// Well-known https://en.wikipedia.org/wiki/Well-known_URI
function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		'humans.txt': generateꓽhumansᐧtxt(spec),
		'robots.txt': generateꓽrobotsᐧtxt(spec),
		// TODO? https://en.wikipedia.org/wiki/Ads.txt

		...generateꓽhost_specific(spec),
	}
}

/////////////////////////////////////////////////

export default generate
