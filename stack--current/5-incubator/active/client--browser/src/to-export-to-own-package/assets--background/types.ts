import { Url‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

interface Background {
	url: Url‿str
	width: number
	height: number
	alignment‿pct: { x: number, y: number }
	alignmentⵧalt‿pct?: { x: number, y: number }
}

/////////////////////////////////////////////////

export {
	type Background,
}
