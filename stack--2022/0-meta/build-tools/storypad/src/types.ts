
export type HtmlAsString = string
export type StoryOutput = HtmlAsString // TODO extend return type


// https://storybook.js.org/docs/react/api/csf
export interface Meta {

	title?: never
	component?: never
	decorators: Decorator[]
	parameters?: never
	includeStories?: never
	excludeStories?: never
}

export interface Story‿v2 {
	(): StoryOutput

	name?: never
	parameters?: never
	decorators: Decorator[]

	// internal
	meta: Meta
}

export interface Story‿v3 {
	render: () => StoryOutput

	name?: never
	parameters?: never
	decorators: Decorator[]

	// internal
	meta: Meta
}

export type Story = Story‿v2 | Story‿v3

export interface Decorator {
	(story: Story): Story
}

export interface UserConfig {
	root_title: string

	decorators: Decorator[]
}

// type guards
export function is_story‿v2(s: any): s is Story‿v2 {
	return (typeof s === 'function') && Array.isArray(s?.decorators)
}
export function is_story‿v3(s: any): s is Story‿v3 {
	return (typeof s?.render === 'function') && Array.isArray(s?.decorators)
}
export function is_story(s: any): s is Story {
	return is_story‿v2(s) || is_story‿v3(s)
}
