import * as semver from 'semver'
import type { Immutable } from '@offirmo-private/ts-types'
import { type Node } from '@infinite-monorepo/types'
import type { State, Plugin } from '@infinite-monorepo/state'
import * as StateLib from '@infinite-monorepo/state'
import { manifestꓽpackageᐧjson } from '@infinite-monorepo/plugin--npm'

/////////////////////////////////////////////////

const pluginꓽbolt: Plugin = {
	onꓽload(state: Immutable<State>): Immutable<State> {
		state = StateLib.declareꓽfile_manifest(state, manifestꓽpackageᐧjson)

		return state
	},

	onꓽnodeⵧdiscovered(state: Immutable<State>, node: Immutable<Node>): Immutable<State> {
		if (node.type !== 'workspace') return state

		state = StateLib.requestꓽfactsⵧabout_file(
			state,
			manifestꓽpackageᐧjson,
			node,
			(state, content) => {},
		)

		return state
	},

	// TODO on end of propagation?
}

/////////////////////////////////////////////////

export default pluginꓽbolt
export { pluginꓽbolt }
