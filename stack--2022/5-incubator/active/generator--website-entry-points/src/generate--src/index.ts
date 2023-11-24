import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { EntryPoints, WebsiteEntryPointSpec } from '../types.js'
import {
	getꓽtitleⵧapp,
	getꓽtitleⵧappⵧshort,
	getꓽcolorⵧbackground, getꓽcolorⵧforeground,
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
		'./app/index.ts': `
import { asap_but_out_of_immediate_execution } from '@offirmo-private/async-utils'
import { VERSION, BUILD_DATE } from '../build.json'

//import { CHANNEL } from './services/channel'

/////////////////////////////////////////////////

console.info(\`%c ${getꓽtitleⵧapp(spec)} %cv\${VERSION}%c\${BUILD_DATE}\`,
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: ${getꓽcolorⵧbackground(spec)}; color: ${getꓽcolorⵧforeground(spec)}; font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black; font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black;',
)

/////////////////////////////////////////////////

asap_but_out_of_immediate_execution(async () => {
	console.log('%c——————— end of immediate, synchronous, non-import code. ———————', "font-weight: bold;")

	const inits = await import('./services/init/*.ts')
	Object.keys(inits).sort().forEach(async (key) => {
		const init_fn = (await inits[key]()).default
		init_fn()
	})
})
		`.trim(),

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
