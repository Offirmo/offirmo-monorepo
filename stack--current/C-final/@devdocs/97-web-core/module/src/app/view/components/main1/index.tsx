/**
 * ResizableLayout Component - Full Specifications
 *
 * A state-of-the-art functional React component that provides a resizable two-column layout
 * with persistent sidebar width based on physical screen size.
 *
 * ## Core Requirements
 *
 * ### Layout Structure
 * - Takes the full size of its container (100% width × 100% height)
 * - Accepts 2 child components via props: `sidebar` and `content`
 * - Sidebar: positioned on the left, full height, independent scrollbar
 * - Content: positioned on the right, full height, independent scrollbar
 * - Both sections have their own scrollbars that appear when content overflows
 *
 * ### Resizing Functionality
 * - Sidebar can be resized horizontally by dragging its right edge
 * - Resize handle is a visible 16px wide bar with visual indicators (dots)
 * - Handle shows hover state (turns blue) and col-resize cursor
 * - Smooth drag interaction with visual feedback during resize
 * - Configurable min/max width constraints for the sidebar
 *
 * ### Persistence (localStorage)
 * - Sidebar width is automatically saved to localStorage when resize ends
 * - Sidebar width is restored from localStorage on component mount
 * - Storage key is configurable via `localStorageKey` prop
 *
 * ### Screen Size Indexing (NOT Viewport Size)
 * - Sidebar widths are indexed by **screen size** (monitor resolution), not viewport size
 * - Uses `window.screen.width` to determine screen size category
 * - Screen size categories:
 *   - xs: 0-639px
 *   - sm: 640-767px
 *   - md: 768-1023px
 *   - lg: 1024-1279px
 *   - xl: 1280-1535px
 *   - 2xl: 1536px+
 * - Each screen size maintains its own stored width in localStorage
 * - When moving window between monitors, appropriate width is restored
 * - Browser window resizing does NOT affect stored/loaded width
 * - Default widths per screen size: xs:200, sm:250, md:300, lg:350, xl:400, 2xl:450
 *
 * ### Multi-Monitor Support
 * - Each physical monitor remembers its own optimal sidebar width
 * - Screen changes detected via window 'resize' and 'focus' events
 * - Automatic width restoration when moving between monitors
 * - Perfect for multi-monitor workflows with different resolutions/DPI
 *
 * ## Props Interface
 *
 * @param {ReactNode} sidebar - Content to display in the left sidebar
 * @param {ReactNode} content - Content to display in the right content area
 * @param {number} [minSidebarWidth=150] - Minimum allowed sidebar width in pixels
 * @param {number} [maxSidebarWidth=800] - Maximum allowed sidebar width in pixels
 * @param {number} [defaultSidebarWidth=300] - Default width when no stored value exists
 * @param {string} [localStorageKey='resizable-layout:sidebar-width'] - Key for localStorage persistence
 *
 * ## localStorage Data Structure
 *
 * Stored as JSON object with screen size keys:
 * ```json
 * {
 *   "lg": 350,   // 1920×1080 monitor
 *   "2xl": 450,  // 2560×1440 monitor
 *   "md": 300    // laptop screen
 * }
 * ```
 *
 * ## Technical Implementation
 *
 * - Pure functional React component using hooks
 * - useState: manages screen size, sidebar width, and resize state
 * - useEffect: handles screen changes, drag events, and CSS injection
 * - useRef: stores drag start position and width without re-renders
 * - useCallback: memoizes event handlers for performance
 * - Custom scrollbar CSS injected once on mount for consistent appearance
 * - User selection disabled during drag for better UX
 * - Proper cleanup of all event listeners
 *
 * ## Browser Support
 *
 * - Modern browsers (Chrome, Firefox, Safari, Edge)
 * - Custom scrollbar styling for WebKit browsers
 * - scrollbarWidth support for Firefox
 * - Touch scrolling optimization for mobile (WebkitOverflowScrolling)
 *
 * ## Example Usage
 *
 * ```tsx
 * import ResizableLayout from './components/main1'
 *
 * function App() {
 *   return (
 *     <div style={{ height: '100vh' }}>
 *       <ResizableLayout
 *         sidebar={<MySidebarContent />}
 *         content={<MyMainContent />}
 *         minSidebarWidth={200}
 *         maxSidebarWidth={600}
 *         localStorageKey="my-app:sidebar"
 *       />
 *     </div>
 *   )
 * }
 * ```
 *
 * @version 1.0.0
 * @author Offirmo (with Claude Code assistance)
 */

