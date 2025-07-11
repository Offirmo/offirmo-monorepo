import type { Immutable } from '@offirmo-private/ts-types'
import { InventorySlot, type Item } from '@tbrpg/definitions'
import { type Armor } from '@tbrpg/logic--armors'
import { type Weapon } from '@tbrpg/logic--weapons'
import * as RichText from '@offirmo-private/rich-text-format'

import { render_armor_short, render_armor_detailed } from './items--armor.ts'
import { render_weapon_short, render_weapon_detailed } from './items--weapon.ts'
import { type RenderItemOptions } from './types.ts'
import { DEFAULT_RENDER_ITEM_OPTIONS } from './consts.ts'

/////////////////////////////////////////////////

function decorate_with_common_item_props(i: Immutable<Item>, doc: RichText.Document): RichText.Document {
	doc.$hints = doc.$hints || {}
	doc.$hints['uuid'] = i.uuid

	return doc
}

function render_item_short(i: Immutable<Item>, options: Immutable<RenderItemOptions> = DEFAULT_RENDER_ITEM_OPTIONS): RichText.Document {
	if (!i)
		throw new Error('render_item_short(): no item provided!')

	const doc: RichText.Document = (function auto() {
		switch (i.slot) {
			case InventorySlot.armor:
				return render_armor_short(i as Armor, options)
			case InventorySlot.weapon:
				return render_weapon_short(i as Weapon, options)
			default:
				throw new Error(`render_item_short(): don't know how to render a "${i.slot}" !`)
		}
	})()

	return decorate_with_common_item_props(i, doc)
}

function render_item_detailed(i: Immutable<Item>): RichText.Document {
	if (!i)
		throw new Error('render_item_detailed(): no item provided!')

	const doc: RichText.Document = (function auto() {
		switch (i.slot) {
			case InventorySlot.armor:
				return render_armor_detailed(i as Armor)
			case InventorySlot.weapon:
				return render_weapon_detailed(i as Weapon)
			default:
				throw new Error(`render_item_detailed(): don't know how to render a "${i.slot}" !`)
		}
	})()

	return decorate_with_common_item_props(i, doc)
}

/////////////////////////////////////////////////

export {
	render_item_short,
	render_item_detailed,
}
