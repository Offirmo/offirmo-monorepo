import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Category, EntryPoints, WebsiteEntryPointSpec } from '../types.js'
import {
	canꓽuse_window_controls_overlay,
	hasꓽown_navigation,
	getꓽbasenameⵧindexᐧhtml,
	getꓽlang,
	getꓽtitleⵧapp,
	getꓽtitleⵧappⵧshort,
	getꓽcolorⵧbackground,
	getꓽcolorⵧtheme, supportsꓽscreensⵧwith_shape, getꓽicon__sizes, getꓽicon__path,
} from '../selectors.js'
import { ifꓽdebug } from '../utils/debug.js'

/////////////////////////////////////////////////

const GENERIC_CODE_TEMPLATE = `
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import {  } from './types.js'

/////////////////////////////////////////////////

function create(): Immutable<> {
function getꓽXYZⵧfoo‿v2(): void {}
/*
ↆfoo ⵧ fetch
ೱfoo ⵧ promise
ϟaꘌb
notᝍbadₓasⳇwell‿noǃ
bar𝝣fooǃfoo𖾚fooᐧbar
 */
}

/////////////////////////////////////////////////

export {

}
`.trim()

function generate(spec: Immutable<WebsiteEntryPointSpec>): EntryPoints {
	return {
		'./app/consts.ts': `TODO`,

		// service layer
		// ~syncing view with external data sources
		'./app/services/init/sec.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/init/errors.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/init/analytics.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/channel.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/logger.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/splash.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/auth.ts': GENERIC_CODE_TEMPLATE,

		// controllers
		// ~shared state and stateful logic
		'./app/controllers/context.tsx': GENERIC_CODE_TEMPLATE,

		// view
		'./app/view/index.tsx': GENERIC_CODE_TEMPLATE,
	}
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
