/////////////////////////////////////////////////

import { SectUID } from '../generator--sect/src/types.js'

/////////////////////////////////////////////////
// BY DEFINITION Cultivation = any self-improvement above natural state
// +++ https://mangakakalot.com/chapter/xian_ni/chapter_22

interface QiCondensation {
	// https://xian-ni.fandom.com/wiki/Qi_Condensation

	layer: number // 0-9 or 0-15 whatever
	method: string | undefined
}

/*

talent

interface MortalCultivation {
	physique: number
	perseverance
	discipline
}

interface FoundationEstablishment {
	// https://xian-ni.fandom.com/wiki/Foundation_Establishment
	// true first step of Cultivation
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
