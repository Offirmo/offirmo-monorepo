import Markdown from 'markdown-to-jsx/react'

import type { MarkdownRendererProps} from "../types"

/////////////////////////////////////////////////
// Constants

/////////////////////////////////////////////////
// Component

function MarkdownRenderer({ content }: MarkdownRendererProps) {
	return <Markdown children={content} />
}

/////////////////////////////////////////////////

export { MarkdownRenderer }
