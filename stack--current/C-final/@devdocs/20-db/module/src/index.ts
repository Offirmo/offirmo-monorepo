import { type Node } from '@devdocs/types'

import getꓽroots from './node--root.ts'

function getꓽall(): Array<Node> {
	return [
		...getꓽroots(),
		{ id: 'Satoshi Labs', parent_id: 'Shared' },
		{ id: 'Chain Agnostic', parent_id: 'Shared' },
		]
}

export {
	getꓽroots,
	getꓽall,
}
