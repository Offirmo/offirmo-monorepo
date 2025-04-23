import { Percentage } from '@offirmo-private/ts-types'
import { Url‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

interface Background {
	url: Url‿str
	width: number
	height: number
	focusesⵧhorizontal: Percentage[]
	focusesⵧvertical: Percentage[]

	// link to asset?
}

/////////////////////////////////////////////////

export {
	type Background,
}
