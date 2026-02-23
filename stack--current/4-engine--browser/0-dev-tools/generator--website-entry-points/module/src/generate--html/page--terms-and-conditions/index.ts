// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'
import type { Html‿str } from '@monorepo-private/ts--types--web';
import { normalize_unicode } from '@monorepo-private/normalize-string'
import { getꓽhtml‿str } from '@monorepo-private/generator--html'

import type { WebPropertyEntryPointSpec } from '../../types.ts'
import {	getꓽhtml_doc_spec } from './selectors.ts'
/////////////////////////////////////////////////

function generate(spec: Immutable<WebPropertyEntryPointSpec>): Html‿str {
	const doc_spec = getꓽhtml_doc_spec(spec)
	const result = getꓽhtml‿str(doc_spec);

	// TODO check IW10 <14k https://developers.google.com/speed/docs/insights/mobile#delivering-the-sub-one-second-rendering-experience
	return normalize_unicode(result)
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
