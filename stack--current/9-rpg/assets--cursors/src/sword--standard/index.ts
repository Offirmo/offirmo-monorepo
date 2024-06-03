import { Thing, WithOnlinePresence, ThingWithOnlinePresence, registerꓽasset_usageⵧload } from '@offirmo-private/credits'
import AUTHOR from "@offirmo-private/credits/src/authors/MapleLeaf68/index.ts"

import './style.css'

const THING: Thing = {
	description: 'Sword cursor',
	author: AUTHOR,
	since‿y: 2015,
}
const ONLINE_PRESENCE: WithOnlinePresence = {
	urlⵧcanonical: 'http://www.rw-designer.com/cursor-detail/79261'
}
const THINGⵧONLINE: ThingWithOnlinePresence = {
	...THING,
	...ONLINE_PRESENCE,
}

registerꓽasset_usageⵧload(THINGⵧONLINE)
