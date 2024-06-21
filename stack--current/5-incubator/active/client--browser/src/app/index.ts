import { asap_but_out_of_immediate_execution, forArray } from '@offirmo-private/async-utils'
import { VERSION, BUILD_DATE } from '../entry-points/build.ts'
import './init/00-security.ts' // as early as possible, side effects expected

/////////////////////////////////////////////////

console.info(
	`%cWelcome to %cThe Boring RPG %cv${VERSION}%c${BUILD_DATE}`,
	'font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: hsl(337, 16%, 28%); color: hsl(42, 100%, 87%); font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey;                           color: black;                              font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey;                           color: black;',
)

/////////////////////////////////////////////////

asap_but_out_of_immediate_execution(async () => {
	console.log('%c——————— end of immediate, synchronous, non-import code. ———————', 'font-weight: bold;')

	const logger = (await import('./services/logger.ts')).default

	// order is important! Timing is non-trivial!
	const inits = await import('./init/*.(js|ts|jsx|tsx)')
	await forArray(Object.keys(inits).sort()).executeSequentially(async key => {
		logger.group(`init/"${key}"`)
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
