/////////////////////////////////////////////////
// Component story format CSF
// https://storybook.js.org/docs/react/api/csf
// https://github.com/ComponentDriven/csf
// https://www.componentdriven.org/
// I could steal the definitions from the storybook source code,
// but they're huge: I'd rather work it out feature by feature.

import { Story‿v2, isꓽStory‿v2, Meta‿v2 } from './v2'
import { Story‿v3, isꓽStory‿v3, Meta‿v3 } from './v3'

/////////////////////////////////////////////////

export * from './common'

export type Story = Story‿v2 | Story‿v3
export function isꓽStory(s: any): s is Story {
	return isꓽStory‿v2(s) || isꓽStory‿v3(s)
}
export type Meta = Meta‿v2 | Meta‿v3
