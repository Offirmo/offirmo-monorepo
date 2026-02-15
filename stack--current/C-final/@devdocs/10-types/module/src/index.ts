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

/* NodeId should be url safe
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

	content‿md?: string // in some rare case we want to override / set content for a node, ex. moved file
	original‿url?: string // when relevant, link to the original source of the content ex. on the official repo
}
