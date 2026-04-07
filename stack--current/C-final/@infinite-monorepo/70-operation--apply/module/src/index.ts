import * as fs from 'node:fs/promises'
import path from "node:path"
import { styleText } from 'node:util'

import assert from '@monorepo-private/assert/v1'
import type {Immutable, PathⳇAbsolute, PathⳇAny} from '@monorepo-private/ts--types'
import type { Node } from '@infinite-monorepo/graph'
import { loadꓽspecⵧchainⵧraw } from '@infinite-monorepo/spec--load'
import * as StateLib from '@infinite-monorepo/state'
import pluginꓽaiᝍᝍagentsᝍᝍcoding from '@infinite-monorepo/plugin--ai--agents--coding'
import pluginꓽbolt from '@infinite-monorepo/plugin--bolt'
import pluginꓽchangelog from '@infinite-monorepo/plugin--changelog'
import pluginꓽeditorconfig from '@infinite-monorepo/plugin--editorconfig'
import pluginꓽgit from '@infinite-monorepo/plugin--git'
import pluginꓽjetbrains from '@infinite-monorepo/plugin--jetbrains'
import pluginꓽlicense from '@infinite-monorepo/plugin--license'
import pluginꓽmise from '@infinite-monorepo/plugin--mise'
import pluginꓽnpm from '@infinite-monorepo/plugin--npm'
import pluginꓽnvm from '@infinite-monorepo/plugin--nvm'
import pluginꓽoffirmo from '@infinite-monorepo/plugin--@offirmo'
import pluginꓽoxcᝍᝍoxfmt from '@infinite-monorepo/plugin--oxc--oxfmt'
import pluginꓽpackageᐧjson from '@infinite-monorepo/plugin--package-json'
import pluginꓽparcel from '@infinite-monorepo/plugin--parcel'
import pluginꓽpnpm from '@infinite-monorepo/plugin--pnpm'
import pluginꓽreadme from '@infinite-monorepo/plugin--readme'
import pluginꓽtsconfig from '@infinite-monorepo/plugin--tsconfig'
import pluginꓽyarnᝍᝍv1 from '@infinite-monorepo/plugin--yarn--v1'
import type { State, Plugin } from '@infinite-monorepo/state'
import { ↆreadꓽfile } from '@infinite-monorepo/read-write-any-structured-file/read'
import { mergeꓽjson, ೱwriteꓽfile } from '@infinite-monorepo/read-write-any-structured-file/write'

/////////////////////////////////////////////////

const plugins: Record<string, Plugin> = {
	// TODO a way to include on-demand
	pluginꓽaiᝍᝍagentsᝍᝍcoding,
	pluginꓽbolt,
	pluginꓽchangelog,
	pluginꓽeditorconfig,
	pluginꓽgit,
	pluginꓽjetbrains,
	pluginꓽlicense,
	pluginꓽmise,
	pluginꓽnpm,
	pluginꓽnvm,
	pluginꓽoffirmo,
	pluginꓽoxcᝍᝍoxfmt,
	pluginꓽpackageᐧjson,
	pluginꓽparcel,
	pluginꓽpnpm,
	pluginꓽreadme,
	pluginꓽtsconfig,
	pluginꓽyarnᝍᝍv1,
}

function noop(state: Immutable<State>): Immutable<State> {
	return state
}

