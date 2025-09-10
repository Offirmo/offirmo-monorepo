import * as fs from 'node:fs/promises'
import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { loadꓽspec } from '@infinite-monorepo/load-spec'
import * as StateLib from '@infinite-monorepo/state'
import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'
import pluginꓽgit from '@infinite-monorepo/plugin--git'
import pluginꓽnvm from '@infinite-monorepo/plugin--nvm'
import pluginꓽparcel from '@infinite-monorepo/plugin--parcel'
import type { State, Plugin, FileOutputPresent, FileOutputAbsent } from '@infinite-monorepo/state'
import { ೱwriteꓽfile } from '@infinite-monorepo/read-write-any-structured-file/write'

/////////////////////////////////////////////////

const plugins: Array<Plugin> = [
	// TODO a way to include on-demand
	pluginꓽgit,
	pluginꓽnvm,
	pluginꓽparcel,
	// TODO a plugin for all root files!
]

function noop(state: Immutable<State>): Immutable<State> {
	return state
}

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
				return (plugin.onꓽnodeⵧdiscovered ?? noop)(state, node)
			}, state)
			state = StateLib.reportꓽnodeⵧanalyzed(state, node)
		}

		// TODO wait for all pending async funcs

		// TODO new row
		//dumpꓽanyⵧprettified('state', state)
	}

	////////////
	state = plugins.reduce((state, plugin) => {
		return (plugin.onꓽload ?? noop)(state)
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
				return (plugin.onꓽapply ?? noop)(state, node)
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
				case 'present--containing':
					console.log(`- Writing file ${path}…`)
					ೱwriteꓽfile(path, spec.content, spec.manifest.format)
					break
				default:
					assert(false, `Unsupported intent: ${spec.intent}!`)
			}
		})

	////////////
	console.log('DONE!')
	//dumpꓽanyⵧprettified('state', state)
}

/////////////////////////////////////////////////

export { apply }
