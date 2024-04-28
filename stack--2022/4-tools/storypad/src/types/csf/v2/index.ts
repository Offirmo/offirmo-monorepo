import { Html‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

export type StoryV2Output = Html‿str // TODO extend return type
export type StoryV2Component = any // TODO type better

/////////////////////////////////////////////////
// Component story format CSF
// https://storybook.js.org/docs/react/api/csf
// https://github.com/ComponentDriven/csf
// https://www.componentdriven.org/
// I could steal the definitions from the storybook source code,
// but they're huge: I'd rather work it out feature by feature.


/* named export = a story = a FUNCTION for v2
 */
export interface Story‿v2 {
	(): StoryV2Output

	name?: never
	parameters?: never
	decorators?: Decorator‿v2[]
}
export function isꓽStory‿v2(s: any): s is Story‿v2 {
	return (typeof s === 'function')
}

export interface Decorator‿v2 {
	(story: Story‿v2): Story‿v2
}
