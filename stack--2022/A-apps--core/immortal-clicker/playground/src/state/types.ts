import { Enum } from 'typescript-string-enums'

import { UUID } from '@offirmo-private/uuid'
import {
	BaseUState,
	BaseTState,
	BaseRootState,
} from '@offirmo-private/state-utils'

/////////////////////

interface UState extends BaseUState {
}

interface TState extends BaseTState {
}

interface State extends BaseRootState<UState, TState> {
	schema_version: number // yes it's redundant but very convenient for debugging in the console
}

/////////////////////

export {
	type UState,
	type TState,
	type State,
}

/////////////////////
