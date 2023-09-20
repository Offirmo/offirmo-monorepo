import '@offirmo/universal-debug-api-node'

import * as State from '../../src/state'
import { render } from '../../src/view'
import { renderꓽBook, renderꓽBookInstance } from '../render--terminal'

import { MANUALⵧCULTIVATIONⵧQI_CONDENSATION } from './book--manual--qi_condensation'

/////////////////////////////////////////////////

let state = State.create('auto')
//render(state)

/////////////////////////////////////////////////

const manualⵧqi_condensationⵧnearby_sect: BookInstance = {
	book_uid: MANUALⵧCULTIVATIONⵧQI_CONDENSATION.uid,
	params: {
		'slotꓽsect': state.u_state.setting.sects['nearby'].name,
	}
}

/////////////////////////////////////////////////

renderꓽBookInstance(manualⵧqi_condensationⵧnearby_sect)

/*
renderꓽBook(
	MANUALⵧCULTIVATIONⵧQI_CONDENSATION,
	{
		resolver(id: string) {
			switch (id) {
				case 'slotꓽsect': {
					// TODO improve
					const sect = state.u_state.setting.sects['nearby']
					return { $content: sect.name}
				}
				default:
					break
			}

			return undefined
		}
	},
)
*/
