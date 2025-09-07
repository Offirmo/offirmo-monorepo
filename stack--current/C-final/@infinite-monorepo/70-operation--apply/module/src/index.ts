import * as fs from 'node:fs/promises'
import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { loadꓽspec } from '@infinite-monorepo/load-spec'
import * as StateLib from '@infinite-monorepo/state'
import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'
import pluginꓽnvm from '@infinite-monorepo/plugin--nvm'
import type { State, Plugin } from '@infinite-monorepo/state'
import { ೱwriteꓽfile } from '@infinite-monorepo/read-write-any-structured-file/write'

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
		console.log('------------ propagating new infos… ------------')
		//dumpꓽanyⵧprettified('state', state)

		let node: Immutable<Node> | undefined
		while ((node = StateLib.getꓽnodesⵧnew(state)[0])) {
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
	// TODO topological order!!!
	Object.entries(state.graph.nodesⵧall)
		.sort()
		.forEach(([path, node]) => {
			state = plugins.reduce((state, plugin) => {
				return plugin.onꓽapply(state, node)
			}, state)
		})

	await _propagate()

	////////////
	// Ok now let's apply
	console.log('About to apply...', state)
	// 1. clear all files
	// (TODO 1D)
	// 2. re-create files we explicitly requested
	Object.entries(state.output_files)
		.sort()
		.forEach(([path, spec]) => {
			switch (spec.intent) {
				case 'not-present':
					console.log(`- Removing file ${path}…`)
					fs.rm(path, { force: true })
					break
				case 'present--exact':
					console.log(`- Writing file ${path}…`)
					ೱwriteꓽfile(path, spec.content, spec.manifest.format)
			}
			// TODO
		})

	////////////
	console.log('DONE!', state)
	//dumpꓽanyⵧprettified('state', state)
}

/////////////////////////////////////////////////

export { apply }
