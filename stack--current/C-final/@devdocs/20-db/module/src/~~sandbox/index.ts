import { type Node } from '@devdocs/types'
import { NODES } from '../index.ts'

const roots = NODES.filter(n => n.parent_id === null)

function log(node: Node, indent: number) {
	console.group('+ ' + (node.name ?? node.id))

	const children = NODES.filter(n => n.parent_id === node.id).sort((a, b) => {
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
roots.forEach(node => {
	log(node, 0)
})
