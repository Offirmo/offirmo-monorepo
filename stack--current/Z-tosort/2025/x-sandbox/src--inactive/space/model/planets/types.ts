import assert from 'tiny-invariant'
import { type Immutable } from '@monorepo-private/ts--types'

/////////////////////////////////////////////////



// a single, tightly bound, contiguous entity
// https://en.wikipedia.org/wiki/Astronomical_object
interface CelestialBody {
	name: {
		[catalog_id: string]: string,
	},
}

interface Star extends CelestialBody {
}

interface Planet extends CelestialBody {

	archetype:
		| 'earthlike',

	civilization:
		| 'none'
		| {
			/*first_contact:
				| 'none'
				| 'hidden'
				| 'official'*/
			// TODO related to pictures
		}

	tone:
		| 'light'
		| 'neutral'
		| 'dark'
}

interface Moon extends CelestialBody {

}


interface Asteroid extends CelestialBody {

}

/*
interface StarSystem {
	name: {
		[catalog_id: string]: string,
	},

	stars: Star[] // ordered
	planets: Planet[] // ordered
}*/

/////////////////////////////////////////////////

// complex, less cohesively bound structure, which may consist of multiple bodies or even other objects with substructures.
interface CelestialObject {

}

/////////////////////////////////////////////////

export {
	type Planet,
}
