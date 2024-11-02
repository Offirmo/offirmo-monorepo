import { type Immutable} from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { type EngagementTemplate } from '@oh-my-rpg/state--engagement'
import { type HypermediaContentType } from '@tbrpg/definitions'

import { EngagementTemplateKey } from './types.js'

/////////////////////////////////////////////////

// TODO review good idea to centralize??
export function getꓽengagement_template(key: EngagementTemplateKey): EngagementTemplate<HypermediaContentType> {
	switch(key) {
		/*
			case EngagementKey['just-some-text']:
				return RichText.fragmentⵧblock()
					.pushText(params.text)
					.done()

			case EngagementKey['hello_world--flow']:
			case EngagementKey['hello_world--aside']:
			case EngagementKey['hello_world--warning']:
				return RichText.fragmentⵧblock()
					.pushText('[TEST] Hello, ')
					.pushInlineFragment(params.name || 'world', {id: 'name'})
					.pushText('!')
					.done()

			// TODO is this one really useful?? a good UI should not need it
			case EngagementKey['tip--first_play']:
				return RichText.fragmentⵧblock()
					.pushStrong('Tip: ')
					.pushText('Select ')
					.pushStrong('play')
					.pushText(' to start adventuring!')
					.done()

			case EngagementKey['code_redemption--failed']:
				return RichText.fragmentⵧblock()
					.pushStrong('Error: This code is either non-existing or non redeemable at the moment.')
					.done()

			case EngagementKey['code_redemption--succeeded']:
				return RichText.fragmentⵧblock()
					.pushWeak('Code successfully redeemed.')
					.done()

			case EngagementKey['achievement-unlocked']:
				return RichText.fragmentⵧblock()
					.pushStrong('🏆 Achievement unlocked:')
					.pushLineBreak()
					.pushText(`“${params.icon} ${params.name}“`)
					.done()

				{
					type: EngagementType.aside,
					key: EngagementKey['achievement-unlocked'],
				},
				{
					semantic_level: 'success',
					auto_dismiss_delay_ms: 7_000, // TODO magic number!!
					icon,
					name,
				}

			case EngagementKey['reborn']:
				return RichText.fragmentⵧblock()
					.pushStrong('You got reborn')
					.pushLineBreak()
					.pushText('Sorry, I changed the data format 😰.')
					.done()
					{
				type: EngagementState.EngagementType.warning,
				key: EngagementKey['reborn'],
			}
	*/
		default:
			throw new Error(`Missing engagement message for "${key}"! (not implemented?)`)
	}
}

/////////////////////////////////////////////////
