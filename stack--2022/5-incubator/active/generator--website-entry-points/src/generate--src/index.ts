import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { EntryPoints, WebPropertyEntryPointSpec } from '../types.js'
import {
	getꓽtitleⵧapp,
	getꓽtitleⵧappⵧshort,
	getꓽtitleⵧlib,
	getꓽcolorⵧbackground,
	getꓽcolorⵧforeground,
} from '../selectors/index.js'
import { ifꓽdebug } from '../utils/debug.js'

/////////////////////////////////////////////////

const CODE_TEMPLATEⵧGENERIC = `
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

//import {  } from './types.js'

/////////////////////////////////////////////////

function some_stuff(): Immutable<string> {
/*function getꓽXYZⵧfoo‿v2(): void {}
ↆfoo ⵧ fetch
ೱfoo ⵧ promise
ϟaꘌb
notᝍbadₓasⳇwell‿noǃ
bar𝝣fooǃfoo𖾚fooᐧbar
 */
	throw new Error('NIMP!')
}

/////////////////////////////////////////////////

export default some_stuff
`.trim()

const CODE_TEMPLATEⵧSERVICESⳇLOGGER = `
import { getLogger } from '@offirmo/universal-debug-api-browser'

import { LIB } from '../consts.ts'

/////////////////////////////////////////////////

const logger = getLogger({
	name: LIB,
	//suggestedLevel: 'error',
	//suggestedLevel: 'warn',
	//suggestedLevel: 'verbose',
	suggestedLevel: 'silly',
})

/////////////////////////////////////////////////

export default logger
`.trim()

function genꓽCODE_TEMPLATEⵧSERVICESⳇCHANNEL(spec: Immutable<WebPropertyEntryPointSpec>): string {
	const URLⵧCANONICAL‿str = spec.urlⵧcanonical
	const URLⵧCANONICAL‿url= new URL(URLⵧCANONICAL‿str)

	return `
//import { is_loaded_from_cordova } from './cordova' TODO

import { LIB } from '../consts.ts'

const URLⵧCANONICAL = '${spec.urlⵧcanonical}'

/////////////////////////////////////////////////

function isꓽprod() {
	const URLⵧCANONICAL‿obj = new URL(URLⵧCANONICAL)

	if (window.location.protocol !== 'https:')
		return false

	if (window.location.port)
		return false

	if (window.location.hostname !== URLⵧCANONICAL‿obj.hostname)
		return false

	//is_loaded_from_cordova() TODO
	return true
}

function isꓽstaging() {
	if (window.location.protocol !== 'https:')
		return false

	if (window.location.port)
		return false

	// TODO add more
	if (window.location.hostname.endsWith('netlify.app'))
		return true

	return false
}

const CHANNEL = isꓽprod()
	? 'prod'
	: isꓽstaging()
		? 'staging'
		: 'dev'

/////////////////////////////////////////////////

export {
	CHANNEL,
}
`.trim()
}

const CODE_TEMPLATEⳇINITⳇLOGGER = `
import logger from '../logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	console.log(\`🗂 Logger up with level "\${logger.getLevel()}". Reminder to check your dev tools log level!\`)
}

/////////////////////////////////////////////////

export default init
`.trim()

const CODE_TEMPLATEⳇINITⳇSXC = `
import { getRootSXC, decorateWithDetectedEnv } from '@offirmo-private/soft-execution-context--browser'

import { LIB } from '../../consts.ts'
import { VERSION } from '../../../build.ts'
import { CHANNEL } from '../channel.ts'
import logger from '../logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	const rootSXC = getRootSXC()

	decorateWithDetectedEnv(rootSXC)

	rootSXC.setLogicalStack({ module: LIB })

	rootSXC.injectDependencies({
		logger,
		CHANNEL,
		VERSION,
	})

	rootSXC.setAnalyticsAndErrorDetails({
		VERSION,
		CHANNEL,
	})

	rootSXC.xTry('init:SXC', ({logger, SXC}) => {
		logger.debug('Root Soft Execution Context initialized.', rootSXC)
		logger.debug('Root SXC is now decorated with a logger ✔')
		logger.debug('Root SXC is now decorated with env infos ✔', SXC.getAnalyticsDetails())
	})

	const { ENV } = rootSXC.getInjectedDependencies()
	if (ENV !== process.env.NODE_ENV) {
		logger.error('ENV detection mismatch!', { 'SXC.ENV': ENV, 'process.env.NODE_ENV': process.env.NODE_ENV })
	}
}

/////////////////////////////////////////////////

export default init
`.trim()

