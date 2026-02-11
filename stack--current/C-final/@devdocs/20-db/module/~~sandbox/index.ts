import { type Node } from '@devdocs/types'

import {
	getꓽroots,
	getꓽall,
} from '../src/index.ts'

const ALL_NODES = getꓽall()


function log(node: Node, indent: number) {
	console.group('+ ' + (node.name ?? node.id))

	const children = ALL_NODES.filter(n => n.parent_id === node.id).sort((a, b) => {
		const aIndex = a.index_for_sorting ?? 1000000
		const bIndex = b.index_for_sorting ?? 1000000
		if (aIndex !== bIndex) {
			return aIndex - bIndex
		}

		return a.id.localeCompare(b.id)
	})
	children.forEach(child => log(child, indent + 1))

	console.groupEnd()
}
getꓽroots().forEach(node => {
	log(node, 0)
})
