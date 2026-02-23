import { Thing, WithOnlinePresence, ThingWithOnlinePresence, Asset, registerꓽasset_usageⵧload } from '@monorepo-private/credits'
import AUTHOR from "@monorepo-private/credits/src/authors/LisadiKaprio/index.ts"

import { type Background } from '../../../types.ts'

/////////////////////////////////////////////////

// https://parceljs.org/recipes/image/#image-formats
const local_url = (new URL(
	'original.png?as=webp',
	import.meta.url
)).href

const BG: Background = {
	url: local_url,
	width: 1800,
	height: 1350,
	//focusesⵧhorizontal: [ .38, .87 ], TODO
	//focusesⵧvertical: [ .01, .99 ],
}

/////////////////////////////////////////////////

const THING: Thing = {
	description: 'Sunny Sky',
	author: AUTHOR,
	since‿y: 2020,
}
const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'https://lisadikaprio.itch.io/sunny-and-rainy-skies-2-backgrounds',
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
