import { asap_but_out_of_immediate_execution } from '@offirmo-private/async-utils'
import { VERSION, BUILD_DATE } from '../build.json'

//import { CHANNEL } from './services/channel'

/////////////////////////////////////////////////

console.info(`%c The Boring RPG %cv${VERSION}%c${BUILD_DATE}`,
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: hsl(337, 16%, 28%); color: hsl(42, 100%, 87%); font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black; font-weight: bold;',
	'border-radius: 1em; padding: .1em .5em; margin-inline-end: 1ch; background-color: darkgrey; color: black;',
)

/////////////////////////////////////////////////

asap_but_out_of_immediate_execution(async () => {
	console.log('%c——————— end of immediate, synchronous, non-import code. ———————', "font-weight: bold;")

	const inits = await import('./services/init/*.ts')
	Object.keys(inits).sort().forEach(async (key) => {
		const init_fn = (await inits[key]()).default
		init_fn()
	})
})