import type { Meta‿v3, Story‿v3 } from '@monorepo-private/storypad'
import React from 'react'

import { MarkdownOutline } from './index.tsx'
import { MarkdownRenderer } from '../../markdown-renderer/claude/index.tsx'

/////////////////////////////////////////////////

const RICH_MD = `# Document Title

## Introduction

Some intro text here.

## Architecture

### Frontend

Frontend details.

### Backend

Backend details.

#### Database

Database layer specifics.

#### Caching

Caching strategy.

## API Reference

### Authentication

Auth endpoints.

### Resources

Resource endpoints.

## Conclusion

Final thoughts.
`

const FLAT_MD = `## Section One

Content.

## Section Two

Content.

## Section Three

Content.
`

const DEEP_MD = `# Title

## Level 2

### Level 3

#### Level 4

##### Level 5

###### Level 6
`

const NO_HEADINGS_MD = `Just a paragraph of text with no headings at all.

Another paragraph.
`

/////////////////////////////////////////////////

export default {
	component: MarkdownOutline,
	parameters: {
		layout: 'padded',
	},
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const Default: Story‿v3 = {
	args: { content: RICH_MD },
}

export const FlatStructure: Story‿v3 = {
	args: { content: FLAT_MD },
}

export const DeepNesting: Story‿v3 = {
	args: { content: DEEP_MD },
}

export const CustomDepthRange: Story‿v3 = {
	args: { content: RICH_MD, minDepth: 2, maxDepth: 3 },
}

export const NoHeadings: Story‿v3 = {
	args: { content: NO_HEADINGS_MD },
}

export const WithRenderer: Story‿v3 = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem' }}>
			<div style={{ flex: '0 0 200px' }}>
				<MarkdownOutline content={RICH_MD} />
			</div>
			<div style={{ flex: 1 }}>
				<MarkdownRenderer content={RICH_MD} />
			</div>
		</div>
	),
}
