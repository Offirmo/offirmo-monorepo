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

/////////////////////////////////////////////////

const URLⵧCANONICAL = '${spec.urlⵧcanonical}'

/////////////////////////////////////////////////

// prod = full security and reliability
// staging = close to prod, usually only difference is the data storage = different from prod
// dev = anything else
const CHANNEL = ((): 'prod' | 'staging' | 'dev' => {

	// first weed out obvious dev cases
	if (!window.isSecureContext)                  return 'dev'
	if (window.location.protocol !== 'https:')    return 'dev'
	if (window.location.port)                     return 'dev'

	// then detect common "local" dev setups
	const isꓽlocalhost = ['localhost', 'example', 'test', 'invalid'].some(domain => window.location.hostname.endsWith(domain)) // https://en.wikipedia.org/wiki/.localhost
	if (isꓽlocalhost)                              return 'dev'
	const isꓽtunneledⵧngrok = ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.dev'].some(domain => window.location.hostname.endsWith(domain)) // https://ngrok.com/blog-post/new-ngrok-domains
	if (isꓽtunneledⵧngrok)                        return 'dev'
	const isꓽtunneledⵧcloudflare = ['.cfargotunnel.com'].some(domain => window.location.hostname.endsWith(domain)) // https://developers.cloudflare.com/cloudflare-one/faq/cloudflare-tunnels-faq/
	if (isꓽtunneledⵧcloudflare)                   return 'dev'

	// then detect common "hosted" locations, which mean staging
	if (window.location.hostname.endsWith('.netlify.app'))    return 'staging'
	if (window.location.hostname.endsWith('.github.io'))      return 'staging'
	if (window.location.hostname.endsWith('.pages.dev'))      return 'staging' // cloudflare
	if (window.location.hostname.endsWith('.cloudfront.net')) return 'staging' // AWS

	// finally, does it match the expected canonical URL?
	const URLⵧCANONICAL‿obj = new URL(URLⵧCANONICAL)
	if (window.location.hostname === URLⵧCANONICAL‿obj.hostname) return 'prod'

	// TODO cordova
	// TODO itch.io

	// everything else is unknown = unsafe
	return 'dev'
})()

/////////////////////////////////////////////////

export { CHANNEL }
`.trim()
}

const CODE_TEMPLATEⳇINITⳇSECURITY = `
/** Immediate security initializations.
 * This code will be executed immediately when the app starts.
 *
 * We can't ensure full security, but we can try to mitigate some risks.
 * https://owasp.org/www-project-top-ten/
 * - We assume our own code can be compromised (ex. supply chain)
 * - We assume the opener of our page may have injected some js https://krausefx.com//blog/ios-privacy-instagram-and-facebook-can-track-anything-you-do-on-any-website-in-their-in-app-browser
 */
import { getRootSXC } from '@offirmo-private/soft-execution-context'

/////////////////////////////////////////////////

// add immediate security actions here
// TODO should happen synchronously inside the HTML!
function initⵧimmediate(): void {
	console.log('%cEnforcing app security…', 'font-style: oblique;')
	// protect against prototype pollution
	// is that really useful?
	// https://www.synopsys.com/blogs/software-security/javascript-security-best-practices.html#6
	Object.freeze(Object.prototype)

	// TODO strip global scope and APIs
}


// add logs or later security actions here
async function initⵧdeferred() {
	getRootSXC().xTry('init:SXC', ({ logger }) => {
		// ensure we have a CSP
		const allowsꓽunsafe_evals = (() => {
			// https://stackoverflow.com/a/27399739/587407
			try { new Function(''); return true }
			catch (e) { return false }
		})()
		if(allowsꓽunsafe_evals) {
			// this is the first thing a CSP disables...
			logger.error('Content Security Policy is missing! Consider this app unsafe!')
		}

		const isꓽiframe = window.self !== window.top
		if(isꓽiframe) {
			// strictly speaking the web is composable and there is nothing wrong with being an iframe
			// however there are a few attacks...
			// https://web.dev/articles/security-headers#xfo
			logger.warn('Running in an iframe, be cautious!!')
			// since we don't have any iframe-specific feature, let's cut off the connection
			window.parent = window
			window.top = window
		}
	})
}

/////////////////////////////////////////////////

initⵧimmediate()

export default initⵧdeferred
`.trim()

const CODE_TEMPLATEⳇINITⳇLOGGER = `
import logger from '../services/logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	console.log(\`🗂 Logger up with level "\${logger.getLevel()}". Reminder to check your dev tools log level!\`)
}

/////////////////////////////////////////////////

export default init
`.trim()

const CODE_TEMPLATEⳇINITⳇSXC = `
import { getRootSXC, decorateWithDetectedEnv } from '@offirmo-private/soft-execution-context--browser'

import { LIB } from '../consts.ts'
import { VERSION } from '../../entry-points/build.ts'
import { CHANNEL } from '../services/channel.ts'
import logger from '../services/logger.ts'

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

	rootSXC.xTry('init:SXC', ({ logger, SXC }) => {
		logger.debug('┌ Root SXC is now decorated with a logger ✔')
		logger.debug('├ Root SXC is now decorated with env infos ✔', SXC.getAnalyticsDetails())
		logger.debug('└► Root Soft Execution Context initialized ✔', rootSXC)
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
import './init/00-security.ts' // as early as possible, side effects expected

import { CHANNEL } from './services/channel'

/////////////////////////////////////////////////

console.info(\`%cWelcome to %c${getꓽtitleⵧapp(spec)} %cv\${VERSION}%c\${BUILD_DATE}\`,
	'font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: ${getꓽcolorⵧbackground(spec)}; color: ${getꓽcolorⵧforeground(spec)}; font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey;                           color: black;                              font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey;                           color: black;',
)

/////////////////////////////////////////////////

asap_but_out_of_immediate_execution(async () => {
	console.log('%c——————— end of immediate, synchronous, non-import code. ———————', "font-weight: bold;")

	const logger = (await import('./services/logger.ts')).default

	// order is important! Timing is non-trivial!
	const inits = await import('./init/*.ts')
	await forArray(Object.keys(inits).sort()).executeSequentially(async (key) => {
		logger.group(\`init/"\${key}"\`)
			logger.trace(\`init/"\${key}": import…\`)
			const init_fn = (await inits[key]()).default
			logger.trace(\`init/"\${key}": exec…\`)
			await init_fn()
			logger.trace(\`init/"\${key}": done ✅\`)
		logger.groupEnd()
	})
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
		'./app/init/00-security.ts':  CODE_TEMPLATEⳇINITⳇSECURITY,
		'./app/init/01-logger.ts':    CODE_TEMPLATEⳇINITⳇLOGGER,
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
