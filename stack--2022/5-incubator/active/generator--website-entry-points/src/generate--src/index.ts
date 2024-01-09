import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { EntryPoints, WebsiteEntryPointSpec } from '../types.js'
import {
	getꓽtitleⵧapp,
	getꓽtitleⵧappⵧshort,
	getꓽtitleⵧlib,
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


// 50% building / 50% marketing
// security / safety
// reliability what could go wrong? I would I know
// features



function generate(spec: Immutable<WebsiteEntryPointSpec>): EntryPoints {
	return {
		'./app/consts.ts': `
/////////////////////////////////////////////////

const LIB = '${getꓽtitleⵧlib(spec)}'

/////////////////////////////////////////////////

export {
	LIB,
}
`.trimStart(),
		'./app/index.ts': `
import { asap_but_out_of_immediate_execution } from '@offirmo-private/async-utils'
import { VERSION, BUILD_DATE } from '../build.ts'

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

	const logger = (await import('./services/logger.ts')).default

	// order is important! Timing is non-trivial!
	const initⵧservices = await import('./services/init/*.ts')
	await Object.keys(initⵧservices).sort().reduce(async (acc, key) => {
		await acc
		logger.group(\`services/init "\${key}"\`)
			logger.trace(\`services/init "\${key}": import…\`)
			const init_fn = (await initⵧservices[key]()).default
			logger.trace(\`services/init "\${key}": exec…\`)
			await init_fn()
			logger.trace(\`services/init "\${key}": done✅\`)
		logger.groupEnd()
	}, Promise.resolve())

	// order is important! Timing is non-trivial!
	const initⵧview = await import('./view/init/*.tsx')
	await Object.keys(initⵧview).sort().reduce(async (acc, key) => {
		await acc
		logger.group(\`services/view "\${key}"\`)
			logger.trace(\`services/view "\${key}": import…\`)
			const init_fn = (await initⵧview[key]()).default
			logger.trace(\`services/view "\${key}": exec…\`)
			await init_fn()
			logger.trace(\`services/view "\${key}": done✅\`)
		logger.groupEnd()
	}, Promise.resolve())
})
`.trimStart(),

		// service layer
		// ~syncing view with external data sources
		'./app/services/init/01-security.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/init/02-sec.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/init/10-errors.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/init/20-tracing.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/init/30-analytics.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/auth.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/channel.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/loader.ts': GENERIC_CODE_TEMPLATE,
		'./app/services/logger.ts': `
import { getLogger } from '@offirmo/universal-debug-api-browser'

import { LIB } from '../consts.ts'

/////////////////////////////////////////////////

const logger = getLogger({
	name: LIB,
	suggestedLevel: 'error',
	//suggestedLevel: 'silly',
})

console.log(\`🗂 Logger up with level "\${logger.getLevel()}". Reminder to check your dev tools log level!\`)

/////////////////////////////////////////////////

export default logger
`.trimStart(),

		// controllers
		// ~shared state and stateful logic
		'./app/controllers/context.tsx': GENERIC_CODE_TEMPLATE,

		// view
		'./app/view/init/react.tsx': GENERIC_CODE_TEMPLATE,
		'./app/view/index.tsx': GENERIC_CODE_TEMPLATE,
	}
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
