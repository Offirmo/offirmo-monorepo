import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import ResizableLayout from './index.tsx'

/////////////////////////////////////////////////

export default {
	component: ResizableLayout,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta‿v3

/////////////////////////////////////////////////

// Helper to show current screen info
function ScreenInfo() {
	const [info, setInfo] = React.useState(() => ({
		screenWidth: window.screen.width,
		screenHeight: window.screen.height,
		viewportWidth: window.innerWidth,
		viewportHeight: window.innerHeight,
	}))

	React.useEffect(() => {
		const update = () => {
			setInfo({
				screenWidth: window.screen.width,
				screenHeight: window.screen.height,
				viewportWidth: window.innerWidth,
				viewportHeight: window.innerHeight,
			})
		}

		window.addEventListener('resize', update)
		window.addEventListener('focus', update)

		return () => {
			window.removeEventListener('resize', update)
			window.removeEventListener('focus', update)
		}
	}, [])

	return (
		<div style={{
			padding: '16px',
			backgroundColor: '#f0f9ff',
			border: '1px solid #bae6fd',
			borderRadius: '8px',
			marginBottom: '16px',
			fontFamily: 'monospace',
			fontSize: '12px',
		}}>
			<div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Screen Information</div>
			<div>Screen Size: {info.screenWidth} × {info.screenHeight}px</div>
			<div>Viewport Size: {info.viewportWidth} × {info.viewportHeight}px</div>
			<div style={{ marginTop: '8px', fontSize: '11px', color: '#666' }}>
				Sidebar width is indexed by screen size, not viewport size
			</div>
		</div>
	)
}

// Test sidebar content with various heights
function SidebarContent({ items = 50 }: { items?: number }) {
	return (
		<div style={{ padding: '16px', minHeight: '100%' }}>
			<h2 style={{ marginTop: 0 }}>Sidebar</h2>
			<p>This is the sidebar content. It has its own scrollbar. Scroll down to see more items!</p>
			<ul style={{ paddingLeft: '20px' }}>
				{Array.from({ length: items }, (_, i) => (
					<li key={i} style={{ marginBottom: '8px' }}>
						Sidebar Item {i + 1}
					</li>
				))}
			</ul>
			<p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
				End of sidebar content
			</p>
		</div>
	)
}

// Test main content with various heights
function MainContent({ paragraphs = 50 }: { paragraphs?: number }) {
	return (
		<div style={{ padding: '24px', maxWidth: '800px', minHeight: '100%' }}>
			<h1 style={{ marginTop: 0 }}>Main Content</h1>
			<p>
				This is the main content area. It takes up the remaining space and has its own
				scrollbar. Scroll down to see more content!
			</p>
			<div style={{
				padding: '12px',
				backgroundColor: '#fef3c7',
				borderRadius: '8px',
				marginBottom: '16px',
				border: '2px solid #fbbf24'
			}}>
				<strong>👆 Resize the sidebar:</strong> Hover over the gray bar with dots between the sidebar
				and content, then drag left or right to resize!
			</div>
			{Array.from({ length: paragraphs }, (_, i) => (
				<p key={i}>
					<strong>Paragraph {i + 1}.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
					commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur.
				</p>
			))}
			<p style={{ marginTop: '40px', fontSize: '12px', color: '#666', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
				End of content
			</p>
		</div>
	)
}

/////////////////////////////////////////////////

export const Debug: Story‿v3 = {
	args: {
		sidebar: (
			<div style={{
				padding: '20px',
				backgroundColor: '#fef3c7',
				minHeight: '100%',
				border: '3px solid #f59e0b'
			}}>
				<h2 style={{ marginTop: 0, color: '#f59e0b' }}>🎯 SIDEBAR</h2>
				<p><strong>This is the sidebar area</strong></p>
				<p>Look to the right → you should see a GRAY BAR with dots</p>
				<p><strong>👉 DRAG THAT GRAY BAR</strong> to resize this sidebar!</p>
				<div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
					The gray bar between the sidebar and content is the resize handle. It should be:
					<ul>
						<li>16px wide</li>
						<li>Gray colored (#e5e7eb)</li>
						<li>With 8 dots in the middle</li>
						<li>Full height of the screen</li>
						<li>Turns blue when you hover</li>
					</ul>
				</div>
				{Array.from({ length: 40 }, (_, i) => (
					<p key={i}>Sidebar item {i + 1}</p>
				))}
			</div>
		),
		content: (
			<div style={{
				padding: '20px',
				backgroundColor: '#dbeafe',
				minHeight: '100%',
				border: '3px solid #3b82f6'
			}}>
				<h2 style={{ marginTop: 0, color: '#3b82f6' }}>📄 CONTENT</h2>
				<p><strong>This is the main content area</strong></p>
				<p>← Look to the left for the gray resize bar with dots</p>
				{Array.from({ length: 40 }, (_, i) => (
					<p key={i}>Content paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				))}
			</div>
		),
	},
}

export const Basic: Story‿v3 = {
	args: {
		sidebar: <SidebarContent />,
		content: <MainContent />,
	},
}

export const ShortContent: Story‿v3 = {
	args: {
		sidebar: <SidebarContent items={5} />,
		content: <MainContent paragraphs={3} />,
	},
}

export const LongSidebar: Story‿v3 = {
	args: {
		sidebar: <SidebarContent items={100} />,
		content: <MainContent />,
	},
}

export const LongContent: Story‿v3 = {
	args: {
		sidebar: <SidebarContent />,
		content: <MainContent paragraphs={100} />,
	},
}

export const BothLong: Story‿v3 = {
	args: {
		sidebar: <SidebarContent items={100} />,
		content: <MainContent paragraphs={100} />,
	},
}

export const NarrowSidebar: Story‿v3 = {
	args: {
		sidebar: <SidebarContent />,
		content: <MainContent />,
		defaultSidebarWidth: 200,
		minSidebarWidth: 150,
		maxSidebarWidth: 300,
	},
}

export const WideSidebar: Story‿v3 = {
	args: {
		sidebar: <SidebarContent />,
		content: <MainContent />,
		defaultSidebarWidth: 500,
		minSidebarWidth: 300,
		maxSidebarWidth: 800,
	},
}

export const CustomLocalStorageKey: Story‿v3 = {
	args: {
		sidebar: <SidebarContent />,
		content: <MainContent />,
		localStorageKey: 'custom-layout:sidebar',
	},
}

export const RichSidebar: Story‿v3 = {
	args: {
		sidebar: (
			<div style={{ padding: '16px' }}>
				<h2 style={{ marginTop: 0 }}>Navigation</h2>
				<nav>
					<div style={{ marginBottom: '16px' }}>
						<h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
							Getting Started
						</h3>
						<ul style={{ listStyle: 'none', padding: 0 }}>
							<li style={{ marginBottom: '4px' }}>
								<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
									Introduction
								</a>
							</li>
							<li style={{ marginBottom: '4px' }}>
								<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
									Installation
								</a>
							</li>
							<li style={{ marginBottom: '4px' }}>
								<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
									Quick Start
								</a>
							</li>
						</ul>
					</div>
					<div style={{ marginBottom: '16px' }}>
						<h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
							Components
						</h3>
						<ul style={{ listStyle: 'none', padding: 0 }}>
							<li style={{ marginBottom: '4px' }}>
								<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
									Layout
								</a>
							</li>
							<li style={{ marginBottom: '4px' }}>
								<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
									Forms
								</a>
							</li>
							<li style={{ marginBottom: '4px' }}>
								<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
									Navigation
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
							Advanced
						</h3>
						<ul style={{ listStyle: 'none', padding: 0 }}>
							<li style={{ marginBottom: '4px' }}>
								<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
									API Reference
								</a>
							</li>
							<li style={{ marginBottom: '4px' }}>
								<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
									Performance
								</a>
							</li>
							<li style={{ marginBottom: '4px' }}>
								<a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
									TypeScript
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		),
		content: (
			<div style={{ padding: '24px', maxWidth: '800px' }}>
				<h1>Documentation</h1>
				<p>Welcome to the documentation. Use the sidebar to navigate through different sections.</p>
				<h2>Features</h2>
				<ul>
					<li>Resizable sidebar by dragging the edge</li>
					<li>Indexed by physical screen size (not viewport/window size)</li>
					<li>LocalStorage persistence per screen/monitor</li>
					<li>Independent scrollbars for sidebar and content</li>
					<li>Smooth drag interaction with visual feedback</li>
				</ul>
				<h2>Usage</h2>
				<p>
					The sidebar can be resized by dragging its right edge. The width is automatically
					saved to localStorage and restored when you reload the page. Different widths are
					maintained for different screen sizes based on your monitor's resolution (xs, sm, md, lg, xl, 2xl).
				</p>
				<p>
					<strong>Important:</strong> The sidebar width is indexed by screen size (monitor resolution),
					not viewport size (browser window width). This means if you have multiple monitors,
					each will remember its own sidebar width. Resizing the browser window won't change
					which width is stored/loaded - only moving to a different monitor will.
				</p>
			</div>
		),
	},
}

export const MinimalSidebar: Story‿v3 = {
	args: {
		sidebar: (
			<div style={{ padding: '16px' }}>
				<div style={{ fontSize: '12px', color: '#666' }}>☰</div>
			</div>
		),
		content: <MainContent />,
		defaultSidebarWidth: 50,
		minSidebarWidth: 50,
		maxSidebarWidth: 400,
	},
}

export const CodeEditor: Story‿v3 = {
	args: {
		sidebar: (
			<div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '12px' }}>
				<div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Files</div>
				<div style={{ paddingLeft: '8px' }}>
					<div>📁 src</div>
					<div style={{ paddingLeft: '16px' }}>
						<div>📁 components</div>
						<div style={{ paddingLeft: '16px' }}>
							<div style={{ color: '#60a5fa' }}>📄 Layout.tsx</div>
							<div>📄 Header.tsx</div>
							<div>📄 Footer.tsx</div>
						</div>
						<div>📁 utils</div>
						<div style={{ paddingLeft: '16px' }}>
							<div>📄 helpers.ts</div>
							<div>📄 hooks.ts</div>
						</div>
						<div>📄 App.tsx</div>
						<div>📄 index.tsx</div>
					</div>
					<div>📁 public</div>
					<div>📄 package.json</div>
					<div>📄 tsconfig.json</div>
				</div>
			</div>
		),
		content: (
			<div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '14px' }}>
				<div style={{ marginBottom: '16px', color: '#888' }}>src/components/Layout.tsx</div>
				<pre style={{ margin: 0, lineHeight: '1.5' }}>
					{`import React from 'react'

export default function Layout({ sidebar, content }) {
  return (
    <div className="layout">
      <div className="sidebar">
        {sidebar}
      </div>
      <div className="content">
        {content}
      </div>
    </div>
  )
}`}
				</pre>
			</div>
		),
		defaultSidebarWidth: 250,
	},
}

