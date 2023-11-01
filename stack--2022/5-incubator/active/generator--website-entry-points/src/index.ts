import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { EntryPoints, WebsiteEntryPointSpec } from './types.js'

import {
	needsꓽwebmanifest,

	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧwebmanifest,
	getꓽicon__sizes,
	getꓽicon__basename,
} from './selectors.js'
import generateꓽindexᐧhtml from './generate--index-html/index.js'
import generateꓽwebmanifest from './generate--webmanifest/index.js'
import { generateꓽfile as generateꓽicon_file } from './generate--icons/index.js'

/////////////////////////////////////////////////

function generateꓽwebsiteᝍentryᝍpoint(spec: Immutable<WebsiteEntryPointSpec>): EntryPoints {
	return {
		[getꓽbasenameⵧindexᐧhtml(spec)]: generateꓽindexᐧhtml(spec),

		...getꓽicon__sizes(spec).reduce((acc, size) => {
				acc[getꓽicon__basename(spec, size)] = generateꓽicon_file(spec, size)
				return acc
		}, {} as EntryPoints),

		// size-less version
		'icon.svg': generateꓽicon_file(spec),

		...(needsꓽwebmanifest(spec) && { [getꓽbasenameⵧwebmanifest(spec)]: JSON.stringify(generateꓽwebmanifest(spec), undefined, '	')}),
	}
}

/////////////////////////////////////////////////

export default generateꓽwebsiteᝍentryᝍpoint

export {
	generateꓽwebsiteᝍentryᝍpoint,
}
