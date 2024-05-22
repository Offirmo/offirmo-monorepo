import { asap_but_out_of_immediate_execution, forArray } from '@offirmo-private/async-utils'
import { VERSION, BUILD_DATE } from '../entry-points/build.ts'
import './init/00-security.ts'

import { CHANNEL } from './services/channel'

/////////////////////////////////////////////////

console.info(
	`%cWelcome to %cPWA debugger %cv${VERSION}%c${BUILD_DATE}`,
	'font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: hsl(337, 16%, 28%); color: hsl(42, 100%, 87%); font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey;           color: black;              font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey;           color: black;',
)

/////////////////////////////////////////////////

asap_but_out_of_immediate_execution(async () => {
	console.log('%c——————— end of immediate, synchronous, non-import code. ———————', 'font-weight: bold;')

	const logger = (await import('./services/logger.ts')).default

	// order is important! Timing is non-trivial!
	const init = await import('./init/*.ts')
	await forArray(Object.keys(init).sort()).executeSequentially(async (key) => {
		logger.group(`init/"${key}"`)
		logger.trace(`init/"${key}": import…`)
		const init_fn = (await init[key]()).default
		logger.trace(`init/"${key}": exec…`)
		await init_fn()
		logger.trace(`init/"${key}": done ✅`)
		logger.groupEnd()
	})
})
