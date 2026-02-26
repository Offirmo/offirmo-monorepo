// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

import { DIR_FILES_TO_SERVE } from '../consts.ts'
import type { WebPropertyEntryPointSpec, EntryPoints } from '../types.ts'


import generateꓽhost_specific from './generate--host-specific/index.ts'
import generateꓽhumansᐧtxt from './generate--humans-txt/index.ts'
import generateꓽrobotsᐧtxt from './generate--robots-txt/index.ts'

/////////////////////////////////////////////////

// Well-known https://en.wikipedia.org/wiki/Well-known_URI
function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		[`${DIR_FILES_TO_SERVE}/humans.txt`]: generateꓽhumansᐧtxt(spec),
		[`${DIR_FILES_TO_SERVE}/robots.txt`]: generateꓽrobotsᐧtxt(spec),
		[`${DIR_FILES_TO_SERVE}/ads.txt`]: `placeholder, placeholder, DIRECT, placeholder`, // https://en.wikipedia.org/wiki/Ads.txt
		[`${DIR_FILES_TO_SERVE}/trust.txt`]: `datatrainingallowed=no`, // https://journallist.net/reference-document-for-trust-txt-specifications
		[`${DIR_FILES_TO_SERVE}/webhook-authorized-senders.json`]: JSON.stringify({
			// https://intempus.dk/webhook-authorization
			"authorized-senders": [
			]
		}),
		//[`${DIR_FILES_TO_SERVE}/funding.json`]: TODO https://fundingjson.org/

		...generateꓽhost_specific(spec),
	}
}

/////////////////////////////////////////////////

export default generate
