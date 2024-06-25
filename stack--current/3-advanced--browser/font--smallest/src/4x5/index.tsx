import { Thing, WithOnlinePresence, ThingWithOnlinePresence, Asset, Url‿str, registerꓽasset_usageⵧload } from '@offirmo-private/credits'
import AUTHOR from "@offirmo-private/credits/src/authors/vyznev/index.ts"

import './index.css'

/////////////////////////////////////////////////

// https://parceljs.org/recipes/image/#image-formats
const local_url: Url‿str = (new URL(
	'regular.ttf',
	import.meta.url
)).href

/////////////////////////////////////////////////

const THING: Thing = {
	description: 'CG pixel 4x5 font',
	author: AUTHOR,
	since‿y: 2017,
}
const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'https://fontstruct.com/fontstructions/show/1404171/cg-pixel-4x5'
}
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,
}
const ASSET: Asset = {
	...THINGⵧONLINE,
	type: 'font',
	local_url,
}

registerꓽasset_usageⵧload(ASSET)

/////////////////////////////////////////////////
