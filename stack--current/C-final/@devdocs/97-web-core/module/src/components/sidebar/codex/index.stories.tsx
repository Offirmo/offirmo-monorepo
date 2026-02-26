import type { Meta‿v3, Story‿v3 } from '@monorepo-private/storypad'
import React from 'react'
import { getꓽall } from '@devdocs/db'
import type { State } from '@devdocs/state'

import CodexSidebarTree from './index.tsx'

/////////////////////////////////////////////////

const STORY_STORAGE_KEY = '@devdocs/web-core/sidebar/codex/open-state/v1/story'

export default {
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		state: { control: false },
		nodes: { control: false },
	},
	args: {
		storageKey: STORY_STORAGE_KEY,
	},
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const Default: Story‿v3 = {
	render: (args) => {
		resetPersistence(args.storageKey ?? STORY_STORAGE_KEY)
		return <StoryFrame><CodexSidebarTree {...args} /></StoryFrame>
	},
}

export const DisabledByNodeId: Story‿v3 = {
	render: (args) => {
		resetPersistence(args.storageKey ?? STORY_STORAGE_KEY)
		return (
			<StoryFrame>
				<CodexSidebarTree
					{...args}
					state={mkState({
						disabled_nodes: ['Ethereum'],
					})}
				/>
			</StoryFrame>
		)
	},
}

export const DisabledByStatus: Story‿v3 = {
	render: (args) => {
		resetPersistence(args.storageKey ?? STORY_STORAGE_KEY)
		return (
			<StoryFrame>
				<CodexSidebarTree
					{...args}
					state={mkState({
						disabled_statuses: ['Moved', 'Withdrawn'],
					})}
				/>
			</StoryFrame>
		)
	},
}

export const DisabledSectionKeepsIntermediateParents: Story‿v3 = {
	render: (args) => {
		resetPersistence(args.storageKey ?? STORY_STORAGE_KEY)
		return (
			<StoryFrame>
				<CodexSidebarTree
					{...args}
					state={mkState({
						disabled_nodes: ['EIP-00004'],
					})}
				/>
			</StoryFrame>
		)
	},
}

export const EmptyWhenNoRoots: Story‿v3 = {
	render: (args) => {
		resetPersistence(args.storageKey ?? STORY_STORAGE_KEY)
		const noRoots = getꓽall().filter(node => node.parent_id !== null)
		return (
			<StoryFrame>
				<CodexSidebarTree
					{...args}
					nodes={noRoots}
					state={mkState()}
				/>
			</StoryFrame>
		)
	},
}

export const RestoresPersistedOpenState: Story‿v3 = {
	render: (args) => {
		const storageKey = args.storageKey ?? STORY_STORAGE_KEY
		seedPersistence(storageKey, {
			Ethereum: true,
			EIPs: true,
			'EIP-00001': false,
		})

		return (
			<StoryFrame>
				<CodexSidebarTree
					{...args}
					state={mkState()}
				/>
			</StoryFrame>
		)
	},
}

/////////////////////////////////////////////////

function StoryFrame(props: React.PropsWithChildren): React.JSX.Element {
	return (
		<div style={{ width: '100%', height: '100vh', padding: 12, boxSizing: 'border-box' }}>
			{props.children}
		</div>
	)
}

function mkState(input?: {
	disabled_nodes?: Array<string>
	disabled_statuses?: Array<string>
}): State {
	const node_settings: { [id: string]: { isꓽdisabled: true } } = {}
	for (const id of (input?.disabled_nodes ?? [])) {
		node_settings[id] = { isꓽdisabled: true }
	}
	return {
		shared: {
			node_settings,
			disabled_statuses: input?.disabled_statuses ?? [],
		},
	}
}

function resetPersistence(storageKey: string): void {
	try {
		window.localStorage.removeItem(storageKey)
	}
	catch {
		// ignore
	}
}

function seedPersistence(storageKey: string, openByKey: Record<string, boolean>): void {
	try {
		window.localStorage.setItem(storageKey, JSON.stringify(openByKey))
	}
	catch {
		// ignore
	}
}