import React, { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'

/////////////////////////////////////////////////

// CSS to ensure scrollbars are always visible
const SCROLLBAR_STYLES = `
.resizable-layout-scrollable {
	scrollbar-width: auto !important; /* Firefox */
}

/* WebKit browsers (Chrome, Safari, Edge) */
.resizable-layout-scrollable::-webkit-scrollbar {
	width: 12px;
	height: 12px;
}

.resizable-layout-scrollable::-webkit-scrollbar-track {
	background: #f1f1f1;
}

.resizable-layout-scrollable::-webkit-scrollbar-thumb {
	background: #888;
	border-radius: 6px;
}

.resizable-layout-scrollable::-webkit-scrollbar-thumb:hover {
	background: #555;
}
`

/////////////////////////////////////////////////

interface ResizableLayoutProps {
	sidebar: ReactNode
	content: ReactNode
	minSidebarWidth?: number
	maxSidebarWidth?: number
	defaultSidebarWidth?: number
	localStorageKey?: string
}

interface ScreenSizeConfig {
	breakpoint: number
	name: string
}

/////////////////////////////////////////////////

const SCREEN_SIZES: ScreenSizeConfig[] = [
	{ breakpoint: 0, name: 'xs' },
	{ breakpoint: 640, name: 'sm' },
	{ breakpoint: 768, name: 'md' },
	{ breakpoint: 1024, name: 'lg' },
	{ breakpoint: 1280, name: 'xl' },
	{ breakpoint: 1536, name: '2xl' },
]

const DEFAULT_WIDTHS: Record<string, number> = {
	xs: 200,
	sm: 250,
	md: 300,
	lg: 350,
	xl: 400,
	'2xl': 450,
}

/////////////////////////////////////////////////

function getScreenSize(): string {
	const screenWidth = window.screen.width
	for (let i = SCREEN_SIZES.length - 1; i >= 0; i--) {
		if (screenWidth >= SCREEN_SIZES[i].breakpoint) {
			return SCREEN_SIZES[i].name
		}
	}
	return SCREEN_SIZES[0].name
}

function getSidebarWidth(
	localStorageKey: string,
	screenSize: string,
	defaultWidth: number,
): number {
	try {
		const stored = localStorage.getItem(localStorageKey)
		if (stored) {
			const data = JSON.parse(stored)
			return data[screenSize] ?? DEFAULT_WIDTHS[screenSize] ?? defaultWidth
		}
	} catch (e) {
		console.warn('Failed to read sidebar width from localStorage:', e)
	}
	return DEFAULT_WIDTHS[screenSize] ?? defaultWidth
}

function setSidebarWidth(
	localStorageKey: string,
	screenSize: string,
	width: number,
): void {
	try {
		const stored = localStorage.getItem(localStorageKey)
		const data = stored ? JSON.parse(stored) : {}
		data[screenSize] = width
		localStorage.setItem(localStorageKey, JSON.stringify(data))
	} catch (e) {
		console.warn('Failed to save sidebar width to localStorage:', e)
	}
}

/////////////////////////////////////////////////

export default function ResizableLayout({
	sidebar,
	content,
	minSidebarWidth = 150,
	maxSidebarWidth = 800,
	defaultSidebarWidth = 300,
	localStorageKey = 'resizable-layout:sidebar-width',
}: ResizableLayoutProps) {
	const [screenSize, setScreenSize] = useState<string>(() =>
		getScreenSize()
	)
	const [sidebarWidth, setSidebarWidthState] = useState<number>(() =>
		getSidebarWidth(localStorageKey, getScreenSize(), defaultSidebarWidth)
	)
	const [isResizing, setIsResizing] = useState(false)

	const containerRef = useRef<HTMLDivElement>(null)
	const startXRef = useRef<number>(0)
	const startWidthRef = useRef<number>(0)

	// Inject scrollbar styles once
	useEffect(() => {
		const styleId = 'resizable-layout-scrollbar-styles'
		if (!document.getElementById(styleId)) {
			const style = document.createElement('style')
			style.id = styleId
			style.textContent = SCROLLBAR_STYLES
			document.head.appendChild(style)
		}
	}, [])

	// Handle screen size changes (when moving between monitors)
	useEffect(() => {
		const handleScreenChange = () => {
			const newScreenSize = getScreenSize()
			if (newScreenSize !== screenSize) {
				setScreenSize(newScreenSize)
				const newWidth = getSidebarWidth(localStorageKey, newScreenSize, defaultSidebarWidth)
				setSidebarWidthState(newWidth)
			}
		}

		// Check on window resize (can detect monitor changes)
		window.addEventListener('resize', handleScreenChange)
		// Check when window regains focus (user may have moved to different monitor)
		window.addEventListener('focus', handleScreenChange)

		return () => {
			window.removeEventListener('resize', handleScreenChange)
			window.removeEventListener('focus', handleScreenChange)
		}
	}, [screenSize, localStorageKey, defaultSidebarWidth])

	// Handle mouse move during resize
	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!isResizing) return

		const delta = e.clientX - startXRef.current
		const newWidth = Math.min(
			Math.max(startWidthRef.current + delta, minSidebarWidth),
			maxSidebarWidth
		)

		setSidebarWidthState(newWidth)
	}, [isResizing, minSidebarWidth, maxSidebarWidth])

	// Handle mouse up to end resize
	const handleMouseUp = useCallback(() => {
		if (!isResizing) return

		setIsResizing(false)
		setSidebarWidth(localStorageKey, screenSize, sidebarWidth)

		// Remove selection that may have occurred during drag
		if (window.getSelection) {
			window.getSelection()?.removeAllRanges()
		}
	}, [isResizing, localStorageKey, screenSize, sidebarWidth])

	// Set up mouse event listeners
	useEffect(() => {
		if (isResizing) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)

			return () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}
		}
	}, [isResizing, handleMouseMove, handleMouseUp])

	// Handle resize start
	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault()
		setIsResizing(true)
		startXRef.current = e.clientX
		startWidthRef.current = sidebarWidth
	}

	return (
		<div
			ref={containerRef}
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				position: 'relative',
				userSelect: isResizing ? 'none' : 'auto',
			}}
		>
			{/* Sidebar */}
			<div
				className="resizable-layout-scrollable"
				style={{
					width: `${sidebarWidth}px`,
					height: '100%',
					overflowY: 'scroll',
					overflowX: 'auto',
					flexShrink: 0,
					position: 'relative',
					WebkitOverflowScrolling: 'touch',
				} as React.CSSProperties}
			>
				{sidebar}
			</div>

			{/* Resize Handle */}
			<div
				onMouseDown={handleMouseDown}
				style={{
					width: '16px',
					height: '100%',
					cursor: 'col-resize',
					backgroundColor: isResizing ? 'rgba(59, 130, 246, 0.6)' : '#e5e7eb',
					position: 'relative',
					flexShrink: 0,
					transition: isResizing ? 'none' : 'background-color 0.2s',
					borderLeft: '2px solid #d1d5db',
					borderRight: '2px solid #d1d5db',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onMouseEnter={(e) => {
					if (!isResizing) {
						e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.4)'
					}
				}}
				onMouseLeave={(e) => {
					if (!isResizing) {
						e.currentTarget.style.backgroundColor = '#e5e7eb'
					}
				}}
			>
				{/* Visual indicator - more prominent dots pattern */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '4px',
						pointerEvents: 'none',
					}}
				>
					{[...Array(8)].map((_, i) => (
						<div
							key={i}
							style={{
								width: '4px',
								height: '4px',
								borderRadius: '50%',
								backgroundColor: isResizing ? 'rgb(59, 130, 246)' : 'rgba(107, 114, 128, 0.7)',
							}}
						/>
					))}
				</div>
			</div>

			{/* Content */}
			<div
				className="resizable-layout-scrollable"
				style={{
					flex: 1,
					height: '100%',
					overflowY: 'scroll',
					overflowX: 'auto',
					minWidth: 0,
					WebkitOverflowScrolling: 'touch',
				} as React.CSSProperties}
			>
				{content}
			</div>
		</div>
	)
}

/////////////////////////////////////////////////
