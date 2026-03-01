import 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import type { MarkdownRendererProps} from "../types"

/////////////////////////////////////////////////
// Constants

const REMARK_PLUGINS = [remarkGfm]
//const REHYPE_PLUGINS = [rehypeSlug, rehypeHighlight]

/////////////////////////////////////////////////
// Component

function MarkdownRenderer({
	content,
}: MarkdownRendererProps) {

	return <Markdown remarkPlugins={REMARK_PLUGINS}>{content}</Markdown>
}

/////////////////////////////////////////////////

export { MarkdownRenderer }
