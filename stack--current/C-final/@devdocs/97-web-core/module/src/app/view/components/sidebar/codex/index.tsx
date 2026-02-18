import React from 'react'
import { getꓽall } from '@devdocs/db'
import type { State } from '@devdocs/state'
import type { Node } from '@devdocs/types'

/*
SPECIFICATIONS
- Render a semantic, collapsible tree view for a graph based on `getꓽall()` from `@devdocs/db`.
- Accept an immutable `state?: State` from `@devdocs/state` (optional; defaults to all-enabled).
- Accept optional `nodes?: ReadonlyArray<Node>` graph input (defaults to `getꓽall()`).
- Display roots (`parent_id: null`) in the main tree unless they are disabled.
- If no root exists in the graph, show an explicit empty-state message.
- Skip from the main tree:
  - nodes whose `id` is present in `state.shared.disabled_nodes`
  - nodes whose `status` is present in `state.shared.disabled_statuses` (only when `status` exists)
  - descendants of skipped nodes
- Render a dedicated "Disabled" section at the bottom with all skipped nodes, preserving ancestry:
  - disabled nodes and all descendants are listed
  - intermediary parents required to keep the skipped hierarchy are included
- Use semantic HTML and meaningful CSS classes only (no styling in this component).
- Persist open/close state across refreshes via localStorage.
- If a node becomes disabled, its persisted open/close state is removed.
- Node ids are unique and used directly as stable keys.
*/

/////////////////////////////////////////////////

const DEFAULT_STORAGE_KEY = '@devdocs/web-core/sidebar/codex/open-state/v1'
const DEFAULT_STATE: State = {
	shared: {
		disabled_nodes: [],
		disabled_statuses: [],
	},
}

export interface CodexSidebarTreeProps {
	state?: State
	nodes?: ReadonlyArray<Node>
	storageKey?: string
}

type ViewNode = {
	key: string
	node: Node
	depth: number
	isDisabled: boolean
	children: Array<ViewNode>
}

type ProjectedNode = {
	self: ViewNode
	children: Array<ProjectedNode>
}

/////////////////////////////////////////////////

export default function SidebarTree({
	state,
	nodes,
	storageKey = DEFAULT_STORAGE_KEY,
}: CodexSidebarTreeProps): React.JSX.Element {
	const effectiveNodes = React.useMemo(() => nodes ?? getꓽall(), [nodes])
	const effectiveState = state ?? DEFAULT_STATE

	const disabledNodeIds = React.useMemo(
		() => new Set(effectiveState.shared.disabled_nodes),
		[effectiveState.shared.disabled_nodes],
	)
	const disabledStatuses = React.useMemo(
		() => new Set(effectiveState.shared.disabled_statuses),
		[effectiveState.shared.disabled_statuses],
	)

	const built = React.useMemo(
		() => buildGraphTrees(effectiveNodes, disabledNodeIds, disabledStatuses),
		[effectiveNodes, disabledNodeIds, disabledStatuses],
	)

	const [openByKey, setOpenByKey] = React.useState<Record<string, boolean>>(() =>
		readOpenState(storageKey),
	)

	React.useEffect(() => {
		setOpenByKey(previous => {
			const next: Record<string, boolean> = {}
			let changed = false

			for (const key of Object.keys(previous)) {
				if (built.rememberableKeys.has(key)) {
					next[key] = previous[key]
				} else {
					changed = true
				}
			}

			return changed ? next : previous
		})
	}, [built.rememberableKeys])

	React.useEffect(() => {
		writeOpenState(storageKey, openByKey)
	}, [openByKey, storageKey])

	const isOpen = React.useCallback(
		(node: ViewNode): boolean => {
			const persisted = openByKey[node.key]
			if (typeof persisted === 'boolean') return persisted
			return node.depth === 0
		},
		[openByKey],
	)

	const toggle = React.useCallback((node: ViewNode) => {
		setOpenByKey(previous => {
			const currentlyOpen =
				typeof previous[node.key] === 'boolean' ? previous[node.key] : node.depth === 0
			if (!currentlyOpen) {
				return {
					...previous,
					[node.key]: true,
				}
			}

			const next = {
				...previous,
				[node.key]: false,
			}
			resetDescendantsToCollapsed(node, next)
			return next
		})
	}, [])

	return (
		<nav className="o-codex-tree" aria-label="Documentation tree">
			<section className="o-codex-tree__section o-codex-tree__section--active">
				<h2 className="o-codex-tree__title">Nodes</h2>
				{built.rootCount === 0 ?
					<p className="o-codex-tree__empty" role="status">
						No root node found in graph.
					</p>
				: built.activeTree.length === 0 ?
					<p className="o-codex-tree__empty" role="status">
						All root nodes are disabled.
					</p>
				:	<TreeList
						nodes={built.activeTree}
						isOpen={isOpen}
						onToggle={toggle}
						className="o-codex-tree__list o-codex-tree__list--active"
					/>
				}
			</section>

			{built.disabledTree.length > 0 ?
				<section className="o-codex-tree__section o-codex-tree__section--disabled">
					<h2 className="o-codex-tree__title">Disabled</h2>
					<TreeList
						nodes={built.disabledTree}
						isOpen={isOpen}
						onToggle={toggle}
						className="o-codex-tree__list o-codex-tree__list--disabled"
					/>
				</section>
			:	null}
		</nav>
	)
}

