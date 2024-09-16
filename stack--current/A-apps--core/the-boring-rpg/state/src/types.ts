import { Enum } from 'typescript-string-enums'

import { UUID } from '@offirmo-private/uuid'
import {
	BaseUState,
	BaseTState,
	BaseRootState,
} from '@offirmo-private/state-utils'

import { Weapon } from '@tbrpg/logic-weapons'
import { Armor } from '@tbrpg/logic-armors'
import { Monster } from '@tbrpg/logic-monsters'

import { type State as CharacterState } from '@tbrpg/state--character'
import { type State as InventoryState } from '@tbrpg/state--inventory'
import { type State as WalletState } from '@tbrpg/state--wallet'
import { type State as PRNGState } from '@oh-my-rpg/state--prng'
import {
	UState as EnergyUState,
	TState as EnergyTState,
} from '@tbrpg/state--energy'
import { type State as EngagementState } from '@oh-my-rpg/state--engagement'
import { type State as CodesState } from '@oh-my-rpg/state--codes'
import { type State as AchievementsState } from '@tbrpg/state--achievements'
import { type State as MetaState } from '@oh-my-rpg/state--meta'
import { type ResolvedAdventure } from '@tbrpg/logic--adventure--resolved'

/////////////////////

const GainType = Enum(
	// Note: must match properties in Adventure['gains']
	'level',
	'health',
	'mana',
	'strength',
	'agility',
	'charisma',
	'wisdom',
	'luck',
	'coin',
	'token',
	'weapon',
	'armor',
	'improvementⵧweapon',
	'improvementⵧarmor',
)
type GainType = Enum<typeof GainType> // eslint-disable-line no-redeclare


interface ResolvedAdventure {
	readonly uuid: UUID
	hid: string
	good: boolean
	encounter: Monster | null,
	gains: {
		level: number
		health: number
		mana: number
		strength: number
		agility: number
		charisma: number
		wisdom: number
		luck: number
		coin: number
		token: number
		weapon: null | Weapon
		armor: null | Armor
		improvementⵧweapon: boolean,
		improvementⵧarmor: boolean,
	}
}
/////////////////////////////////////////////////

interface UState extends BaseUState {
	// core
	avatar: CharacterState
	energy: EnergyUState,
	inventory: InventoryState
	progress: AchievementsState
	wallet: WalletState
	last_adventure: ResolvedAdventure | null

	// technical
	prng: PRNGState
	engagement: EngagementState

	// meta = growth etc.
	meta: MetaState
	codes: CodesState
}

interface TState extends BaseTState {
	energy: EnergyTState,
}

interface State extends BaseRootState<UState, TState> {
	schema_version: number // yes it's redundant but very convenient for debugging in the console
}

/////////////////////////////////////////////////

export {
	GainType,
	type ResolvedAdventure,

	type UState,
	type TState,

	type State,
}

/////////////////////
