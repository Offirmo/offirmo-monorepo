//import './__shared/x-logger.ts'

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { asap_but_out_of_immediate_execution } from '@offirmo-private/async-utils'
//import { ೱᐧpage_loaded } from '@offirmo-private/page-loaded'

import { LIB, DEBUG } from '../../consts.ts'
import type { Config } from '../../l0-types/l2-config/index.ts'

/////////////////////////////////////////////////

// strange behavior on Parcel.js start
Array.from({length: 10}, () => { console.log('⇱'); console.groupEnd() })

const is_iframe = ( window.location !== window.parent.location )
console.info(`%c ${LIB} %c${'CSFv3'}%c${'HTML/React'} [${is_iframe ? 'SUB frame' : 'TOP frame'}]`,
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: hsl(337, 16%, 28%); color: hsl(42, 100%, 87%); font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black; font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black;',
)
const misconfig_detection = setTimeout(() => {
	console.warn(`no call to startꓽstorypad() detected. Check your setup!`)
}, 1500)

/////////////////////////////////////////////////

import { ObservableState } from '../../l1-flux/l2-observable'

// @ts-expect-error bundler advanced feature
import initsⵧservices from '../l0-services/init/*.ts'

import render from './render-root.ts'

////////////////////////////////////////////////////////////////////////////////////

async function startꓽstorypad(stories_glob: Immutable<any>, config?: Immutable<Config>) {
	clearTimeout(misconfig_detection)

	DEBUG && console.log(`[${LIB}] scheduling…`)

	// on first load, parcel.js in debug mode has some strange behavior
	// let's try waiting
	//await ೱᐧpage_loaded
	//DEBUG && console.log(`[${LIB}] page loaded ✅ resuming…`)

	await asap_but_out_of_immediate_execution(async () => {
		console.groupCollapsed(`[${LIB}] Starting… `)
		console.log(`location =`, window.location.href)
		console.log('config =', config)
		console.log('glob =', stories_glob)

		// 1. services
		console.groupCollapsed(`[${LIB}] 1/3 Services init…`)
		// order is important! Timing is non-trivial!
		assert(Object.keys(initsⵧservices).length > 0, 'Unexpectedly no services/init found!')
		await Object.keys(initsⵧservices).sort().reduce(async (acc, key) => {
			await acc
			console.group(`services/init "${key}"`)
			const init_fn = initsⵧservices[key].default
			console.trace(`services/init "${key}": exec…`)
			await init_fn()
			console.trace(`services/init "${key}": done ✅`)
			console.groupEnd()
		}, Promise.resolve())
		console.log(`[${LIB}] 1/3 Services init ✅`)
		console.groupEnd()

		// 2. flux
		console.groupCollapsed(`[${LIB}] 2/3 Flux init…`)
		const flux = new ObservableState()
		await flux.init(stories_glob, config)
		console.log(`[${LIB}] 2/3 Flux init ✅`)
		console.groupEnd()

		// 3. view
		console.groupCollapsed(`[${LIB}] 3/3 View init…`)
		render(flux)
		console.log(`[${LIB}] 3/3 View init ✅`)
		console.groupEnd()

		console.log(`[${LIB}] Done ✔`)
		console.groupEnd()
	})
}

////////////////////////////////////////////////////////////////////////////////////

export {
	startꓽstorypad,
}
