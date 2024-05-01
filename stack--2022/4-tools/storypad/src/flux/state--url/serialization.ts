/* serialization/deserialization related to the state stored in url
 */

import assert from 'tiny-invariant'
import { StoryUId } from '../types'

/////////////////////////////////////////////////

function serializeꓽstory_uid(uid: StoryUId): string {
	const segments = uid.split('/')
	const story_name = segments.pop()
	assert(story_name, `serializeꓽstory_uid() expecting a final story basename! "${uid}"`)
	assert(segments.length > 0, `serializeꓽstory_uid() expecting path segments! "${uid}"`)
	// follow Storybook
	// ex. seen =/story/section-header--default
	return [
		segments.join('/'),
		story_name,
	].join('--')
}

function unserializeꓽstory_uid(serialized_uid: string | undefined): StoryUId | undefined {
	if (!serialized_uid)
		return undefined

	try {
		const [ joined_segments, story_name ] = serialized_uid.split('--')
		assert(story_name, `unserializeꓽstory_uid() expecting a final story basename! "${serialized_uid}"`)
		assert(joined_segments, `unserializeꓽstory_uid() expecting segments! "${serialized_uid}"`)

		const segments = joined_segments.split('/')
		assert(segments.length > 0, `unserializeꓽstory_uid() expecting path segments! "${serialized_uid}"`)

		return [
			segments.join('/'),
			story_name,
		].join('/')
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
