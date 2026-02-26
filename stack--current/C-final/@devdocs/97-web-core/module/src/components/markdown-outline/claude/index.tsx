import React, { useMemo } from 'react'
import GithubSlugger from 'github-slugger'

/////////////////////////////////////////////////
// Types

interface HeadingEntry {
	readonly depth: number
	readonly text: string
	readonly id: string
}

interface MarkdownOutlineProps {
	/** Markdown source text (same string as given to MarkdownRenderer) */
	content: string
	/** Minimum heading depth to include (default: 2, skipping h1 title) */
	minDepth?: number
	/** Maximum heading depth to include (default: 4) */
	maxDepth?: number
	/** Optional additional CSS class on the root element */
	className?: string
}

/////////////////////////////////////////////////
// Pure computation

/**
 * Extracts headings from markdown text and generates slug IDs
 * using github-slugger — the same algorithm used by rehype-slug
 * in the MarkdownRenderer, ensuring consistent anchor IDs.
 */
function extractHeadings(markdown: string): Array<HeadingEntry> {
	const slugger = new GithubSlugger()
	const headings: Array<HeadingEntry> = []
	const lines = markdown.split('\n')
	let inCodeBlock = false

	for (const line of lines) {
		if (/^```/.test(line.trimStart())) {
			inCodeBlock = !inCodeBlock
			continue
		}
		if (inCodeBlock) continue

		const match = /^(#{1,6})\s+(.+?)(?:\s+#+)?$/.exec(line)
		if (match) {
			const depth = match[1]!.length
			const text = match[2]!.trim()
			const id = slugger.slug(text)
			headings.push({ depth, text, id })
		}
	}

	return headings
}

/////////////////////////////////////////////////
// Component

function MarkdownOutline({
	content,
	minDepth = 2,
	maxDepth = 4,
	className,
}: MarkdownOutlineProps): React.JSX.Element | null {
	const headings = useMemo(
		() => extractHeadings(content).filter(
			h => h.depth >= minDepth && h.depth <= maxDepth,
		),
		[content, minDepth, maxDepth],
	)

	if (headings.length === 0) return null

	const rootClassName = ['markdown-outline', className].filter(Boolean).join(' ')

	return (
		<nav className={rootClassName} aria-label="Table of contents">
			<ol className="markdown-outline__list">
				{headings.map((heading) => (
					<li
						key={heading.id}
						className={`markdown-outline__item markdown-outline__item--depth-${String(heading.depth)}`}
					>
						<a className="markdown-outline__link" href={`#${heading.id}`}>
							{heading.text}
						</a>
					</li>
				))}
			</ol>
		</nav>
	)
}

export { MarkdownOutline, extractHeadings }
export type { MarkdownOutlineProps, HeadingEntry }
