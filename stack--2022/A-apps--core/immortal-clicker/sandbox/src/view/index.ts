
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { dump_prettified_any } from '@offirmo-private/prettify-any'

import { getLogger } from '@offirmo/universal-debug-api-placeholder'
const root_logger = getLogger()
root_logger.setLevel('silly')


import { State } from '../state/index.js'

/////////////////////////////////////////////////

function render(state: Immutable<State>): void {
	console.log('------\n', state)
	const { avatar , setting, ...rest } = state.u_state
	root_logger.log('avatar', avatar)
	root_logger.log('setting', setting)
}

/////////////////////////////////////////////////

export {
	render,
}
