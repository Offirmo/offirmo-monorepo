import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { getLogger } from '@offirmo/universal-debug-api-placeholder'
const root_logger = getLogger()
root_logger.setLevel('silly')

import * as RichText from '@offirmo-private/rich-text-format'
import { to_ansi } from '@offirmo-private/rich-text-format--to-ansi'

import * as State from '../state/index.js'
import { renderⵧgeneric } from './generic.js'


/////////////////////////////////////////////////

function render(state: Immutable<State.State>): void {
	console.log('------')

	let text: RichText.Node = State.getꓽrecap(state.u_state)
	console.log(to_ansi(text))

	renderⵧgeneric(state)
//	const { avatar , setting, ...rest } = state.u_state
	//root_logger.log('avatar', avatar)
	//root_logger.log('setting', setting)
}

/////////////////////////////////////////////////

export {
	render,
}
