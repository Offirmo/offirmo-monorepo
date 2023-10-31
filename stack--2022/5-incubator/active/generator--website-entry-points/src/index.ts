import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { EntryPoints, WebsiteEntryPointSpec } from './types.js'

import {
	needsꓽwebmanifest,

	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧwebmanifest,
} from './selectors.js'
import generateꓽindexᐧhtml from './generate--index-html/index.js'
import generateꓽwebmanifest from './generate--webmanifest/index.js'
import { generateꓽfile as generateꓽfavicon_file } from './generate--favicons/index.js'

/////////////////////////////////////////////////

function generateꓽwebsiteᝍentryᝍpoint(spec: Immutable<WebsiteEntryPointSpec>): EntryPoints {
	return {
		[getꓽbasenameⵧindexᐧhtml(spec)]: generateꓽindexᐧhtml(spec),

		['favicon.svg']: generateꓽfavicon_file(spec),

		...(needsꓽwebmanifest(spec) && { [getꓽbasenameⵧwebmanifest(spec)]: JSON.stringify(generateꓽwebmanifest(spec), undefined, '	')}),
	}
}

/////////////////////////////////////////////////

export default generateꓽwebsiteᝍentryᝍpoint

export {
	generateꓽwebsiteᝍentryᝍpoint,
}
