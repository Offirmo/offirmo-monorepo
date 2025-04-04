import { Url‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

interface HeroIllustration {
	url: Url‿str
	width: number
	height: number
	avatar__viewport: [ x: number, y: number, width: number, height: number]
}

/////////////////////////////////////////////////

export {
	type HeroIllustration,
}
