import type { Immutable } from '@monorepo-private/ts--types'
import { type Monster } from '@tbrpg/logic--monsters'

import * as RichText from '@monorepo-private/rich-text-format'

/////////////////////////////////////////////////

function render_monster(m: Immutable<Monster>): RichText.Document {
	const $doc = RichText.fragmentⵧinline()
		.addClass('monster', 'monster--rank--' + m.rank)
		.pushText('⎨⎨level⎬⎬ ⎨⎨rank||Capitalize⎬⎬ ⎨⎨name||Capitalize⎬⎬')
		.pushRawNode(
			RichText.fragmentⵧinline().pushText('L') .pushText('' + m.level).done(),
			{id: 'level'},
		)
		.pushRawNode(
			RichText.fragmentⵧinline().addClass('rank--' + m.rank).pushText(m.rank).done(),
			{id: 'rank'},
		)
		.pushRawNode(
			RichText.fragmentⵧinline().addClass('monster__name').pushText(m.name).done(),
			{id: 'name'},
		)
		.addHints({ possible_emoji: m.possible_emoji })
		.done()

	return $doc
}

export {
	render_monster,
}
