import { type Immutable} from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import { type Engagement } from '@oh-my-rpg/state--engagement'
import { type HypermediaContentType } from '@tbrpg/definitions'

import { EngagementTemplateKey } from './types.js'

/////////////////////////////////////////////////

// TODO review good idea to centralize??
export function getꓽengagement_template(key: EngagementTemplateKey): Engagement<HypermediaContentType> {
	switch(key) {
		case EngagementTemplateKey.achievement_unlocked: {
			return {
				summary: RichText.fragmentⵧblock()
					.pushStrong('🏆 Achievement unlocked:')
					//.pushLineBreak() // TODO review, display not great
					.pushText(` “⎨⎨icon⎬⎬ ⎨⎨name⎬⎬“`)
					.done(),
				flow: 'side',
				role: 'system',
				attention_needed: 'log',
				enhancements: {
					key,
				}
			}
		}
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

	*/
		default:
			throw new Error(`Missing engagement message for "${key}"! (not implemented?)`)
	}
}

/////////////////////////////////////////////////
