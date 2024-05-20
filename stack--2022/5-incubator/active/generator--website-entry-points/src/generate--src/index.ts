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
	...
}
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

const CODE_TEMPLATEⵧSERVICESⳇINITⵧCRITICALⳇLOGGER = `
import logger from '../logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	console.log(\`🗂 Logger up with level "\${logger.getLevel()}". Reminder to check your dev tools log level!\`)
}

/////////////////////////////////////////////////

export default init
`.trim()

const CODE_TEMPLATEⵧSERVICESⳇINITⵧCRITICALⳇSXC = `
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

const CODE_TEMPLATEⵧSERVICESⳇINITⵧCRITICALⳇERRORS = `
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


function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
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
	const initⵧservicesⵧcritical = await import('./services/init--critical/*.ts')
	await Object.keys(initⵧservicesⵧcritical).sort().reduce(async (acc, key) => {
		await acc
		logger.group(\`services/initⵧcritical "\${key}"\`)
			logger.trace(\`services/initⵧcritical "\${key}": import…\`)
			const init_fn = (await initⵧservicesⵧcritical[key]()).default
			logger.trace(\`services/initⵧcritical "\${key}": exec…\`)
			await init_fn()
			logger.trace(\`services/initⵧcritical "\${key}": done✅\`)
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

	const initⵧservicesⵧnoncritical = await import('./services/init--noncritical/*.ts')
	await Object.keys(initⵧservicesⵧnoncritical).sort().reduce(async (acc, key) => {
		await acc
		logger.group(\`services/initⵧnoncritical "\${key}"\`)
			logger.trace(\`services/initⵧnoncritical "\${key}": import…\`)
			const init_fn = (await initⵧservicesⵧnoncritical[key]()).default
			logger.trace(\`services/initⵧnoncritical "\${key}": exec…\`)
			await init_fn()
			logger.trace(\`services/initⵧnoncritical "\${key}": done✅\`)
		logger.groupEnd()
	}, Promise.resolve())
})
`.trimStart(),

		// service layer
		// ~syncing view with external data sources
		'./app/services/init--critical/00-logger.ts': CODE_TEMPLATEⵧSERVICESⳇINITⵧCRITICALⳇLOGGER,
		'./app/services/init--critical/01-sxc.ts': CODE_TEMPLATEⵧSERVICESⳇINITⵧCRITICALⳇSXC,
		'./app/services/init--critical/10-errors.ts': CODE_TEMPLATEⵧSERVICESⳇINITⵧCRITICALⳇERRORS,
		'./app/services/init--critical/11-security.ts': CODE_TEMPLATEⵧGENERIC,

		'./app/services/init--noncritical/10-analytics.ts': CODE_TEMPLATEⵧGENERIC,
		'./app/services/init--noncritical/10-auth.ts': CODE_TEMPLATEⵧGENERIC,

		'./app/services/auth.ts': CODE_TEMPLATEⵧGENERIC,
		'./app/services/channel.ts': CODE_TEMPLATEⵧGENERIC,
		'./app/services/loader.ts': CODE_TEMPLATEⵧGENERIC,
		'./app/services/logger.ts': CODE_TEMPLATEⵧSERVICESⳇLOGGER,

		// controllers
		// ~shared state and stateful logic
		'./app/controllers/context.tsx': CODE_TEMPLATEⵧGENERIC,

		// view
		'./app/view/init/react.tsx': CODE_TEMPLATEⵧGENERIC,
		'./app/view/index.tsx': CODE_TEMPLATEⵧGENERIC,
	}
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
