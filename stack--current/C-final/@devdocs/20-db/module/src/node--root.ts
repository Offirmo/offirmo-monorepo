import { type Node, ROOT_CATEGORIES_ORDERED } from '@devdocs/types'

export default function get(): Array<Node> {
	return ROOT_CATEGORIES_ORDERED.map(id => ({id, parent_id: null}));
}
