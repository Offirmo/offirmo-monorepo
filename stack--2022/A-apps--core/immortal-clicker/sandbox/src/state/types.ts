import {
	BaseUState,
	BaseTState,
	BaseRootState,
} from '@offirmo-private/state-utils'
import { State as PRNGState } from '@oh-my-rpg/state-prng'

import { Avatar } from '../state--avatar/types.js'
import { NuclearFamily } from '../generator--family--nuclear/index.js'

/////////////////////////////////////////////////

interface UState extends BaseUState {
	prng: PRNGState

	avatar: Avatar

	setting: {
		//deal: {
			// what was given at birth
			// body type
			// soul type
		//}

		family: NuclearFamily,
		children_position: number,
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
