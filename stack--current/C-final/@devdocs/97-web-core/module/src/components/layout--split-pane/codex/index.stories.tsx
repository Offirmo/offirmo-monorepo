import type { Meta‿v3, Story‿v3 } from '@monorepo-private/storypad'
import React from 'react'

import Main2 from './index.tsx'

/////////////////////////////////////////////////

const STORAGE_KEY = '@devdocs/web-core/main2/sidebar-widths/v1'

export default {
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		storageKey: STORAGE_KEY,
	},
	argTypes: {
		Sidebar: { control: false },
		Content: { control: false },
	},
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const Default: Story‿v3 = {
	render: (args) => {
		resetPersistence(STORAGE_KEY)
		return (
			<StoryFrame>
				<Main2
					{...args}
					Sidebar={<Panel label='Sidebar' lines={80} />}
					Content={<Panel label='Content' lines={140} />}
				/>
			</StoryFrame>
		)
	},
}

export const RestoresPersistedWidthForMd: Story‿v3 = {
	render: (args) => {
		seedPersistence(STORAGE_KEY, { md: 420, lg: 340 })
		return (
			<StoryFrame>
				<Main2
					{...args}
					Sidebar={<Panel label='Sidebar (seeded md=420px)' lines={80} />}
					Content={<Panel label='Content' lines={120} />}
				/>
			</StoryFrame>
		)
	},
}

export const DifferentWidthsByScreenBucket: Story‿v3 = {
	render: (args) => {
		seedPersistence(STORAGE_KEY, { sm: 220, md: 360, xl: 520 })
		return (
			<StoryFrame>
				<Main2
					{...args}
					Sidebar={<Panel label='Sidebar (sm=220 / md=360 / xl=520)' lines={120} />}
					Content={
						<Panel
							label='Content'
							lines={160}
							extra='Resize the browser viewport to switch buckets and verify restored widths.'
						/>
					}
				/>
			</StoryFrame>
		)
	},
}

/////////////////////////////////////////////////

function StoryFrame(props: React.PropsWithChildren): React.JSX.Element {
	return (
		<div style={{ width: '100%', height: '100vh' }}>
			{props.children}
		</div>
	)
}

function Panel({
	label,
	lines,
	extra,
}: {
	label: string
	lines: number
	extra?: string
}): React.JSX.Element {
	return (
		<div style={{ padding: 16 }}>
			<h3 style={{ marginTop: 0 }}>{label}</h3>
			{extra ? <p>{extra}</p> : null}
			{Array.from({ length: lines }, (_, index) => (
				<p key={index} style={{ margin: '6px 0' }}>
					{label} line {index + 1}
				</p>
			))}
		</div>
	)
}

function resetPersistence(storageKey: string): void {
	try {
		window.localStorage.removeItem(storageKey)
	}
	catch {
		// ignore
	}
}

function seedPersistence(storageKey: string, data: Record<string, number>): void {
	try {
		window.localStorage.setItem(storageKey, JSON.stringify(data))
	}
	catch {
		// ignore
	}
}
