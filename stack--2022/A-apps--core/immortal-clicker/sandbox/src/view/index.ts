import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { getLogger } from '@offirmo/universal-debug-api-placeholder'
const root_logger = getLogger()
root_logger.setLevel('silly')

import * as RichText from '@offirmo-private/rich-text-format'
import renderⵧto_ansi from '@offirmo-private/rich-text-format--to-terminal'

import * as State from '../state/index.js'
import { renderⵧgeneric } from './generic.js'


/////////////////////////////////////////////////

function render(state: Immutable<State.State>): void {
	console.log('------')

	let text: RichText.Node = State.getꓽrecap(state.u_state)
	console.log(renderⵧto_ansi(text))

	renderⵧgeneric(state)
//	const { avatar , setting, ...rest } = state.u_state
	//root_logger.log('avatar', avatar)
	//root_logger.log('setting', setting)
}

/////////////////////////////////////////////////

export {
	render,
}
