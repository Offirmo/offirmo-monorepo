import '@offirmo/universal-debug-api-node'

import * as State from '../state/index.js'
import { render } from '../view/index.js'


let state = State.create('auto')
render(state)

state = State.join_sectꓽfirst(state)
render(state)

state = State.cultivate(state)
render(state)

state = State.attempt_breakthrough(state)
render(state)
