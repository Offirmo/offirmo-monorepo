/////////////////////////////////////////////////
// BY DEFINITION Cultivation = any self-improvement above natural state


/*interface MortalCultivation {
	physique: number
}

interface FoundationEstablishment {
	rank: number
	method: string | undefined
}*/

interface Cultivation {
	rank: {
		major: number
		minor: number
	}
}

/////////////////////////////////////////////////

export {
	type Cultivation,
}
