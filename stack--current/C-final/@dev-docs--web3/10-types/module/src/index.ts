import type { PathⳇRelative } from '@monorepo-private/ts--types'

export const ROOT_CATEGORIES_ORDERED = [
	'Shared',

	// https://www.coingecko.com/en/categories/layer-1
	'Bitcoin',
	'Ethereum',
	'Solana',
	'Sui',
	'Zcash',
	'Hyperliquid',
	'Infinex',
	'Synthetix',
] as const
export type RootCategory = (typeof ROOT_CATEGORIES_ORDERED)[number]

/* - should be url safe
 */
export type NodeId = string

export type Node = {
	parent_id: NodeId | null

	id: NodeId

	name?: string // if different from id
	index_for_sorting?: number

	created_at?: Date
	updated_at?: Date
	status?: string
	links?: Array<NodeId> // TODO hyperlinks, prev, next, top etc.
	tags?: Array<string>

	// if this node is a file (TODO better TS)
	path‿rel?: PathⳇRelative // relative to a "data sources" folder
	original‿url?: string // if possible, link to the original source of the content ex. on the official repo
	content‿md?: string // in some rare case we want to override / set content for a node, ex. moved file
}
