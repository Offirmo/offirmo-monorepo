/* serialization/deserialization related to the state stored in url
 */

import assert from 'tiny-invariant'
import { StoryUId } from '../types.ts'
import { SEPⵧSEGMENTS, SEPⵧSTORY } from '../../../consts.ts'

/////////////////////////////////////////////////

function serializeꓽstory_uid(uid: StoryUId): string {
	const segments = uid.split(SEPⵧSEGMENTS)
	const story_name = segments.pop()
	assert(story_name, `serializeꓽstory_uid() expecting a final story basename! "${uid}"`)
	assert(segments.length > 0, `serializeꓽstory_uid() expecting path segments! "${uid}"`)
	// follow Storybook
	// ex. seen =/story/section-header--default
	return [
		segments.join(SEPⵧSEGMENTS),
		story_name,
	].join(SEPⵧSTORY)
}

function unserializeꓽstory_uid(serialized_uid: string | undefined | null): StoryUId | undefined {
	if (!serialized_uid)
		return undefined

	try {
		const split = serialized_uid.split(SEPⵧSTORY)
		const story_name = split.pop()
		const joined_segments = split.join(SEPⵧSTORY)
		assert(story_name, `unserializeꓽstory_uid() expecting a final story basename! "${serialized_uid}"`)
		assert(joined_segments, `unserializeꓽstory_uid() expecting segments! "${serialized_uid}"`)

		const segments = joined_segments.split('/')
		assert(segments.length > 0, `unserializeꓽstory_uid() expecting path segments! "${serialized_uid}"`)

		return [
			segments.join(SEPⵧSEGMENTS),
			story_name,
		].join(SEPⵧSEGMENTS)
	}
	catch (err: unknown) {
		// QParams = user input, notoriously unsafe
		// fallback to undef
		console.warn(`Error unserializing the story path:`, err)
		return undefined
	}
}

/////////////////////////////////////////////////

export {
	serializeꓽstory_uid,
	unserializeꓽstory_uid,
}
