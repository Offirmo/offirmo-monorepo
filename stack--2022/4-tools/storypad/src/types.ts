import { Html‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

export type StoryOutput = Html‿str // TODO extend return type

/////////////////////////////////////////////////
// Component story format CSF
// https://storybook.js.org/docs/react/api/csf
// https://github.com/ComponentDriven/csf
// https://www.componentdriven.org/
// I could steal the definitions from the storybook source code,
// but they're huge: I'd rather work it out feature by feature.

// = default export + named exports

/* default export
 * https://storybook.js.org/docs/api/csf#default-export
 */
export interface Meta {
	title?: never
	component?: never
	decorators: Decorator[]
	parameters?: never
	includeStories?: never
	excludeStories?: never
}

/* named export = a story = an OBJECT for v3
 */
export interface Story‿v3 {
	//render: () => StoryOutput NO! CAN be a React component, can be in Meta...

	name?: never
	parameters?: never
	decorators?: Decorator[]
}
export function isꓽStory‿v3(s: any): s is Story‿v3 {
	return !isꓽStory‿v2(s)
}

/* named export = a story = a FUNCTION for v2
 */
export interface Story‿v2 {
	(): StoryOutput

	name?: never
	parameters?: never
	decorators?: Decorator[]
}
export function isꓽStory‿v2(s: any): s is Story‿v2 {
	return (typeof s === 'function')
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
// globbing

// Parcel
type Module‿Parcelv2 = {
	js?: { [k: string]: unknown }
	jsx?: { [k: string]: unknown }
	ts?: { [k: string]: unknown }
	tsx?: { [k: string]: unknown }
}
function isꓽModule‿Parcelv2(x: any): x is Module‿Parcelv2 {
	return ['js', 'jsx', 'ts', 'tsx'].some(ext => {
		return Object.hasOwn(x, ext) && x?.[ext]?.__esModule === true
	})
}

interface Glob‿Parcelv2 {
	[k: string]: Glob‿Parcelv2 | Module‿Parcelv2
}

// generic
export type Module = Module‿Parcelv2
export function isꓽModule(x: any): x is Module { return isꓽModule‿Parcelv2(x)}
export type Glob = Glob‿Parcelv2
export function isꓽGlob(x: any): x is Glob { return !isꓽModule(x)}
