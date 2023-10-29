import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { EntryPoints, WebsiteEntryPointSpec } from './types.js'
import { DEFAULT_SPEC } from './consts.js'

import {
	needsꓽwebmanifest,

	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧwebmanifest,
} from './selectors.js'
import generateꓽindexᐧhtml from './generate--index-html/index.js'
import generateꓽwebmanifest from './generate--webmanifest/index.js'

/////////////////////////////////////////////////

function generateꓽwebsiteᝍentryᝍpoint(spec: Immutable<WebsiteEntryPointSpec>): EntryPoints {
	assert(!!spec.title, `should have a title!`)
	assert(typeof spec.isꓽpublic === 'boolean', `should tell if public!`)

	return {
		[getꓽbasenameⵧindexᐧhtml(spec)]: generateꓽindexᐧhtml(spec),

		...(needsꓽwebmanifest(spec) && { [getꓽbasenameⵧwebmanifest(spec)]: JSON.stringify(generateꓽwebmanifest(spec), undefined, '	')}),
	}
}

/////////////////////////////////////////////////

export default generateꓽwebsiteᝍentryᝍpoint

export {
	generateꓽwebsiteᝍentryᝍpoint,
}
