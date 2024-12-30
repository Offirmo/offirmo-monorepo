import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import { asap_but_out_of_immediate_execution } from '@offirmo-private/async-utils'

import { LIB } from './consts'
import { Config } from './types/config'

/////////////////////////////////////////////////

console.info(`%c ${LIB} %c${'CSFv3'}%c${'HTML/React'}`,
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: hsl(337, 16%, 28%); color: hsl(42, 100%, 87%); font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black; font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black;',
)
const misconfig_detection = setTimeout(() => {
	console.warn(`no call to startꓽstorypad() detected. Check your setup!`)
}, 1500)

/////////////////////////////////////////////////

import logger from './services/logger.ts'

// @ts-expect-error bundler advanced feature
import initsⵧservices from './services/init/*.ts'

import { init as initꓽflux } from './flux/dispatcher'
import render from './view'

////////////////////////////////////////////////////////////////////////////////////

export async function startꓽstorypad(stories_glob: Immutable<any>, config?: Immutable<Config>) {
	clearTimeout(misconfig_detection)

	console.log(`[${LIB}] scheduling…`)
	await asap_but_out_of_immediate_execution(async () => {
		const is_iframe = ( window.location !== window.parent.location )
		console.group(`[${LIB}] Starting… [${is_iframe ? 'SUB frame' : 'TOP frame'}]`)
		console.log(`location =`, window.location.href)
		console.log('config =', config)
		console.log('glob =', stories_glob)

		// 1. services
		console.groupCollapsed(`[${LIB}] 1/3 Services init…`)
		// order is important! Timing is non-trivial!
		assert(Object.keys(initsⵧservices).length > 0, 'Unexpectedly no services/init found!')
		await Object.keys(initsⵧservices).sort().reduce(async (acc, key) => {
			await acc
			logger.group(`services/init "${key}"`)
			const init_fn = initsⵧservices[key].default
			logger.trace(`services/init "${key}": exec…`)
			await init_fn()
			logger.trace(`services/init "${key}": done ✅`)
			logger.groupEnd()
		}, Promise.resolve())
		console.log(`[${LIB}] 1/3 Services init ✅`)
		console.groupEnd()

		// 2. flux
		console.groupCollapsed(`[${LIB}] 2/3 Flux init…`)
		await initꓽflux(stories_glob, config)
		console.log(`[${LIB}] 2/3 Flux init ✅`)
		console.groupEnd()

		// 3. view
		console.group(`[${LIB}] 3/3 View init…`)
		await render()
		console.log(`[${LIB}] 3/3 View init ✅`)
		console.groupEnd()

		console.log(`[${LIB}] Done ✔`)
		console.groupEnd()
	})
}

////////////////////////////////////////////////////////////////////////////////////

export default startꓽstorypad