/////////////////////////////////////////////////

function TreeList({
	nodes,
	isOpen,
	onToggle,
	className,
}: {
	nodes: Array<ProjectedNode>
	isOpen: (node: ViewNode) => boolean
	onToggle: (node: ViewNode) => void
	className?: string
}): React.JSX.Element {
	return (
		<ol className={className}>
			{nodes.map(entry => {
				const { self, children } = entry
				const hasChildren = children.length > 0
				const immediateChildrenCount = children.length
				const expanded = hasChildren ? isOpen(self) : false
				const label = self.node.name ?? self.node.id
				const contentId = `codex-tree-children-${sanitizeId(self.key)}`

				return (
					<li
						key={self.key}
						className={[
							'o-codex-tree__item',
							self.isDisabled ? 'is-disabled' : 'is-enabled',
							hasChildren ? 'has-children' : 'is-leaf',
						].join(' ')}
					>
						{hasChildren ?
							<details open={expanded} className="o-codex-tree__details">
								<summary
									className="o-codex-tree__summary"
									aria-controls={contentId}
									onClick={event => {
										event.preventDefault()
										onToggle(self)
									}}
								>
									<span className="o-codex-tree__label">{label}</span>
									<span className="o-codex-tree__child-count">({immediateChildrenCount})</span>
									{self.node.name && self.node.name !== self.node.id ?
										<code className="o-codex-tree__id">{self.node.id}</code>
									:	null}
									{self.node.status ?
										<span className="o-codex-tree__status">{self.node.status}</span>
									:	null}
								</summary>

								<div id={contentId} className="o-codex-tree__children">
									<TreeList
										nodes={children}
										isOpen={isOpen}
										onToggle={onToggle}
										className="o-codex-tree__list o-codex-tree__list--nested"
									/>
								</div>
							</details>
						:	<div className="o-codex-tree__row">
								<span className="o-codex-tree__label">{label}</span>
								{self.node.name && self.node.name !== self.node.id ?
									<code className="o-codex-tree__id">{self.node.id}</code>
								:	null}
								{self.node.status ?
									<span className="o-codex-tree__status">{self.node.status}</span>
								:	null}
							</div>
						}
					</li>
				)
			})}
		</ol>
	)
}

/////////////////////////////////////////////////

function buildGraphTrees(
	nodes: ReadonlyArray<Node>,
	disabledNodeIds: ReadonlySet<string>,
	disabledStatuses: ReadonlySet<string>,
): {
	rootCount: number
	activeTree: Array<ProjectedNode>
	disabledTree: Array<ProjectedNode>
	rememberableKeys: Set<string>
} {
	const roots = nodes.filter(node => node.parent_id === null)
	const byParentId = new Map<string, Array<Node>>()

	for (const node of nodes) {
		if (!node.parent_id) continue
		const current = byParentId.get(node.parent_id) ?? []
		current.push(node)
		byParentId.set(node.parent_id, current)
	}

	for (const [id, list] of byParentId.entries()) {
		byParentId.set(id, sortNodes(list))
	}

	const builtRoots = roots.map(root =>
		buildNode({
			node: root,
			depth: 0,
			ancestorDisabled: false,
			ancestorIds: new Set<string>(),
			disabledNodeIds,
			disabledStatuses,
			byParentId,
		}),
	)

	const activeTree = projectActiveForest(builtRoots)
	const disabledTree = projectDisabledForest(builtRoots)

	const rememberableKeys = new Set<string>()
	walk(builtRoots, entry => {
		if (!entry.isDisabled) rememberableKeys.add(entry.key)
	})

	return {
		rootCount: roots.length,
		activeTree,
		disabledTree,
		rememberableKeys,
	}
}