export const ScreenSizeDemo: Story‿v3 = {
	args: {
		sidebar: <SidebarContent items={10} />,
		content: (
			<div style={{ padding: '24px' }}>
				<h1>Screen Size vs Viewport Size</h1>
				<ScreenInfo />
				<p>
					This component stores sidebar width based on your <strong>screen size</strong> (monitor resolution),
					not your <strong>viewport size</strong> (browser window width).
				</p>
				<h2>What does this mean?</h2>
				<ul>
					<li>
						<strong>Screen Size:</strong> Your monitor's physical resolution (e.g., 1920×1080, 2560×1440).
						This doesn't change when you resize the browser window.
					</li>
					<li>
						<strong>Viewport Size:</strong> Your browser window's dimensions. This changes when you
						resize the window or toggle developer tools.
					</li>
				</ul>
				<h2>Try this:</h2>
				<ol>
					<li>Resize the sidebar to your preferred width</li>
					<li>Resize the browser window - notice the sidebar width stays the same</li>
					<li>Reload the page - your sidebar width is restored</li>
					<li>If you have multiple monitors, move this window to another monitor and reload</li>
					<li>The sidebar will adjust to the width you previously set for that monitor</li>
				</ol>
				<h2>Benefits:</h2>
				<ul>
					<li>Each monitor remembers its own optimal sidebar width</li>
					<li>Great for multi-monitor workflows</li>
					<li>Works well with different DPI/resolution monitors</li>
					<li>Browser window resizing doesn't affect your preferred layout</li>
				</ul>
			</div>
		),
	},
}

