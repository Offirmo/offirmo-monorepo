//import type { Immutable } from '@monorepo-private/ts--types'
import assert from 'tiny-invariant'

/////////////////////////////////////////////////

import { NAME, LIB } from './consts.ts'
//import { VERSION, BUILD_DATE } from '../build.ts'

console.info(
	`%c ${NAME} %cv${'VERSION'}%c${'BUILD_DATE'}`,
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: hsl(337, 16%, 28%); color: hsl(42, 100%, 87%); font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black; font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black;',
)

/////////////////////////////////////////////////

import { asap_but_out_of_immediate_execution, forArray } from '@monorepo-private/utils--async'

export async function start(DEBUG = false) {
	// do NOT use groupCollapsed before the logger/'better console group' is installed
	// or errors will be hidden
	DEBUG && console.log(`[${LIB}] Starting… `, { location: window.location.href })
	const ↆlogger = import('./cross-cutting/logger.ts')

	// on first load, parcel.js in debug mode has some strange behavior
	// let's try waiting
	//await ೱᐧpage_loaded
	//DEBUG && console.log(`[${LIB}] page loaded ✅ resuming…`)

	await asap_but_out_of_immediate_execution(async () => {
		DEBUG
			&& console.log(
				'%c——————— end of immediate, synchronous, non-import code. ———————',
				'font-weight: bold;',
			)

		const logger = (await ↆlogger).default

		// order is important! Timing is non-trivial!
		const inits = await import('./init/*.(js|ts|jsx|tsx)')
		await forArray(Object.keys(inits).sort()).executeSequentially(async key => {
			logger.groupCollapsed(`init/"${key}"`)
			logger.trace(`init/"${key}": loading…`)
			const require = inits[key].js || inits[key].ts || inits[key].jsx || inits[key].tsx
			const exports = await require().catch(() => require()) // allow 1x retry
			logger.trace(`init/"${key}": loaded, now executing…`)
			const init_fn = exports.default
			await init_fn()
			logger.trace(`init/"${key}": done ✅`)
			logger.groupEnd()
		})
	})
}
