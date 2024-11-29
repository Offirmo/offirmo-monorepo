import { type Immutable} from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'
import { TrackedEngagement } from '@oh-my-rpg/state--engagement'
import { EngagementKey } from './types.js'

////////////////////////////////////

export function getꓽengagement_message(pe: Immutable<TrackedEngagement>): RichText.Document {
	const { engagement: {key}, params} = pe

	switch(key) {
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

		default:
			throw new Error(`Missing engagement message for "${key}"! (not implemented?)`)
	}
}
