import { UserConfig, Story, is_story } from '../types'

export type StoryId = string


export interface StoryEntry {
	id: StoryId
	defaults: any

	story: Story
}


export function is_story_entry(s: any): s is StoryEntry {
	return is_story(s?.story)
}

interface StoryTree {
	id: string

	is_open: boolean
	leaves: {
		[key: string]: StoryEntry | StoryTree
	}
}
export function is_story_tree(s: any): s is StoryTree {
	return !is_story_entry(s) // simple for now ;)
}


export interface State {
	config: UserConfig

	stories_by_id: {
		[k: StoryId]: StoryEntry,
	}

	story_tree: StoryTree

	current_story‿id: StoryId | undefined
}
