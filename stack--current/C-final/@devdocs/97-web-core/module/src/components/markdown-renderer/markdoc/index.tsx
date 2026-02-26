import 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/////////////////////////////////////////////////
// Types

interface MarkdownRendererProps {
	/** Markdown source text to render */
	content: string
	/** Optional additional CSS class on the root element */
	className?: string
}

/////////////////////////////////////////////////
// Constants

const REMARK_PLUGINS = [remarkGfm]
//const REHYPE_PLUGINS = [rehypeSlug, rehypeHighlight]

/////////////////////////////////////////////////
// Component

function MarkdownRenderer({
	content,
	className,
}: MarkdownRendererProps) {

	return <Markdown remarkPlugins={REMARK_PLUGINS}>{content}</Markdown>
}

/////////////////////////////////////////////////

export { MarkdownRenderer }
export type { MarkdownRendererProps }
