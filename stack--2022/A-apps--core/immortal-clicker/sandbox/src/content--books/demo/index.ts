import '@offirmo/universal-debug-api-node'

import * as State from '../../state/index.js'
import { renderꓽBook } from '../view.js'
import { render } from '../../view/index.js'

import { MANUALⵧCULTIVATIONⵧQI_CONDENSATION } from './book--manual--qi_condensation.js'

let state = State.create('auto')
//render(state)

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
