import * as fs from 'node:fs/promises'
import assert from 'tiny-invariant'
import type { Immutable, AnyPath } from '@offirmo-private/ts-types'
import type { Node } from '@infinite-monorepo/types'
import { loadꓽspecⵧchainⵧraw } from '@infinite-monorepo/load-spec'
import * as StateLib from '@infinite-monorepo/state'
import pluginꓽgit from '@infinite-monorepo/plugin--git'
import pluginꓽnvm from '@infinite-monorepo/plugin--nvm'
import pluginꓽparcel from '@infinite-monorepo/plugin--parcel'
import pluginꓽbolt from '@infinite-monorepo/plugin--bolt'
import pluginꓽnpm from '@infinite-monorepo/plugin--npm'
import pluginꓽpnpm from '@infinite-monorepo/plugin--pnpm'
import pluginꓽeditorconfig from '@infinite-monorepo/plugin--editorconfig'
import type { State, Plugin } from '@infinite-monorepo/state'
import { ↆreadꓽfile } from '@infinite-monorepo/read-write-any-structured-file/read'
import { mergeꓽjson, ೱwriteꓽfile } from '@infinite-monorepo/read-write-any-structured-file/write'

/////////////////////////////////////////////////

const plugins: Array<Plugin> = [
	// TODO a way to include on-demand
	pluginꓽbolt,
	pluginꓽeditorconfig,
	pluginꓽgit,
	pluginꓽnpm,
	pluginꓽnvm,
	pluginꓽparcel,
	pluginꓽpnpm,
	// TODO plugins for everything!
]

function noop(state: Immutable<State>): Immutable<State> {
	return state
}

async function apply(from?: AnyPath) {
	console.log(`@infinite-monorepo/apply…`)

	////////////
	let state = StateLib.create()

	async function _propagate() {
		console.log('------------ propagating new infos… ------------')
		//dumpꓽanyⵧprettified('state', state)

		// wait for async tasks
		let prev = state
		do {
			do {
				prev = state
				state = await StateLib.resolveꓽasync(state)
			} while (prev !== state)

			prev = state
			let node: Immutable<Node> | undefined
			while ((node = StateLib.getꓽnodesⵧnew(state)[0])) {
				state = plugins.reduce((state, plugin) => {
					return (plugin.onꓽnodeⵧdiscovered ?? noop)(state, node)
				}, state)
				state = StateLib.reportꓽnodeⵧanalyzed(state, node)
			}

			do {
				prev = state
				state = await StateLib.resolveꓽasync(state)
			} while (prev !== state)
		} while (StateLib.getꓽnodesⵧnew(state).length)
	}

	////////////
	state = plugins.reduce((state, plugin) => {
		return (plugin.onꓽload ?? noop)(state)
	}, state)
	await _propagate()

	////////////
	const spec_chain = await loadꓽspecⵧchainⵧraw(from)
	state = StateLib.onꓽspec_chain_loaded(state, spec_chain)
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
	Object.entries(state.graphs.nodesⵧscm)
		.sort()
		.forEach(([, node]) => {
			state = plugins.reduce((state, plugin) => {
				return (plugin.onꓽapply ?? noop)(state, node)
			}, state)
		})
	Object.entries(state.graphs.nodesⵧworkspace)
		.sort()
		.forEach(([, node]) => {
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
					console.log(`- Writing exact file ${path}…`)
					ೱwriteꓽfile(path, spec.content as any, spec.manifest.format)
					break
				case 'present--containing':
					console.log(`- Augmenting file ${path}…`)
					const SSoT = true // XXX advanced!
					const ↆexisting_content =
						SSoT ? Promise.resolve({}) : ↆreadꓽfile(path, { format: spec.manifest.format })
					ↆexisting_content.then(
						content => {
							return ೱwriteꓽfile(
								path,
								mergeꓽjson(content, spec.content as any),
								spec.manifest.format,
							)
						},
						err => {
							if ((err as any)?.code !== 'ENOENT') {
								throw err
							}

							return ೱwriteꓽfile(path, spec.content as any, spec.manifest.format)
						},
					)
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
