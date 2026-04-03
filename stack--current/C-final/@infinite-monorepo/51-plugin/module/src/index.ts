import type { Immutable } from '@monorepo-private/ts--types'
import type { Node } from '@infinite-monorepo/graph'
import * as StateLib from '@infinite-monorepo/state'

/////////////////////////////////////////////////

export interface Plugin {
	// on plugin load
	onꓽload?: (state: Immutable<StateLib.State>) => Immutable<StateLib.State>

	// to gather facts (and not opinions!)
	onꓽnodeⵧdiscovered?: (
		state: Immutable<StateLib.State>,
		node: Immutable<Node>,
	) => Immutable<StateLib.State>

	// to reach the ideal state (file outputs)
	onꓽapply?: (state: Immutable<StateLib.State>, node: Immutable<Node>) => Immutable<StateLib.State>
}
