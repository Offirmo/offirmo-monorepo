import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { loadꓽspec } from '@infinite-monorepo/load-spec'
import * as StateLib from '@infinite-monorepo/state'
import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'
import pluginꓽnvm from '@infinite-monorepo/plugin--nvm'
import type { Plugin } from '@infinite-monorepo/types'

/////////////////////////////////////////////////

const plugins: Array<Plugin> = [
	pluginꓽnvm,
	// TODO a plugin for all root files
]

async function apply() {
	console.log(`@infinite-monorepo/apply…`)

	////////////
	let state = StateLib.create()

	async function _propagate() {
		//dumpꓽanyⵧprettified('state', state)
		let node: Immutable<Node> | undefined
		while ((node = StateLib.getꓽnodesⵧnot_analyzed(state)[0])) {
			state = plugins.reduce((state, plugin) => {
				return plugin.onꓽnodeⵧdiscovered(state, node)
			}, state)
			state = StateLib.reportꓽnodeⵧanalyzed(state, node)
		}

		// TODO wait for all pending async funcs

		// TODO new row
		//dumpꓽanyⵧprettified('state', state)
	}

	////////////
	state = plugins.reduce((state, plugin) => {
		return plugin.onꓽload(state)
	}, state)
	await _propagate()

	////////////
	const spec = await loadꓽspec()
	state = StateLib.onꓽspec_loaded(state, spec)
	// TODO 1D plugin onꓽspec_loaded?
	await _propagate()

	////////////

	/*state = await plugins.reduce(async (acc, plugin) => {
		let state = await acc
		state = await plugin.onꓽload(state)
		return state
	}, Promise.resolve(state))*/

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
