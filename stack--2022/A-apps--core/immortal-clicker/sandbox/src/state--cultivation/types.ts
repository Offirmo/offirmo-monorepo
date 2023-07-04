/////////////////////////////////////////////////

import { SectUID } from '../generator--sect/src/types.js'

/////////////////////////////////////////////////
// BY DEFINITION Cultivation = any self-improvement above natural state

/*interface MortalCultivation {
	physique: number
}

interface FoundationEstablishment {
	rank: number
	method: string | undefined
}*/


interface State {
	immortalᝍrankⵧmajor: number
	immortalᝍrankⵧminor: number

	sectⵧcurrent‿uid: null | SectUID
}

/////////////////////////////////////////////////

export {
	type State,
}
