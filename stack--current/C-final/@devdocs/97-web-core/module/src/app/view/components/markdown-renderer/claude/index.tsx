import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import type { Components } from 'react-markdown'

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
const REHYPE_PLUGINS = [rehypeSlug, rehypeHighlight]

/////////////////////////////////////////////////
// Component

function MarkdownRenderer({
	content,
	className,
}: MarkdownRendererProps): React.JSX.Element {
	const rootClassName = ['markdown-renderer', className].filter(Boolean).join(' ')

	const components = useMemo<Components>(() => ({
		// Headings: rehype-slug adds the id, we add BEM classes
		h1: ({ children, id, ...props }) => (
			<h1 id={id} className="markdown-renderer__heading markdown-renderer__heading--1" {...props}>{children}</h1>
		),
		h2: ({ children, id, ...props }) => (
			<h2 id={id} className="markdown-renderer__heading markdown-renderer__heading--2" {...props}>{children}</h2>
		),
		h3: ({ children, id, ...props }) => (
			<h3 id={id} className="markdown-renderer__heading markdown-renderer__heading--3" {...props}>{children}</h3>
		),
		h4: ({ children, id, ...props }) => (
			<h4 id={id} className="markdown-renderer__heading markdown-renderer__heading--4" {...props}>{children}</h4>
		),
		h5: ({ children, id, ...props }) => (
			<h5 id={id} className="markdown-renderer__heading markdown-renderer__heading--5" {...props}>{children}</h5>
		),
		h6: ({ children, id, ...props }) => (
			<h6 id={id} className="markdown-renderer__heading markdown-renderer__heading--6" {...props}>{children}</h6>
		),
		table: ({ children, ...props }) => (
			<table className="markdown-renderer__table" {...props}>{children}</table>
		),
		pre: ({ children, ...props }) => (
			<pre className="markdown-renderer__code-block" {...props}>{children}</pre>
		),
		code: ({ children, className: langClass, ...props }) => (
			<code className={['markdown-renderer__code', langClass].filter(Boolean).join(' ')} {...props}>
				{children}
			</code>
		),
		a: ({ children, href, ...props }) => {
			const isExternal = href?.startsWith('http')
			return (
				<a
					href={href}
					className="markdown-renderer__link"
					{...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
					{...props}
				>
					{children}
				</a>
			)
		},
	}), [])

	return (
		<div className={rootClassName}>
			<ReactMarkdown
				remarkPlugins={REMARK_PLUGINS}
				rehypePlugins={REHYPE_PLUGINS}
				components={components}
			>
				{content}
			</ReactMarkdown>
		</div>
	)
}

export { MarkdownRenderer }
export type { MarkdownRendererProps }
