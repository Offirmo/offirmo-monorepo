import { Thing, WithOnlinePresence, ThingWithOnlinePresence, Asset, registerꓽasset_usageⵧload } from '@offirmo-private/credits'
import AUTHOR from "@offirmo-private/credits/src/authors/DigitalMoons/index.ts"

import { type Background } from '../../../types.ts'

/////////////////////////////////////////////////

// https://parceljs.org/recipes/image/#image-formats
const local_url = (new URL(
	'original.png?as=webp&width=1920',
	import.meta.url
)).href

const BG: Background = {
	url: local_url,
	width: 1920,
	height: 1080,
	//focusesⵧhorizontal: [ .38, .87 ], TODO
	//focusesⵧvertical: [ .01, .99 ],
}

/////////////////////////////////////////////////

const THING: Thing = {
	description: 'Forest Background (Seamless Parallax)',
	author: AUTHOR,
	since‿y: 2020,
}
const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'https://digitalmoons.itch.io/parallax-forest-background',
}
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,
}
const ASSET: Asset = {
	...THINGⵧONLINE,
	type: 'background',
	local_url,
}

registerꓽasset_usageⵧload(ASSET)

/////////////////////////////////////////////////

export default BG