import { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { UState } from './types.js'

/////////////////////////////////////////////////

function getꓽrecap(u_state: Immutable<UState>): RichText.Document {
	const isNewGame = (u_state.revision === 0)
	/*
	if (isNewGame) {
		return RichText.inline_fragment()
			.pushText('You are an ')
			.pushStrong('otherworlder')
			.pushText(', an adventurer from another world…{{br}}')
			.pushText('Congratulations, you were chosen to enter the unknown realm of ')
			.pushStrong('Jaema')
			.pushText('!{{br}}')
			.pushText('Maybe were you just more courageous, cunning and curious than your peers?{{br}}')
			.pushText('But for now, let’s go on an adventure, for glory ⚔ and loot 📦 💰 !')
			.done()
	}
*/

	// name
	// cultivator or not
	// situation
	// challenge

	let recap = RichText.block_fragment()
		.pushText('You are ')

	// name
	recap.pushNode((() => {
		return RichText.strong()
			.pushInlineFragment(u_state.avatar.nameⵧlast, {
				id: 'nameⵧlast',
			})
			.pushText(' ')
			.pushInlineFragment(u_state.avatar.nameⵧfirst, {
				id: 'nameⵧfirst',
			})
			.done()
	})())

	// ...
	recap = recap.pushText(', a ')
		.pushInlineFragment('15', {
			id: 'age',
			classes: [],
		})
		.pushText(' years old ')
	recap.pushNode((() => {
			return RichText.strong()
				.pushText(' immortal cultivator from the XYZ sect')
				.done()
		})())

	return recap.done()
}

/////////////////////////////////////////////////

export {
	getꓽrecap,
}
