import { Html‿str } from '@offirmo-private/ts-types-web'

import { isꓽStory‿v2 } from '../v2'

/////////////////////////////////////////////////

export type StoryOutput‿v3 = Html‿str // TODO extend return type
export type StoryComponent‿v3 = any // TODO type better

type Arg = any

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
 * TODO remove ? and auto-set them
 */
export interface Meta‿v3 {
	// https://storybook.js.org/docs/writing-stories#default-export

	title?: never
	component?: never
	decorators: Decorator‿v3[]
	parameters?: {
		// https://storybook.js.org/docs/api/parameters#available-parameters
		// TODO layout: 'centered' | 'fullscreen' | 'padded' // Default: 'padded'
	}
	includeStories?: never
	excludeStories?: never
	argTypes?: {
		[key: string]: never
	}
	args?: {
		[key: string]: Arg
	}
}

/* named export = a story = an OBJECT for v3
 */
export interface Story‿v3 {
	// https://storybook.js.org/docs/writing-stories#defining-stories
	render?: (args: {[key: string]: Arg}) => StoryOutput‿v3
	component?: StoryComponent‿v3
	// can have neither, extending "meta" or even being empty!


	// https://storybook.js.org/docs/writing-stories#using-args
	args?: {
		[key: string]: Arg
	}

	name?: never
	parameters?: never // https://storybook.js.org/docs/api/parameters
	decorators?: Decorator‿v3[]
}
export function isꓽStory‿v3(s: any): s is Story‿v3 {
	return !isꓽStory‿v2(s)
}

// https://storybook.js.org/docs/writing-stories/decorators
export interface Decorator‿v3 {
	(story: Story‿v3): Story‿v3
}
