import type { Immutable } from '@offirmo-private/ts-types'
import { type Builder } from '@offirmo-private/rich-text-format'
import { InventorySlot } from '@tbrpg/definitions'
import {
	MAX_ENHANCEMENT_LEVEL,
	type Armor,
	getꓽdamage_reduction_interval as get_armor_damage_reduction_interval,
} from '@tbrpg/logic--armors'
import * as RichText from '@offirmo-private/rich-text-format'
import { i18n_messages as I18N_ARMORS } from '@tbrpg/logic--armors'
import { appraise_power, appraise_sell_value } from '@tbrpg/logic--shop'

import type { RenderItemOptions } from './types.ts'
import { DEFAULT_RENDER_ITEM_OPTIONS } from './consts.ts'

/////////////////////////////////////////////////

function push_quality(builder: Builder, i: Immutable<Armor>): Builder {
	const $node = RichText.fragmentⵧinline().pushText(i.quality).done()
	return builder.pushNode($node, {id: 'quality'})
}

function push_values(builder: Builder, i: Immutable<Armor>, options: Immutable<{short: boolean}> = {short: false}): Builder {
	const [min, max] = get_armor_damage_reduction_interval(i)
	const $node = RichText.fragmentⵧinline()
		.addClass('item--values')
		.pushText(options.short ? `[${min} - ${max}]` : `absorbs damage: ${min} - ${max}`)
		.done()
	return builder.pushNode($node, {id: 'values'})
}

function push_power(builder: Builder, i: Immutable<Armor>, options: Immutable<{short?: boolean | undefined, reference_power?: number | undefined}> = {short: false}): Builder {
	const power = appraise_power(i)

	if (!options.short) {
		const $node = RichText.fragmentⵧinline()
			.addClass('item--power')
			.pushText(`${power}`)
			.done()
		builder.pushNode($node, {id: 'power'})
	}

	if (options.reference_power) {
		if (power > options.reference_power) {
			const $node = RichText.fragmentⵧinline()
				.addClass('comparison--better')
				.pushText('⬆')
				.done()
			builder.pushNode($node, {id: 'comparision'})
		}
		else if (power < options.reference_power) {
			const $node = RichText.fragmentⵧinline()
				.addClass('comparison--worse')
				.pushText('⬇')
				.done()
			builder.pushNode($node, {id: 'comparision'})
		}
		else if (power < options.reference_power) {
			const $node = RichText.fragmentⵧinline()
				.addClass('comparison--equal')
				.pushText('=')
				.done()
			builder.pushNode($node, {id: 'comparision'})
		}
	}

	return builder
}

function push_sell_value(builder: Builder, i: Immutable<Armor>): Builder {
	const $node = RichText.fragmentⵧinline()
		.addClass('value--coin')
		.pushText(`${appraise_sell_value(i)}`)
		.done()
	return builder.pushNode($node, {id: 'sell-value'})
}

/////////////////////

function render_armor_name(i: Immutable<Armor>): RichText.Document {
	const _ = I18N_ARMORS['en'] as any
	const b = _.armor.base[i.base_hid]
	const q1 = _.armor.qualifier1[i.qualifier1_hid]
	const q2 = _.armor.qualifier2[i.qualifier2_hid]

	const builder = RichText.fragmentⵧinline()
		.addClass('item__name')
		.pushText(
			q2.startsWith('of')
				? '⎨⎨q1|Capitalize⎬⎬ ⎨⎨base|Capitalize⎬⎬ ⎨⎨q2|Capitalize⎬⎬'
				: '⎨⎨q2|Capitalize⎬⎬ ⎨⎨q1|Capitalize⎬⎬ ⎨⎨base|Capitalize⎬⎬',
		)

	if (i.enhancement_level) {
		const $node_enhancement = RichText.fragmentⵧinline()
			.addClass('item--enhancement')
			.pushText(`+${i.enhancement_level}`)
			.done()

		builder.pushText(' ').pushNode($node_enhancement, {id: 'enhancement'})
	}

	const $doc = builder.done()
	$doc.$sub['base'] = RichText.fragmentⵧinline().pushText(b).done()
	$doc.$sub['q1'] = RichText.fragmentⵧinline().pushText(q1).done()
	$doc.$sub['q2'] = RichText.fragmentⵧinline().pushText(q2).done()

	return $doc
}

function render_armor_short(i: Immutable<Armor>, options: Immutable<RenderItemOptions> = DEFAULT_RENDER_ITEM_OPTIONS): RichText.Document {
	if (i.slot !== InventorySlot.armor)
		throw new Error(`render_armor_short(): can't render a ${i.slot}!`)

	const builder = RichText.fragmentⵧinline()

	if (options.display_quality) {
		push_quality(builder, i)
		builder.pushText(' ')
	}

	builder.pushNode(render_armor_name(i), {id: 'name'})

	if (options.display_values) {
		builder.pushText(' ')
		push_values(builder, i, {short: true})
	}

	if (options.display_power || options.reference_power) {
		builder.pushText(' ')
		push_power(builder, i, {
			short: !options.display_power,
			reference_power: options.reference_power,
		})
	}

	if (options.display_sell_value) {
		builder.pushText(' ')
		push_sell_value(builder, i)
	}

	return builder
		.addClass('item', 'item--' + i.slot, 'item--quality--' + i.quality)
		.done()
}

function render_armor_detailed(i: Immutable<Armor>, reference_power?: number): RichText.Document {
	if (i.slot !== InventorySlot.armor)
		throw new Error(`render_armor_detailed(): can't render a ${i.slot}!`)

	const $node_title = render_armor_short(i)

	const $node_enhancement = RichText.fragmentⵧinline()
		.addClass('item--enhancement')
		.pushText(`${i.enhancement_level}/${MAX_ENHANCEMENT_LEVEL}`)
		.done()

	const builder = RichText.fragmentⵧblock()
		.pushNode($node_title, {id: 'title'})
		.pushLineBreak()

	builder.pushText('Power: ')
	push_power(builder, i, {reference_power})
	builder.pushLineBreak()

	builder.pushText('quality: ')
	push_quality(builder, i)
	builder.pushLineBreak()

	builder
		.pushText('enhancement: ')
		.pushNode($node_enhancement, {id: 'enhancement'})
		.pushLineBreak()

	push_values(builder, i)
	builder.pushLineBreak()

	builder.pushText('Sell value: ')
	push_sell_value(builder, i)

	return builder.done()
}

/////////////////////////////////////////////////

export {
	render_armor_short,
	render_armor_detailed,
}
