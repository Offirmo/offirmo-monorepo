import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { getLogger } from '@offirmo/universal-debug-api-placeholder'
const root_logger = getLogger()
root_logger.setLevel('silly')


import { State } from '../state/index.js'
import { renderⵧgeneric } from './generic.js'


/////////////////////////////////////////////////

function render(state: Immutable<State>): void {
	renderⵧgeneric(state)
//	console.log('------\n', state)
//	const { avatar , setting, ...rest } = state.u_state
	//root_logger.log('avatar', avatar)
	//root_logger.log('setting', setting)
}

/////////////////////////////////////////////////

export {
	render,
}
