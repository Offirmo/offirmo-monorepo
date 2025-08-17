
import { loadꓽspec } from '@infinite-monorepo/load-spec'
import * as StateLib from '@infinite-monorepo/state'
import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'
import pluginꓽnvm from '@infinite-monorepo/plugin--nvm'
import type { Plugin } from '@infinite-monorepo/types'


/////////////////////////////////////////////////


async function apply() {
	console.log(`@infinite-monorepo/apply…`)

	////////////
	let state = StateLib.create()

	const spec = await loadꓽspec()
	state = StateLib.onꓽspec_loaded(state, spec)

	dumpꓽanyⵧprettified('state', state)

	////////////
	const plugins: Array<Plugin> = [
		pluginꓽnvm
	]
	plugins.forEach(plugin => {
		state = plugin.onꓽload(state)
	})

	// TODO all root files
	// TODO nvmrc

	////////////
	plugins.forEach(plugin => {
		state = plugin.onꓽapply(state)
	})

	dumpꓽanyⵧprettified('state', state)

	//console.log(`state=`, state)
}

/////////////////////////////////////////////////

console.log(`Hi!`)

await apply()
