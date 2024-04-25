import { FileSystemNode } from '@offirmo-private/data-structures'
import {
	UserConfig,
	Story, isꓽStory,
	Meta,
} from '../types'

/////////////////////////////////////////////////

export type StoryId = string
export type FolderId = string

export interface StoryEntry {
	uid: StoryId

	story: Story

	meta: Meta | undefined
}
export function isꓽStoryEntry(x: any): x is StoryEntry {
	return isꓽStory(x?.story)
}

export interface StoryFolder {
	uid: FolderId

	is_expanded: boolean
}
export function isꓽStoryFolder(x: any): x is StoryFolder {
	return !isꓽStoryEntry(x) // simple for now ;)
}


export interface State {
	config: UserConfig

	stories_by_uid: {
		[k: StoryId]: StoryEntry,
	}

	folders_by_id: {
		[k: FolderId]: StoryFolder,
	}

	current_story‿uid: StoryId | undefined

	tree: FileSystemNode<StoryEntry, StoryFolder>
}
