import type { Meta‿v3, Story‿v3 } from '@monorepo-private/storypad'
import React from 'react'

import { MarkdownRenderer } from './index.tsx'

/////////////////////////////////////////////////

const BASIC_MD = `# Hello World

This is a paragraph with **bold**, *italic*, and \`inline code\`.

## Getting Started

Here is a [link](https://example.com) and some content.

### Installation

\`\`\`bash
npm install react-markdown
\`\`\`

## Features

- Item one
- Item two
- Item three

1. First
2. Second
3. Third

> A blockquote with some wisdom.
`

const GFM_MD = `## GFM Features

### Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Tables | Done | GFM extension |
| Strikethrough | Done | ~~like this~~ |
| Task Lists | Done | See below |

### Task Lists

- [x] Completed task
- [ ] Pending task
- [x] Another done

### Autolinks

Visit https://example.com for more info.

### Strikethrough

This is ~~deleted~~ text.
`

const CODE_BLOCKS_MD = `## Code Examples

### JavaScript

\`\`\`javascript
function hello() {
  console.log('Hello, world!')
}
\`\`\`

### TypeScript

\`\`\`typescript
interface Props {
  content: string
  className?: string
}

function Component({ content, className }: Props): JSX.Element {
  return <div className={className}>{content}</div>
}
\`\`\`

### Inline

Use \`npm install\` to install dependencies.
`

const DUPLICATE_HEADINGS_MD = `# Document

## Setup

First setup section.

## Setup

Second setup section (id should be setup-1).

## Setup

Third setup section (id should be setup-2).
`

/////////////////////////////////////////////////

export default {
	component: MarkdownRenderer,
	parameters: {
		layout: 'padded',
	},
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const Basic: Story‿v3 = {
	args: { content: BASIC_MD },
}

export const GfmFeatures: Story‿v3 = {
	args: { content: GFM_MD },
}

export const CodeBlocks: Story‿v3 = {
	args: { content: CODE_BLOCKS_MD },
}

export const DuplicateHeadings: Story‿v3 = {
	args: { content: DUPLICATE_HEADINGS_MD },
}

export const Empty: Story‿v3 = {
	args: { content: '' },
}
