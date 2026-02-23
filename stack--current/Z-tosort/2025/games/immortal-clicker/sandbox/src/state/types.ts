import {
	BaseUState,
	BaseTState,
	BaseRootState,
} from '@monorepo-private/state-utils'

import * as PRNGState from '@oh-my-rpg/state--prng'
import * as EngagementState from '@oh-my-rpg/state--engagement'

import * as CultivationState from '../state--cultivation/index.js'

import { Avatar } from '../state--avatar/types.js'
import { NuclearFamily } from '../generator--family--nuclear/index.js'
import { Sect } from '../generator--sect/src/index.js'

/////////////////////////////////////////////////

interface UState extends BaseUState {
	prng: PRNGState.State
	engagement: EngagementState.State

	avatar: Avatar

	cultivation: CultivationState.State

	setting: {
		//deal: {
			// what was given at birth
			// body type
			// soul type
		//}

		family: NuclearFamily,
		children_position: number,

		sects: {
			nearby: Sect,
		}
	}
	//engagement: EngagementState
	//inventory: InventoryState
	//meta: MetaState
	//wallet: WalletState
}

interface TState extends BaseTState {
}

interface State extends BaseRootState<UState, TState> {
	schema_version: number // yes it's redundant but very convenient for debugging in the console
}

/////////////////////////////////////////////////

export {
	type UState,
	type TState,

	type State,
}
