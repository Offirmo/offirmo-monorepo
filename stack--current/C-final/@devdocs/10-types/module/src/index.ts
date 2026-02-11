export const ROOT_CATEGORIES_ORDERED = [
	'Shared',
	'Bitcoin',
	'Ethereum',
	'Solana',
	'Hyperliquid',
	'Infinex',
	'Synthetix',
] as const
export type RootCategory = (typeof ROOT_CATEGORIES_ORDERED)[number]

export type NodeId = string // for readability

export type Node = {
	parent_id: NodeId | null

	id: NodeId

	name?: string // if different from id
	index_for_sorting?: number

	created_at?: Date
	updated_at?: Date
	status?: string
	links?: Array<NodeId>
	tags?: Array<string>
}
