import type { Meta‿v3, Story‿v3 } from '@monorepo-private/storypad'

import { type MarkdownRendererProps} from './types'

import { MarkdownRenderer as MR_MTJSX } from './markdown-to-jsx'
import { MarkdownRenderer as MR_REMARK } from './remark'

/////////////////////////////////////////////////

function MMR({
					 content,
				 }: MarkdownRendererProps) {

	return <table className="o⋄full-viewport">
		<thead>
			<tr><th>Markdown-to-JSX</th><th>Remark</th></tr>
		</thead>
		<tbody>
		<tr><td><MR_MTJSX content={content} /></td><td><MR_REMARK content={content} /></td></tr>
		</tbody>
	</table>
}
export default {
	component: MMR,
	parameters: {
		layout: 'bare',
	},
} satisfies Meta‿v3

/////////////////////////////////////////////////
import {
	DARING_FIREBALL,
	COMMONMARK_HELPⵧ1,
	COMMONMARK_HELPⵧ2,
	WITH_FRONTMATTER,
	CLAUDE__BASIC,
	CLAUDE__GFM,
	CLAUDE__CODE_BLOCKS,
	CLAUDE__DUPLICATE_HEADINGS,
} from './__fixtures/markdown-examples.ts'

export const A01DaringFireball: Story‿v3 = {
	args: { content: DARING_FIREBALL },
}

export const B01CommonMark: Story‿v3 = {
	args: { content: COMMONMARK_HELPⵧ1 },
}
export const B02CommonMarkAlt: Story‿v3 = {
	args: { content: COMMONMARK_HELPⵧ2 },
}

export const C01: Story‿v3 = {
	args: { content: CLAUDE__BASIC },
}
export const C02: Story‿v3 = {
	args: { content: CLAUDE__GFM },
}
export const C03: Story‿v3 = {
	args: { content: CLAUDE__CODE_BLOCKS },
}

export const WithFrontMatter: Story‿v3 = {
	args: { content: WITH_FRONTMATTER },
}

export const Empty: Story‿v3 = {
	args: { content: '' },
}

export const DuplicateHeadings: Story‿v3 = {
	args: { content: CLAUDE__DUPLICATE_HEADINGS },
}
