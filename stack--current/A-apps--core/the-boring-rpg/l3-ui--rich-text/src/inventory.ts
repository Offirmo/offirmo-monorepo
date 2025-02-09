import type { Immutable } from '@offirmo-private/ts-types'
import {
	InventorySlot,
	Item,
	ITEM_SLOTS,
	ITEM_SLOTS_TO_INT,
} from '@tbrpg/definitions'

import {
	State as InventoryState,
	iterables_unslotted,
	getꓽitem_in_slot,
} from '@tbrpg/state--inventory'

import { type State as WalletState } from '@tbrpg/state--wallet'
import * as RichText from '@offirmo-private/rich-text-format'
import { appraise_power } from '@tbrpg/logic--shop'

import { render_item_short } from './items.js'
import { render_wallet } from './wallet.js'
import { RenderItemOptions } from './types.js'
import { DEFAULT_RENDER_ITEM_OPTIONS } from './consts.js'


// we want the slots sorted by types according to an arbitrary order
function render_equipment(inventory: Immutable<InventoryState>, options?: Immutable<RenderItemOptions>): RichText.Document {
	const $doc_list = RichText.listⵧunordered()
		.addClass('inventory--equipment')
		.done()

	ITEM_SLOTS.forEach((slot: InventorySlot) => {
		const item = getꓽitem_in_slot(inventory, slot)

		const $doc_item = item
			? render_item_short(item, options)
			: RichText.fragmentⵧinline().pushText('-').done()

		//const $doc_line = RichText.key_value(slot, $doc_item).done()
		const $doc_line = RichText.fragmentⵧinline()
			.pushText(slot)
			.pushText(': ')
			.pushNode($doc_item, {id: 'item'})
			.done()

		$doc_list.$sub[`000${ITEM_SLOTS_TO_INT[slot]}`.slice(-3)] = $doc_line
	})

	const $doc = RichText.fragmentⵧblock()
		.pushNode(RichText.heading().pushText('Active equipment:').done(), {id: 'header'})
		.pushNode($doc_list, {id: 'list'})
		.done()

	return $doc
}

// we want the slots sorted by types according to an arbitrary order
// = nothing to do, the inventory is auto-sorted
function render_backpack(inventory: Immutable<InventoryState>, options?: Immutable<RenderItemOptions>): RichText.Document {
	const builder = RichText.listⵧordered()
		.addClass('inventory--backpack')

	const misc_items: Item[] = Array.from(iterables_unslotted(inventory))
		.filter(i => !!i) as Item[]
	const item_count = misc_items.length

	const reference_powers: any = {}

	misc_items.forEach((i: Item) => {
		if (!reference_powers[i.slot]) {
			const item = getꓽitem_in_slot(inventory, i.slot)
			reference_powers[i.slot] = item ? appraise_power(item) : 0
		}

		builder.pushRawNode(render_item_short(i, {
			...options,
			reference_power: reference_powers[i.slot],
		}))
	})

	const $doc_list = builder.done()

	if (Object.keys($doc_list.$sub).length === 0) {
		// completely empty
		$doc_list.$type = RichText.NodeType.ul
		$doc_list.$sub['-'] = RichText.fragmentⵧinline().pushText('(empty)').done()
	}

	const $doc = RichText.fragmentⵧblock()
		.pushNode(RichText.heading().pushText(`Backpack: (${item_count}/${inventory.unslotted_capacity})`).done(), {id: 'header'})
		.pushNode($doc_list, {id: 'list'})
		.done()

	return $doc
}

function render_full_inventory(inventory: Immutable<InventoryState>, wallet: Immutable<WalletState>, options: Immutable<RenderItemOptions> = DEFAULT_RENDER_ITEM_OPTIONS): RichText.Document {
	const $doc = RichText.fragmentⵧblock()
		.pushNode(render_equipment(inventory, options), {id: 'equipped'})
		.pushNode(render_wallet(wallet), {id: 'wallet'})
		.pushNode(render_backpack(inventory, options), {id: 'backpack'})
		.done()

	//console.log(JSON.stringify($doc, null, 2))
	return $doc
}

export {
	render_backpack,
	render_equipment,
	render_full_inventory,
}
