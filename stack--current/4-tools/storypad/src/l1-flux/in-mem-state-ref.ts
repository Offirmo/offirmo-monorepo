
import * as InMemState from './state--in-mem'

/////////////////////////////////////////////////

let stateⵧin_mem: InMemState.State = InMemState.create()

// DO NOT USE, only for the flux
function _getꓽstateⵧin_mem(): InMemState.State {
	return stateⵧin_mem
}
function _setꓽstateⵧin_mem(s: InMemState.State) {
	stateⵧin_mem = s
}

/////////////////////////////////////////////////

export {
	_getꓽstateⵧin_mem,
	_setꓽstateⵧin_mem,
}