const CODE_TEMPLATEⳇINITⳇERRORS = `
import { getRootSXC } from '@offirmo-private/soft-execution-context'
import {	listenToErrorEvents, listenToUnhandledRejections } from '@offirmo-private/soft-execution-context--browser'

import { CHANNEL } from '../channel.ts'

/////////////////////////////////////////////////

const STYLES = 'padding: .5em; background-color: red; color: white; font-weight: bold;'

async function init(): Promise<void> {
	const rootSXC = getRootSXC()

	rootSXC.emitter.on('final-error', function onFinalError({SXC, err}) {
		try {
			// this code must be super extra safe!!!
			// don't even use the advanced logger!

			console.group('%cSXC "final-error" event!', STYLES)

			if (CHANNEL === 'dev') {
				console.error('%c↑ error! (no report since dev)', STYLES, {SXC, err})
				return
			}

			//console.log('(this error will be reported)')
			// TODO integrate with Sentry!

			console.groupEnd()
		}
		catch(err) {
			console.log(\`%c RECURSIVE CRASH!!! SXC ERROR HANDLING CAN ABSOLUTELY NOT CRASH!!! FIX THIS!!!\`, STYLES)
			console.log(err)
		}
	})

	listenToErrorEvents()
	listenToUnhandledRejections()

	rootSXC.xTry('init:SXC', ({logger, SXC}) => {
		logger.debug('Root SXC is now decorated with error details ✔', SXC.getErrorDetails())
	})
}

/////////////////////////////////////////////////

export default init
`.trim()

const CODE_TEMPLATEⳇINITⳇGENERIC = `
import { getRootSXC } from '@offirmo-private/soft-execution-context'

import { CHANNEL } from '../services/channel.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	const rootSXC = getRootSXC()

	rootSXC.xTry('init', ({logger, SXC}) => {

	})
}

/////////////////////////////////////////////////

export default init
`.trim()

function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		'./app/consts.ts': `export const LIB = '${getꓽtitleⵧlib(spec)}'`,
		'./app/index.ts': `
import { asap_but_out_of_immediate_execution, forArray } from '@offirmo-private/async-utils'
import { VERSION, BUILD_DATE } from '../entry-points/build.ts'

import { CHANNEL } from './services/channel'

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
	const init = await import('./init/*.ts')
	await forArray(Object.keys(init).sort()).executeSequentially((key) => {
		logger.group(\`init/"\${key}"\`)
			logger.trace(\`init/"\${key}": import…\`)
			const init_fn = (await init[key]()).default
			logger.trace(\`init/"\${key}": exec…\`)
			await init_fn()
			logger.trace(\`init/"\${key}": done ✅\`)
		logger.groupEnd()
	}, Promise.resolve())
})
`.trimStart(),

		// service layer
		// ~syncing view with external data sources
		'./app/services/auth.ts': CODE_TEMPLATEⵧGENERIC,
		'./app/services/channel.ts': genꓽCODE_TEMPLATEⵧSERVICESⳇCHANNEL(spec),
		'./app/services/loader.ts': CODE_TEMPLATEⵧGENERIC,
		'./app/services/logger.ts': CODE_TEMPLATEⵧSERVICESⳇLOGGER,

		// controllers
		// ~shared state and stateful logic
		'./app/controllers/state--app.tsx': CODE_TEMPLATEⵧGENERIC,
		'./app/controllers/flux.tsx': CODE_TEMPLATEⵧGENERIC,

		// view
		'./app/view/index.tsx': CODE_TEMPLATEⵧGENERIC,

		// init
		'./app/init/00-logger.ts':    CODE_TEMPLATEⳇINITⳇLOGGER,
		'./app/init/01-security.ts':  CODE_TEMPLATEⳇINITⳇGENERIC,
		'./app/init/02-sxc.ts':       CODE_TEMPLATEⳇINITⳇSXC,
		'./app/init/03-errors.ts':    CODE_TEMPLATEⳇINITⳇERRORS,
		'./app/init/10-loader.tsx':   CODE_TEMPLATEⳇINITⳇGENERIC,
		'./app/init/11-flux.tsx':     CODE_TEMPLATEⳇINITⳇGENERIC,
		'./app/init/12-view.tsx':     CODE_TEMPLATEⳇINITⳇGENERIC,
		'./app/init/20-auth.ts':      CODE_TEMPLATEⳇINITⳇGENERIC,
		'./app/init/30-analytics.ts': CODE_TEMPLATEⳇINITⳇGENERIC,
	}
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
