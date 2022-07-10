import { Config, Story } from '../types'

export type StoryId = string
type Path = string


export interface StoryAndNotes {
	id: StoryId
	defaults: any

	fn: Story
}
export function is_story_and_notes(s: any): s is StoryAndNotes {
	return typeof s?.id === 'string' && typeof s?.fn === 'function'
}

interface StoryTree {
	[key: string]: StoryAndNotes | StoryTree
}
export function is_story_tree(s: any): s is StoryTree {
	return typeof s?.fn !== 'function' // TODO conflict possible?
}


export interface State {
	config: Config

	stories_by_id: {
		[k: StoryId]: StoryAndNotes,
	}

	story_tree: StoryTree

	current_story‿id: StoryId | undefined
}
