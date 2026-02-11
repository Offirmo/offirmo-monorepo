import { type Node } from '@devdocs/types'

export const NODES: Array<Node> = [
	{ id: 'Shared', parent_id: null },
	{ id: 'Satoshi Labs', parent_id: 'Shared' },
	{ id: 'SLIPs', parent_id: 'Satoshi Labs', name: 'Improvement Proposals' },
	{ id: 'Chain Agnostic', parent_id: 'Shared' },
	{ id: 'CAIPs', parent_id: 'Chain Agnostic', name: 'Improvement Proposals' },

	{ id: 'Bitcoin', parent_id: null },
	{ id: 'BIPs', parent_id: 'Bitcoin', name: 'Improvement Proposals' },

	{ id: 'Ethereum', parent_id: null },
	{ id: 'EIPs', parent_id: 'Ethereum', name: 'Improvement Proposals' },

	{ id: 'Solana', parent_id: null },
	{ id: 'SIPs', parent_id: 'Solana', name: 'Improvement Proposals' },

	{ id: 'Sui', parent_id: null },

	{ id: 'Hyperliquid', parent_id: null },
	{ id: 'HIPs', parent_id: 'Hyperliquid', name: 'Improvement Proposals' },

	{ id: 'Infinex', parent_id: null },
	{ id: 'XIPs', parent_id: 'Infinex', name: 'Improvement Proposals' },

	{ id: 'Synthetix', parent_id: null },
	{ id: 'SIPs', parent_id: 'Synthetix', name: 'Improvement Proposals' },
]
