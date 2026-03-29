import type { Immutable } from '@monorepo-private/ts--types'

import * as StateLib from '@infinite-monorepo/state'
import type { Plugin } from '@infinite-monorepo/state'

/////////////////////////////////////////////////

/////////////////////////////////////////////////

const PLUGIN: Plugin = {
	onꓽload(state: Immutable<StateLib.State>): Immutable<StateLib.State> {
		return state
	},
}

/////////////////////////////////////////////////

export default PLUGIN
