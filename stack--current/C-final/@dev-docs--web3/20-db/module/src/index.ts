import { type Node } from '@dev-docs--web3/types'

import getꓽroots from './node--root.ts'
import data from './node--datasources.ts'

function getꓽall(): Array<Node> {
	return [
		...getꓽroots(),
		{ id: 'Satoshi Labs', parent_id: 'Shared' },
		{ id: 'Chain Agnostic', parent_id: 'Shared' },
		...data as Node[],
	]
}

export { getꓽroots, getꓽall }

import all_statuses from './statuses.ts'
export { all_statuses }
