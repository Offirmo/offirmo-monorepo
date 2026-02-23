import { asap_but_out_of_immediate_execution, forArray } from '@monorepo-private/utils--async'
import { VERSION, BUILD_DATE } from '../entry-points/build.ts'
import './init/00-security.ts' // as early as possible, side effects expected

/////////////////////////////////////////////////

console.info(
	`%cWelcome to %cPWA debugger %cv${VERSION}%c${BUILD_DATE}`,
	'font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: #0047ab; color: white; font-weight: bold;',
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
		logger.trace(`init/"${key}"…`)
		const require = inits[key].js || inits[key].ts || inits[key].jsx || inits[key].tsx
		const exports = await require().catch(() => require()) // allow 1x retry
		const init_fn = exports.default
		await init_fn()
		logger.trace(`init/"${key}": done ✅`)
		logger.groupEnd()
	})
})
