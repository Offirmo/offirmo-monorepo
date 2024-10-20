import { type Immutable } from '@offirmo-private/ts-types'

import { ElementType, Item, ItemQuality, InventorySlot } from './types.js'
import { ITEM_SLOTS_TO_INT, ITEM_QUALITIES_TO_INT } from './consts.js'
import { create_element_base } from './element.js'


export function create_item_base(slot: InventorySlot, quality: ItemQuality = ItemQuality.common): Item {
	return {
		...create_element_base(ElementType.item),
		slot,
		quality,
	}
}

export function compare_items_by_slot(a: Immutable<Item>, b: Immutable<Item>): number {
	const rank_a = ITEM_SLOTS_TO_INT[a.slot]
	if (!Number.isInteger(rank_a))
		throw new Error('compare items by slots: unhandled slot! (A)')

	const rank_b = ITEM_SLOTS_TO_INT[b.slot]
	if (!Number.isInteger(rank_b))
		throw new Error('compare items by slots: unhandled slot! (B)')

	return rank_a! - rank_b!
}

export function compare_items_by_quality(a: Immutable<Item>, b: Immutable<Item>): number {
	const rank_a = ITEM_QUALITIES_TO_INT[a.quality]
	if (!Number.isInteger(rank_a))
		throw new Error('compare items by quality: unhandled quality! (A)')

	const rank_b = ITEM_QUALITIES_TO_INT[b.quality]
	if (!Number.isInteger(rank_b))
		throw new Error('compare items by quality: unhandled quality! (B)')

	return rank_a! - rank_b!
}
