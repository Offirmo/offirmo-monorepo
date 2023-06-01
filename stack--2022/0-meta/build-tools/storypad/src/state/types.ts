import { UserConfig, Story, Meta, isꓽStory, isꓽStory‿v3 } from '../types'

export type StoryId = string


export interface StoryEntry {
	id: StoryId

	story: Story

	meta: Meta | undefined
}


export function isꓽStoryEntry(x: any): x is StoryEntry {
	return isꓽStory(x?.story)
}

interface StoryTree {
	id: string

	is_open: boolean
	leaves: {
		[key: string]: StoryEntry | StoryTree
	}
}
export function isꓽStoryTree(x: any): x is StoryTree {
	return !isꓽStoryEntry(x) // simple for now ;)
}


export interface State {
	config: UserConfig

	stories_by_id: {
		[k: StoryId]: StoryEntry,
	}

	story_tree: StoryTree

	current_story‿id: StoryId | undefined
}
