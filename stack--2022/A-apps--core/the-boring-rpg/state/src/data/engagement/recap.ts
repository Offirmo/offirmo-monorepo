import { Immutable} from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { UState } from '../../types.js'


function getꓽrecap(u_state: Immutable<UState>): RichText.Document {
	const isNewGame = (u_state.revision === 0)
	if (isNewGame) {
		return RichText.fragmentⵧinline()
			.pushText('You are an ')
			.pushStrong('otherworlder')
			.pushText(', an adventurer from another world…⎨⎨br⎬⎬')
			.pushText('Congratulations, you were chosen to enter the unknown realm of ')
			.pushStrong('Jaema')
			.pushText('!⎨⎨br⎬⎬')
			.pushText('Maybe were you just more courageous, cunning and curious than your peers?⎨⎨br⎬⎬')
			.pushText('But for now, let’s go on an adventure, for glory ⚔ and loot 📦 💰 !')
			.done()
	}

	return RichText.fragmentⵧblock()
		.pushText('You are ')
		.pushInlineFragment(u_state.avatar.name, {
			id: 'name',
			classes: [ 'avatar__name'],
		})
		.pushText(', the ')
		.pushInlineFragment(u_state.avatar.klass, {
			id: 'class',
			classes: ['avatar__class'],
		})
		.pushText(' from another world.⎨⎨br⎬⎬')
		.pushText('You are adventuring in the mysterious world of ')
		.pushStrong('Jaema')
		.pushText('…⎨⎨br⎬⎬')
		.pushStrong('For glory ⚔  and loot 📦 💰 !')
		.done()
}

export {
	getꓽrecap,
}
