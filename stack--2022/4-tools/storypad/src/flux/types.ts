import { FileSystemNodeⳇFolder } from '@offirmo-private/data-structures'

import {
	Story, isꓽStory,
	Meta,
} from '../types/csf'

/////////////////////////////////////////////////

export type StoryUId = string
export interface StoryEntry {
	uid: StoryUId // for convenience when passing the payload around

	story: Story

	meta: Meta | undefined
}
export function isꓽStoryEntry(x: any): x is StoryEntry {
	return isꓽStory(x?.story)
}

export type FolderUId = string
export interface StoryFolder {
	uid: FolderUId // for convenience when passing the payload around

	isꓽexpandedⵧinitially: boolean
}
export function isꓽStoryFolder(x: any): x is StoryFolder {
	return !isꓽStoryEntry(x) // simple for now ;)
}

export type StoryTree = FileSystemNodeⳇFolder<StoryEntry, StoryFolder>

/////////////////////////////////////////////////

export type RenderMode = 'full' | 'story'
export function isꓽrender_mode(x: any): x is RenderMode {
	return ['full', 'story'].includes(x)
}
