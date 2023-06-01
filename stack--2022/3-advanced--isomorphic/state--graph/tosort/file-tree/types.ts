
type AbsolutePath = string


interface StoryEntry {
	id: StoryId

	story: Story

	meta: Meta | undefined
}
export function isꓽStoryEntry(x: any): x is StoryEntry {
	return isꓽStory(x?.story)
}

export interface StoryFolder {
	id: StoryId

	is_expanded: boolean

	children: {
		[key: string]: StoryEntry | StoryFolder
	}
}
export function isꓽStoryTree(x: any): x is StoryFolder {
	return !isꓽStoryEntry(x) // simple for now ;)
}


export interface State {
	config: UserConfig

	stories_by_id: {
		[k: StoryId]: StoryEntry,
	}

	// there is a root folder with a dedicated ID
	folders_by_id: {
		[k: StoryId]: StoryFolder,
	}

	current_story‿id: StoryId | undefined
}
