import { asap_but_out_of_immediate_execution } from '@offirmo-private/async-utils'
import { VERSION, BUILD_DATE } from '../build.ts'

//import { CHANNEL } from './services/channel'

/////////////////////////////////////////////////

console.info(`%c The Boring RPG %cv${VERSION}%c${BUILD_DATE}`,
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: hsl(337, 16%, 28%); color: hsl(42, 100%, 87%); font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black; font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black;',
)

/////////////////////////////////////////////////

import logger from './services/logger.ts'
import initsⵧservices from './services/init/*.ts'
import initsⵧview from './view/init/*.ts'

asap_but_out_of_immediate_execution(async () => {
	console.log('%c——————— end of immediate, synchronous, non-import code. ———————', "font-weight: bold;")
	//console.log({ initsⵧservices,	initsⵧview })

	// order is important! Timing is non-trivial!
	await Object.keys(initsⵧservices).sort().reduce(async (acc, key) => {
		await acc
		logger.group(`services/init "${key}"`)
			const init_fn = initsⵧservices[key].default
			logger.trace(`services/init "${key}": exec…`)
			await init_fn()
			logger.trace(`services/init "${key}": done ✅`)
		logger.groupEnd()
	}, Promise.resolve())

	// order is important! Timing is non-trivial!
	await Object.keys(initsⵧview).sort().reduce(async (acc, key) => {
		await acc
		logger.group(`services/view "${key}"`)
			const init_fn = initsⵧview[key].default
			logger.trace(`services/view "${key}": exec…`)
			await init_fn()
			logger.trace(`services/view "${key}": done ✅`)
		logger.groupEnd()
	}, Promise.resolve())
})
