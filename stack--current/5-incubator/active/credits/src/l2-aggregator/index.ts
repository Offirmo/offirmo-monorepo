/* Code allowing to register an asset usage,
 * so that we can credit the creators
 * and showcase them by displaying an attribution in-app for certain major assets.
 */

import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { Asset } from '../1-types/types'

/////////////////////////////////////////////////

interface AssetStore {
	assetsⵧall: Set<Immutable<Asset>>
	assetsⵧrecents: Array<Immutable<Asset>>
}

const STORE: AssetStore = {
	assetsⵧall: new Set<Immutable<Asset>>(),
	assetsⵧrecents: [],
}

/////////////////////////////////////////////////

// "fire and forget"
// called by the asset file itself on load,
// whether it’s used or not
function registerꓽasset_usageⵧload(asset: Immutable<Asset>): void {
	console.log(`🖼️ now featuring a "${asset.type}" asset: ${asset.description}`)

	// TODO unique id
	// TODO improve duplicate detection?
	if (STORE.assetsⵧall.has(asset)) {
		console.warn(`🖼️ "${asset.type}" asset: ${asset.description} multiple load??`)
	}

	STORE.assetsⵧall.add(asset)
}

// "fire and forget"
// called by the user of the asset
// so that we can show "currently/recently" used assets
function registerꓽasset_usageⵧstart(asset: Immutable<Asset>): void {
	if (STORE.assetsⵧrecents.includes(asset))
		return

	STORE.assetsⵧall.add(asset)
	STORE.assetsⵧrecents.unshift(asset)
	STORE.assetsⵧrecents = STORE.assetsⵧrecents.slice(0, 12)
}

// "fire and forget"
// call is optional
function registerꓽasset_usageⵧend(asset: Immutable<Asset>): void {
	// TODO useful?
}

// return all currently registered assets
function getꓽassetsⵧall(): Immutable<Set<Immutable<Asset>>> {
	return STORE.assetsⵧall
}

// return the most recently used/loaded assets
function getꓽassetsⵧrecents(n = 12): Immutable<Array<Immutable<Asset>>> {
	return STORE.assetsⵧrecents
}

/////////////////////////////////////////////////

export * from '../1-types/types'
export {
	registerꓽasset_usageⵧload,
	registerꓽasset_usageⵧstart,
	registerꓽasset_usageⵧend,
	getꓽassetsⵧall,
	getꓽassetsⵧrecents,
}
