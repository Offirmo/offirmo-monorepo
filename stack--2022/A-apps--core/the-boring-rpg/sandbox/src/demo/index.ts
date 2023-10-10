import * as State from '@tbrpg/state'
import * as RRT from '@tbrpg/ui--rich-text'
import * as RichText from '@offirmo-private/rich-text-format'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import '../services/misc.js'

import { renderꓽstateⵧprettified_text } from '../view/offirmo-state/generic--to-text.js'
import { renderꓽstateⵧrich_text } from '../view/offirmo-state/generic--to-rich-text.js'

/////////////////////////////////////////////////

let state = State.create()

//console.log('/////////////////////////////////////////////////')
//console.log(state)

//console.log('/////////////////////////////////////////////////')
//console.log(prettifyꓽjson(state))

console.log('/////////////////////////////////////////////////')
console.log(renderꓽstateⵧprettified_text(state))

console.log('/////////////////////////////////////////////////')
const $doc = renderꓽstateⵧrich_text(state, {

})
console.log(to_terminal($doc))

console.log('/////////////////////////////////////////////////')
console.log('Actions:', RichText.renderⵧto_actions($doc))
