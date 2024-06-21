import { Thing, WithOnlinePresence, ThingWithOnlinePresence, Asset, registerꓽasset_usageⵧload } from '@offirmo-private/credits'
import AUTHOR from "@offirmo-private/credits/src/authors/AlbertWeand/index.ts"

import { type Background } from '../../../types.ts'

/////////////////////////////////////////////////

// https://parceljs.org/recipes/image/#image-formats
const asset‿url = new URL(
	'original.png?as=webp&width=1920',
	import.meta.url
);

const BG: Background = {
	url: asset‿url.href,
	width: 1920,
	height: 1080,
	focusesⵧhorizontal: [ .38, .87 ],
	focusesⵧvertical: [ .01, .99 ],
}

/////////////////////////////////////////////////

const THING: Thing = {
	description: 'Adventurers fantasy illustration',
	author: AUTHOR,
	since‿y: 2021,
}
const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'https://www.offirmo.net/open-source/adventurers/index.html' // TODO broken
}
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,
}
const ASSET: Asset = {
	...THINGⵧONLINE,
	type: 'background',
	local_url: asset‿url.href,
}

registerꓽasset_usageⵧload(ASSET)

/////////////////////////////////////////////////

export default BG
