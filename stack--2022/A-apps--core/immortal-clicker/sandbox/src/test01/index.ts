import '@offirmo/universal-debug-api-node'

import {
	create,
	join_sectꓽfirst,
} from '../state/index.js'
import { render } from '../view/index.js'


let state = create('auto')
render(state)

state = join_sectꓽfirst(state)
render(state)

/*
state = cultivate(state)
console.log(state)
*/


//
