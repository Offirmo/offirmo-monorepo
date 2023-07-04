import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import * as Cultivation from '../state--cultivation/index.js'
import { UState } from './types.js'
import { Sect } from '../generator--sect/src/index.js'
import { SectUID } from '../generator--sect/src/types.js'

/////////////////////////////////////////////////


function getꓽsectⵧby_uid(u_state: Immutable<UState>, uid: SectUID): Immutable<Sect> {
	const sect = Object.values(u_state.setting.sects).find(sect => sect.uid === uid)
	assert(!!sect, `getꓽsectⵧby_uid should never return null!`)
	return sect
}

function getꓽsectⵧcurrent(u_state: Immutable<UState>): null | Immutable<Sect> {
	const uid = u_state.cultivation.sectⵧcurrent‿uid

	if (uid === null)
		return null

	return getꓽsectⵧby_uid(u_state, uid)
}

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
		switch(Cultivation.getꓽcultivationⵧtype(u_state.cultivation)) {

			case 'mortal':
				return RichText.strong()
					.pushText('mortal cultivator')
					.done()

			case 'crippled':
				return RichText.inline_fragment()
					.pushStrong('crippled') // TODO red
					.pushText(' ')
					.pushStrong('immortal cultivator')
					.done()

			case 'none':
				return RichText.strong()
					.pushText('farmer') // TODO more starting occupations TODO sect servant
					.done()

			case 'immortal': {
				const current_sect = getꓽsectⵧcurrent(u_state)

				if (!current_sect) {
					return RichText.inline_fragment()
						.pushStrong('rogue') // TODO color
						.pushText(' ')
						.pushStrong('immortal cultivator')
						.done()
				}

				return RichText.inline_fragment()
					.pushStrong('immortal cultivator')
					.pushText(' from the ')
					.pushStrong(current_sect.name)
					.done()
			}
			default:
				throw new Error('Switch unhandled cultivation type!')
		}
		})())

	return recap.done()
}

/////////////////////////////////////////////////

export {
	getꓽrecap,
}
