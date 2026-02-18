import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'
import type { State } from '@devdocs/state'
import { getꓽall } from '@devdocs/db'

import { TreeView } from './index.tsx'

/////////////////////////////////////////////////

const ALL_NODES = getꓽall()

function makeState(
	disabled_nodes: Array<string> = [],
	disabled_statuses: Array<string> = [],
): State {
	return {
		shared: { disabled_nodes, disabled_statuses },
	}
}

/////////////////////////////////////////////////

export default {
	component: TreeView,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta‿v3

/////////////////////////////////////////////////

// Full tree, no filtering
export const AllEnabled: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState(),
		storageKey: 'story:all-enabled',
	},
}

// Filter out Withdrawn and Stagnant proposals by status
export const DisabledByStatus: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState([], ['Withdrawn', 'Stagnant']),
		storageKey: 'story:disabled-status',
	},
}

// Filter out multiple statuses — only Final and Living remain
export const OnlyFinalAndLiving: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState([], ['Draft', 'Withdrawn', 'Stagnant', 'Moved', 'Review', 'Last Call']),
		storageKey: 'story:only-final-living',
	},
}

// Disable an entire root category by node ID
export const DisabledRootById: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState(['Solana']),
		storageKey: 'story:disabled-root',
	},
}

// Disable a subtree by node ID — ENS hidden, rest of Ethereum visible
export const SubtreeDisabledById: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState(['ENS']),
		storageKey: 'story:subtree-disabled',
	},
}

// Disable multiple root categories by node ID
export const MultipleRootsDisabled: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState(['Zcash', 'Sui', 'Hyperliquid']),
		storageKey: 'story:multi-roots-disabled',
	},
}

// Combine node ID and status filtering
export const BothDisabledTypes: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState(['ENS', 'Solana'], ['Draft', 'Withdrawn', 'Stagnant']),
		storageKey: 'story:both-disabled',
	},
}

// All root categories disabled — tests "All documents are disabled" message + disabled section
export const AllRootsDisabled: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState([
			'Shared', 'Bitcoin', 'Ethereum', 'Solana', 'Sui',
			'Zcash', 'Hyperliquid', 'Infinex', 'Synthetix',
		]),
		storageKey: 'story:all-roots-disabled',
	},
}

// Empty node list — tests empty state
export const EmptyNodeList: Story‿v3 = {
	args: {
		nodes: [],
		state: makeState(),
		storageKey: 'story:empty',
	},
}

// Disable a mid-level node — EIPs hidden but Ethereum and ENS remain
export const MidLevelDisabled: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState(['EIPs']),
		storageKey: 'story:mid-level-disabled',
	},
}

// Disable Moved status — tests intermediate parent context in disabled section
export const DisabledMovedStatus: Story‿v3 = {
	args: {
		nodes: ALL_NODES,
		state: makeState([], ['Moved']),
		storageKey: 'story:disabled-moved',
	},
}

/////////////////////////////////////////////////
