/////////////////////

import { type UUID } from '@offirmo-private/uuid'
import type { Immutable } from '@offirmo-private/ts-types'

import { InventorySlot } from '@tbrpg/definitions'
import { type Armor } from '@tbrpg/logic--armors'
import { type Weapon } from '@tbrpg/logic--weapons'

import {
	type Item,
	type State,
} from './types.ts'

/////////////////////

function is_full(state: Immutable<State>): boolean {
	return (state.unslotted.length >= state.unslotted_capacity)
}

function get_equipped_item_count(state: Immutable<State>): number {
	return Object.values(state.slotted)
		.filter(v => !!v)
		.length
}

function get_unequipped_item_count(state: Immutable<State>): number {
	return state.unslotted.length
}

function get_item_count(state: Immutable<State>): number {
	return get_equipped_item_count(state) + get_unequipped_item_count(state)
}

function get_unslotted_item(state: Immutable<State>, uuid: UUID): Immutable<Item> | null {
	const item: Item | undefined | null = state.unslotted.find(i => i.uuid === uuid)
	return item ? item : null
}

function getꓽitem(state: Immutable<State>, uuid: UUID): Immutable<Item> | null {
	let item: Item | undefined | null = get_unslotted_item(state, uuid)
	item = item || Object.values(state.slotted).find(i => !!i && i.uuid === uuid)
	return item ? item : null
}

function getꓽitem_in_slot(state: Immutable<State>, slot: InventorySlot): Immutable<Item> | null {
	return (state.slotted as { [k: string]: Item})[slot] || null
}
function get_slotted_armor(state: Immutable<State>): Immutable<Armor> | null {
	return state.slotted[InventorySlot.armor] || null
}
function get_slotted_weapon(state: Immutable<State>): Immutable<Weapon> | null {
	return state.slotted[InventorySlot.weapon] || null
}
/*
function get_typed_item_in_slot(state: Immutable<State>, slot: InventorySlot): State['slotted'][keyof State['slotted']] | null {
	switch(slot) {
		case InventorySlot.armor:
			return state.slotted[InventorySlot.armor] || null
		case InventorySlot.weapon:
			return state.slotted[InventorySlot.weapon] || null
		default:
			return null
	}
}
*/

function* iterables_unslotted(state: Immutable<State>) {
	yield* state.unslotted
}

/////////////////////

export {
	is_full,
	get_equipped_item_count,
	get_unequipped_item_count,
	get_item_count,
	get_unslotted_item,
	getꓽitem,
	getꓽitem_in_slot,
	get_slotted_armor,
	get_slotted_weapon,
	iterables_unslotted,
}

/////////////////////
