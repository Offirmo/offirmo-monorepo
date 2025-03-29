import { NumeratorDenominator } from 'fraction.ts'
import { BaseUState, BaseTState } from '@offirmo-private/state-utils'

/////////////////////

interface UState extends BaseUState {
	max_energy: number
	total_energy_consumed_so_far: number
}

interface TState extends BaseTState {
	available_energy: NumeratorDenominator
}

/////////////////////

export {
	type UState,
	type TState,
}

/////////////////////
