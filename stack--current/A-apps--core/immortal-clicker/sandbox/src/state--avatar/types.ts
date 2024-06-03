
/////////////////////////////////////////////////

import { BiologicalSex } from '../torefine/types.js'
import { FirstName, LastName } from '../generator--name/src/index.js'

interface Avatar {
	sex: BiologicalSex
	nameⵧfirst: FirstName,
	nameⵧlast: LastName,
	nameⵧdao: string | undefined

	//birth‿year: number // TODO if useful

	ageⵧbiological: number
}

/////////////////////////////////////////////////

export {
	type Avatar,
}