async function apply(from?: PathⳇAny) {
	console.group(styleText('bold', `@infinite-monorepo/apply…`))

	////////////
	let state = StateLib.create()

	async function _propagate() {
		console.log(styleText('italic', '------------ propagating new infos… ------------'))
		//dumpꓽanyⵧprettified('state', state)

		// wait for async tasks
		let prev = state
		do {
			do {
				prev = state
				state = await StateLib.resolveꓽasync_operations(state)
			} while (prev !== state)

			prev = state
			let node: Immutable<Node> | undefined
			while (node = StateLib.getꓽnodesⵧnew(state)[0]) {
				// TODO 1D ensure no late discoveries
				console.group(`↳ onꓽnodeⵧdiscovered : [${styleText('yellow', node.type)}] ${styleText('gray', node?.path‿ar || '??')}`)

				state = Object.entries(plugins).reduce((state, [plugin__name, plugin]) => {
					if (!plugin.onꓽnodeⵧdiscovered) return state

					console.group(`↳ onꓽnodeⵧdiscovered [${styleText('blue', plugin__name)}]`)
					state = plugin.onꓽnodeⵧdiscovered(state, node)
					console.groupEnd()

					return state
				}, state)
				state = StateLib.reportꓽnodeⵧanalyzed(state, node)
				console.groupEnd()
			}

			do {
				prev = state
				state = await StateLib.resolveꓽasync_operations(state)
			} while (prev !== state)
		} while (StateLib.getꓽnodesⵧnew(state).length)
	}

	//////////// plugins onꓽload
	state = Object.entries(plugins).reduce((state, [plugin__name, plugin]) => {
		if (!plugin.onꓽload) return state

		console.group(`↳ onꓽload [${styleText('blue', plugin__name)}]`)
		state = plugin.onꓽload(state)
		console.groupEnd()

		return state
	}, state)
	await _propagate()

	//////////// load spec
	const spec_chain = await loadꓽspecⵧchainⵧraw(from)
	state = StateLib.onꓽspec_chain_loaded(state, spec_chain)
	// TODO 1D plugin onꓽspec_loaded?
	await _propagate()

	//////////// plugins onꓽapply (TODO improve)
	console.log(styleText('italic', '------------ plugins graphs discovery… ------------'))
	console.group(`↳ SCM graph`)
	Object.entries(state.graphs.nodesⵧscm)
		// TODO topological order!!!
		.sort()
		.forEach(([, node]) => {
			console.group(`↳ SCM node ${node.path‿ar}`)
			state = Object.entries(plugins).reduce((state, [plugin__name, plugin]) => {
				if (!plugin.onꓽapply) return state

				console.group(`↳ onꓽapply [${styleText('blue', plugin__name)}]`)
				state = plugin.onꓽapply(state, node)
				console.groupEnd()

				return state
			}, state)
			console.groupEnd()
		})
	console.groupEnd()

	console.group(`↳ Monorepo graph`)
	Object.entries(state.graphs.nodesⵧworkspace)
		// TODO topological order!!!
		.sort()
		.forEach(([, node]) => {
			console.group(`↳ monorepo node ${node.path‿ar}`)
			state = Object.entries(plugins).reduce((state, [plugin__name, plugin]) => {
				if (!plugin.onꓽapply) return state

				console.group(`↳ onꓽapply [${styleText('blue', plugin__name)}]`)
				state = plugin.onꓽapply(state, node)
				console.groupEnd()

				return state
			}, state)
			console.groupEnd()
		})
	console.groupEnd()

	await _propagate()

	////////////
	// Ok now let's apply
	console.log(styleText('italic', '------------ About to apply… ------------'))
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

				case 'present':
					console.log(`- Writing file if not exist ${path}…`)
					ensureFile(path, async () => {
						ೱwriteꓽfile(path, spec.content as any, spec.manifest.format)
					})
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

				case 'symlink': {
					console.log(`- Ensuring symlink ${path}…`)
					throw new Error('symlink not implemented')
					ensureSymlink("../AGENTS.md", ".claude/CLAUDE.md");
					break
				}

				default:
					assert(false, `Unsupported intent: ${spec.intent}!`)
			}
		})

	////////////
	console.log('DONE!')
	//dumpꓽanyⵧprettified('state', state)
}

/////////////////////////////////////////////////

async function ensureSymlink(target: string, linkPath: string) {
	await fs.mkdir(path.dirname(linkPath), { recursive: true });

	try {
		const stat = await fs.lstat(linkPath);

		if (stat.isSymbolicLink()) {
			const actual = await fs.readlink(linkPath);
			if (actual === target) {
				console.log("Symlink already exists with correct target, skipping.");
			} else {
				throw new Error(
					`Symlink exists but points to wrong target: expected "${target}", got "${actual}"`
				);
			}
		} else {
			throw new Error(`Path exists but is not a symlink: ${linkPath}`);
		}
	} catch (err) {
		if (err.code !== "ENOENT") throw err;
		await fs.symlink(target, linkPath);
		console.log(`Symlink created: ${linkPath} -> ${target}`);
	}
}

async function ensureFile(path: PathⳇAbsolute, onCreate: () => Promise<void>): Promise<void> {
	try {
		await fs.access(path);
	} catch {
		await onCreate();
	}
}

/////////////////////////////////////////////////

export { apply }
