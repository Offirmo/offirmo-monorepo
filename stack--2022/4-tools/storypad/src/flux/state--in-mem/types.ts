import { FileSystemNodeⳇFolder } from '@offirmo-private/data-structures'
import {	Config } from '../../types/config'
import {
	Story, isꓽStory,
	Meta,
} from '../../types/csf'

/////////////////////////////////////////////////

export type StoryUId = string
export type FolderUId = string

export interface StoryEntry {
	uid: StoryUId // for convenience when passing the payload around

	story: Story

	meta: Meta | undefined
}
export function isꓽStoryEntry(x: any): x is StoryEntry {
	return isꓽStory(x?.story)
}

export interface StoryFolder {
	uid: FolderUId // for convenience when passing the payload around

	isꓽexpandedⵧinitially: boolean
}
export function isꓽStoryFolder(x: any): x is StoryFolder {
	return !isꓽStoryEntry(x) // simple for now ;)
}

/////////////////////////////////////////////////

export interface State {
	config: Config
/*
	stories_by_uid: { [k: StoryUId]:  StoryEntry }
	folders_by_uid: { [k: FolderUId]: StoryFolder }
*/
	last_explicitly_activated_story‿uid: StoryUId | undefined
	first_encountered_story‿uid: StoryUId | undefined

	tree: FileSystemNodeⳇFolder<StoryEntry, StoryFolder>
}