export const Dashboard: Story‿v3 = {
	args: {
		sidebar: (
			<div style={{ padding: '16px', backgroundColor: '#f9fafb', height: '100%' }}>
				<h2 style={{ marginTop: 0, fontSize: '16px' }}>Dashboard</h2>
				<div style={{ marginBottom: '16px' }}>
					<div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', marginBottom: '8px' }}>
						<div style={{ fontWeight: 'bold' }}>Overview</div>
					</div>
					<div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', marginBottom: '8px' }}>
						<div>Analytics</div>
					</div>
					<div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', marginBottom: '8px' }}>
						<div>Reports</div>
					</div>
					<div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', marginBottom: '8px' }}>
						<div>Settings</div>
					</div>
				</div>
			</div>
		),
		content: (
			<div style={{ padding: '24px' }}>
				<h1 style={{ marginTop: 0 }}>Overview</h1>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
					<div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
						<div style={{ fontSize: '12px', color: '#666' }}>Total Users</div>
						<div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>1,234</div>
					</div>
					<div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
						<div style={{ fontSize: '12px', color: '#666' }}>Revenue</div>
						<div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>$12,345</div>
					</div>
					<div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
						<div style={{ fontSize: '12px', color: '#666' }}>Active Sessions</div>
						<div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>42</div>
					</div>
				</div>
				<h2>Recent Activity</h2>
				<div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
					<div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
						<div style={{ fontWeight: 'bold' }}>New user registered</div>
						<div style={{ fontSize: '12px', color: '#666' }}>2 minutes ago</div>
					</div>
					<div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
						<div style={{ fontWeight: 'bold' }}>Payment received</div>
						<div style={{ fontSize: '12px', color: '#666' }}>15 minutes ago</div>
					</div>
					<div>
						<div style={{ fontWeight: 'bold' }}>Report generated</div>
						<div style={{ fontSize: '12px', color: '#666' }}>1 hour ago</div>
					</div>
				</div>
			</div>
		),
	},
}

/////////////////////////////////////////////////