function buildNode(input: {
	node: Node
	depth: number
	ancestorDisabled: boolean
	ancestorIds: Set<string>
	disabledNodeIds: ReadonlySet<string>
	disabledStatuses: ReadonlySet<string>
	byParentId: Map<string, Array<Node>>
}): ViewNode {
	const {
		node,
		depth,
		ancestorDisabled,
		ancestorIds,
		disabledNodeIds,
		disabledStatuses,
		byParentId,
	} = input

	const key = node.id
	const isDirectlyDisabled =
		disabledNodeIds.has(node.id)
		|| (node.status !== undefined && disabledStatuses.has(node.status))
	const isDisabled = ancestorDisabled || isDirectlyDisabled

	const isCycle = ancestorIds.has(node.id)
	const nextAncestorIds = new Set(ancestorIds)
	nextAncestorIds.add(node.id)

	const children =
		isCycle ?
			[]
		:	(byParentId.get(node.id) ?? []).map(child =>
				buildNode({
					node: child,
					depth: depth + 1,
					ancestorDisabled: isDisabled,
					ancestorIds: nextAncestorIds,
					disabledNodeIds,
					disabledStatuses,
					byParentId,
				}),
			)

	return {
		key,
		node,
		depth,
		isDisabled,
		children,
	}
}

function projectActiveForest(nodes: Array<ViewNode>): Array<ProjectedNode> {
	const result: Array<ProjectedNode> = []
	for (const node of nodes) {
		const projected = projectActiveNode(node)
		if (projected) result.push(projected)
	}
	return result
}

function projectActiveNode(node: ViewNode): ProjectedNode | null {
	if (node.isDisabled) return null
	return {
		self: node,
		children: projectActiveForest(node.children),
	}
}

function projectDisabledForest(nodes: Array<ViewNode>): Array<ProjectedNode> {
	const result: Array<ProjectedNode> = []
	for (const node of nodes) {
		const projected = projectDisabledNode(node)
		if (projected) result.push(projected)
	}
	return result
}

function projectDisabledNode(node: ViewNode): ProjectedNode | null {
	if (node.isDisabled) {
		return {
			self: node,
			children: node.children.map(child => projectFullNode(child)),
		}
	}

	const disabledChildren = projectDisabledForest(node.children)
	if (disabledChildren.length === 0) return null

	return {
		self: node,
		children: disabledChildren,
	}
}

function projectFullNode(node: ViewNode): ProjectedNode {
	return {
		self: node,
		children: node.children.map(child => projectFullNode(child)),
	}
}

function sortNodes(nodes: ReadonlyArray<Node>): Array<Node> {
	return [...nodes].sort((a, b) => {
		const aIndex = a.index_for_sorting ?? Number.POSITIVE_INFINITY
		const bIndex = b.index_for_sorting ?? Number.POSITIVE_INFINITY
		if (aIndex !== bIndex) return aIndex - bIndex
		return a.id.localeCompare(b.id)
	})
}

function walk(nodes: Array<ViewNode>, visitor: (node: ViewNode) => void): void {
	for (const node of nodes) {
		visitor(node)
		walk(node.children, visitor)
	}
}

function resetDescendantsToCollapsed(node: ViewNode, openByKey: Record<string, boolean>): void {
	for (const child of node.children) {
		openByKey[child.key] = false
		resetDescendantsToCollapsed(child, openByKey)
	}
}

function sanitizeId(input: string): string {
	return input.replaceAll(/[^A-Za-z0-9_-]/g, '_')
}

function readOpenState(storageKey: string): Record<string, boolean> {
	if (typeof window === 'undefined') return {}
	try {
		const raw = window.localStorage.getItem(storageKey)
		if (!raw) return {}
		const parsed = JSON.parse(raw) as Record<string, unknown>
		const next: Record<string, boolean> = {}
		for (const [key, value] of Object.entries(parsed)) {
			if (typeof value === 'boolean') next[key] = value
		}
		return next
	} catch {
		return {}
	}
}

function writeOpenState(storageKey: string, openByKey: Record<string, boolean>): void {
	if (typeof window === 'undefined') return
	try {
		window.localStorage.setItem(storageKey, JSON.stringify(openByKey))
	} catch {
		// intentionally ignore persistence failures
	}
}
