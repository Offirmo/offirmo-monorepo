import { useMemo } from 'react'
import { useParams, useOutletContext, Link } from 'react-router'
import type { Node, NodeId } from '@devdocs/types'
import type { State } from '@devdocs/state'
import { getꓽall } from '@devdocs/db'

/////////////////////////////////////////////////

export function NodePage() {
	const { id } = useParams()
	const state = useOutletContext<State>()
	const allNodes = useMemo(() => getꓽall(), [])

	const { node, children, childrenAreLeaves } = useMemo(() => {
		const nodeById = new Map<NodeId, Node>()
		const childrenByParent = new Map<NodeId, Array<Node>>()

		for (const n of allNodes) {
			nodeById.set(n.id, n)
			if (n.parent_id !== null) {
				let siblings = childrenByParent.get(n.parent_id)
				if (!siblings) {
					siblings = []
					childrenByParent.set(n.parent_id, siblings)
				}
				siblings.push(n)
			}
		}

		// sort children
		for (const siblings of childrenByParent.values()) {
			siblings.sort((a, b) => {
				const ai = a.index_for_sorting ?? 1_000_000
				const bi = b.index_for_sorting ?? 1_000_000
				if (ai !== bi) return ai - bi
				return a.id.localeCompare(b.id)
			})
		}

		const node = id ? nodeById.get(id) : undefined
		if (!node) return { node: undefined, children: [], childrenAreLeaves: false }

		const disabledNodes = new Set(state.shared.disabled_nodes)
		const disabledStatuses = new Set(state.shared.disabled_statuses)

		function isDisabled(n: Node): boolean {
			return disabledNodes.has(n.id)
				|| (n.status !== undefined && disabledStatuses.has(n.status))
		}

		const enabledChildren = (childrenByParent.get(node.id) ?? []).filter(c => !isDisabled(c))

		const childrenAreLeaves = enabledChildren.length > 0
			&& enabledChildren.every(c => {
				const grandchildren = childrenByParent.get(c.id) ?? []
				return grandchildren.filter(gc => !isDisabled(gc)).length === 0
			})

		return { node, children: enabledChildren, childrenAreLeaves }
	}, [id, allNodes, state])

	if (!node) {
		return <div className="page-node page-node--not-found">Node not found: {id}</div>
	}

	return (
		<div className="page-node">
			<h1 className="page-node__title">{node.name ?? node.id}</h1>
			{node.name && node.name !== node.id && (
				<p className="page-node__id"><code>{node.id}</code></p>
			)}
			{node.status && (
				<p className="page-node__status">Status: {node.status}</p>
			)}
			{node.original‿url && (
				<p className="page-node__link">
					<a href={node.original‿url} target="_blank" rel="noopener noreferrer">Original source</a>
				</p>
			)}

			{children.length === 0 ? (
				<p className="page-node__empty">No children.</p>
			) : childrenAreLeaves ? (
				<ChildrenTable nodes={children} />
			) : (
				<ChildrenList nodes={children} />
			)}
		</div>
	)
}

/////////////////////////////////////////////////

function ChildrenList({ nodes }: { nodes: Array<Node> }) {
	return (
		<ul className="page-node__children-list">
			{nodes.map(node => (
				<li key={node.id}>
					<Link to={`/node/${node.id}`}>{node.name ?? node.id}</Link>
					{node.status && <span className="page-node__child-status"> ({node.status})</span>}
				</li>
			))}
		</ul>
	)
}

function ChildrenTable({ nodes }: { nodes: Array<Node> }) {
	const hasName = nodes.some(n => n.name && n.name !== n.id)
	const hasStatus = nodes.some(n => n.status)
	const hasTags = nodes.some(n => n.tags && n.tags.length > 0)
	const hasUrl = nodes.some(n => n['original‿url'])
	const hasCreated = nodes.some(n => n.created_at)
	const hasUpdated = nodes.some(n => n.updated_at)

	return (
		<table className="page-node__table">
			<thead>
				<tr>
					<th>ID</th>
					{hasName && <th>Name</th>}
					{hasStatus && <th>Status</th>}
					{hasTags && <th>Tags</th>}
					{hasUrl && <th>Source</th>}
					{hasCreated && <th>Created</th>}
					{hasUpdated && <th>Updated</th>}
				</tr>
			</thead>
			<tbody>
				{nodes.map(node => (
					<tr key={node.id}>
						<td><Link to={`/node/${node.id}`}>{node.id}</Link></td>
						{hasName && <td>{node.name ?? ''}</td>}
						{hasStatus && <td>{node.status ?? ''}</td>}
						{hasTags && <td>{node.tags?.join(', ') ?? ''}</td>}
						{hasUrl && (
							<td>
								{node['original‿url'] ? (
									<a href={node['original‿url']} target="_blank" rel="noopener noreferrer">link</a>
								) : ''}
							</td>
						)}
						{hasCreated && <td>{node.created_at ? formatDate(node.created_at) : ''}</td>}
						{hasUpdated && <td>{node.updated_at ? formatDate(node.updated_at) : ''}</td>}
					</tr>
				))}
			</tbody>
		</table>
	)
}

/////////////////////////////////////////////////

function formatDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date
	if (isNaN(d.getTime())) return String(date)
	return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}
