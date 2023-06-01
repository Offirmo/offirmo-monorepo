
export type HtmlAsString = string
export type StoryOutput = HtmlAsString // TODO extend return type

/////////////////////////////////////////////////
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
	decorators?: Decorator[]
}
export function isꓽStory‿v2(s: any): s is Story‿v2 {
	return (typeof s === 'function')
}

export interface Story‿v3 {
	render: () => StoryOutput

	name?: never
	parameters?: never
	decorators?: Decorator[]
}
export function isꓽStory‿v3(s: any): s is Story‿v3 {
	return (typeof s?.render === 'function')
}

export type Story = Story‿v2 | Story‿v3
export function isꓽStory(s: any): s is Story {
	return isꓽStory‿v2(s) || isꓽStory‿v3(s)
}

export interface Decorator {
	(story: Story): Story
}

/////////////////////////////////////////////////

export interface UserConfig {
	root_title: string

	decorators: Decorator[]
}

/////////////////////////////////////////////////

export interface Module‿Parcelv2 {
	ts: {
		[k: string]: Story
	}
}
export function isꓽModule‿Parcelv2(x: any): x is Module‿Parcelv2 {
	return Object.hasOwn(x, 'ts') && x?.ts.__esModule === true
}

export type Module = Module‿Parcelv2
export function isꓽModule(x: any): x is Module {
	return isꓽModule‿Parcelv2(x)
}

interface Leave‿Parcelv2 {
	[k: string]: Leave‿Parcelv2 | Module‿Parcelv2
}
export interface Glob‿Parcelv2 {
	[k: string]: Leave‿Parcelv2
}

export type Glob = Glob‿Parcelv2
