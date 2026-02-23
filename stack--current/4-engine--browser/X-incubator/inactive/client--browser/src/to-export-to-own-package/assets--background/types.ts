import { Percentage } from '@monorepo-private/ts--types'
import { Url‿str } from '@monorepo-private/ts--types--web'

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
