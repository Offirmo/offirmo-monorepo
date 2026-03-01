/**
 * TreeView Component — Full Specifications
 *
 * A state-of-the-art functional React component that displays a collapsible tree view
 * of a graph of nodes, with support for disabled nodes and persistent expand/collapse state.
 *
 * ## Data Source
 *
 * - Input: flat `Array<Node>` (typically from `getꓽall()` of `@dev-docs--web3/db`)
 * - Node shape: `{ id: NodeId, parent_id: NodeId | null, name?: string,
 *   index_for_sorting?: number, status?: string, ... }`
 * - Parent-child relationships: defined by each node's `parent_id` field
 * - Root nodes: have `parent_id === null`
 * - Children ordering: by `index_for_sorting` (default 1_000_000), then `id` alphabetically
 *
 * ## State Input
 *
 * - Type: `State` from `@dev-docs--web3/state`
 * - `state.shared.node_settings`: `{ [NodeId]: NodeSettings }` — per-node settings (isꓽdisabled, etc.)
 * - `state.shared.disabled_statuses`: `Array<string>` — status values that cause disabling
 * - The state is immutable and used directly without copying
 *
 * ## Filtering Rules
 *
 * A node is "directly disabled" if:
 *   1. `state.shared.node_settings[id]?.isꓽdisabled` is true, OR
 *   2. It has a `status` attribute AND that status is in `state.shared.disabled_statuses`
 * A node is "effectively disabled" if it or any ancestor is directly disabled.
 * Nodes WITHOUT a `status` attribute are NOT filtered by `disabled_statuses`.
 *
 * ## Main Tree Display
 *
 * - Root nodes (`parent_id === null`) are always shown unless effectively disabled
 * - If no root elements exist at all, an appropriate empty state is displayed
 * - Effectively disabled nodes and their entire subtrees are hidden from the main tree
 *
 * ## Disabled Section
 *
 * - A special collapsible "Disabled" entry at the bottom of the tree
 * - Contains ALL effectively disabled nodes, with their children
 * - Includes intermediate ancestor nodes for structural context
 * - Intermediate ancestors are marked with a distinct CSS class
 * - Shows the count of effectively disabled nodes in the label
 *
 * ## Expand/Collapse Persistence
 *
 * - Open/close state is stored in `localStorage` under a configurable key
 * - On page refresh, nodes restore their previous open/close state
 * - When a node becomes effectively disabled, its main-tree expand state is forgotten
 * - The disabled section has its own independent expand/collapse state
 *
 * ## Semantic HTML
 *
 * - `<nav>` as the root container with `aria-label`
 * - `<ul>/<li>` for list structure
 * - `<details>/<summary>` for collapsible disclosure of branch nodes
 * - `<span>` for leaf node labels
 *
 * ## CSS Classes (BEM-style, no styles applied)
 *
 * - `.tree-view` — root `<nav>` element
 * - `.tree-view__list` — top-level `<ul>`
 * - `.tree-view__node` — each `<li>` node
 * - `.tree-view__node--root` — root-level nodes
 * - `.tree-view__node--leaf` — leaf nodes (no visible children)
 * - `.tree-view__node--branch` — branch nodes (has visible children)
 * - `.tree-view__node-label` — `<summary>` or `<span>` label
 * - `.tree-view__children` — nested `<ul>` of children
 * - `.tree-view__disabled-section` — the `<details>` wrapper for disabled content
 * - `.tree-view__disabled-section-label` — the `<summary>` of the disabled section
 * - `.tree-view__node--disabled` — nodes within the disabled section
 * - `.tree-view__node--intermediate` — intermediate (non-disabled) ancestors shown for context
 * - `.tree-view__empty-state` — empty state message
 *
 * ## Props
 *
 * @param {Array<Node>} nodes — flat array of graph nodes
 * @param {State} state — application state with disabled configuration
 * @param {string} [storageKey='devdocs-tree:expanded'] — localStorage key for persistence
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import type { Node, NodeId } from '@dev-docs--web3/types'
import type { State } from '@dev-docs--web3/state'
import { getꓽall } from '@dev-docs--web3/db'

/////////////////////////////////////////////////
// Constants

const DEFAULT_STORAGE_KEY = 'devdocs-tree:expanded'
const DEFAULT_STATE: State = { shared: { node_settings: {}, disabled_statuses: [] } }
const DISABLED_SECTION_KEY = '__disabled_section__'
const DISABLED_PREFIX = '__d:'

/////////////////////////////////////////////////
// Types

interface TreeViewProps {
	nodes?: Array<Node>
	state?: State
	storageKey?: string
}

interface TreeMaps {
	nodeById: Map<NodeId, Node>
	childrenByParent: Map<NodeId | null, Array<Node>>
}

interface DisabledInfo {
	effectivelyDisabled: Set<NodeId>
	disabledSectionNodes: Set<NodeId>
}

/////////////////////////////////////////////////
// Pure computation

function buildTreeMaps(nodes: Array<Node>): TreeMaps {
	const nodeById = new Map<NodeId, Node>()
	const childrenByParent = new Map<NodeId | null, Array<Node>>()

	for (const node of nodes) {
		nodeById.set(node.id, node)
		let siblings = childrenByParent.get(node.parent_id)
		if (!siblings) {
			siblings = []
			childrenByParent.set(node.parent_id, siblings)
		}
		siblings.push(node)
	}

	for (const siblings of childrenByParent.values()) {
		siblings.sort((a, b) => {
			const ai = a.index_for_sorting ?? 1_000_000
			const bi = b.index_for_sorting ?? 1_000_000
			if (ai !== bi) return ai - bi
			return a.id.localeCompare(b.id)
		})
	}

	return { nodeById, childrenByParent }
}

function computeDisabledInfo(
	nodes: Array<Node>,
	state: State,
	{ nodeById, childrenByParent }: TreeMaps,
): DisabledInfo {
	const { node_settings, disabled_statuses } = state.shared

	// 1) Directly disabled nodes
	const directlyDisabledNodes: Array<Node> = []
	const directlyDisabledIds = new Set<NodeId>()
	for (const node of nodes) {
		const byId = !!node_settings[node.id]?.isꓽdisabled
		const byStatus = node.status !== undefined && disabled_statuses.includes(node.status)
		if (byId || byStatus) {
			directlyDisabledIds.add(node.id)
			directlyDisabledNodes.push(node)
		}
	}

	// 2) Effectively disabled = direct + all descendants
	const effectivelyDisabled = new Set<NodeId>(directlyDisabledIds)
	function markDescendants(parentId: NodeId): void {
		const children = childrenByParent.get(parentId)
		if (!children) return
		for (const child of children) {
			effectivelyDisabled.add(child.id)
			markDescendants(child.id)
		}
	}
	for (const id of directlyDisabledIds) {
		markDescendants(id)
	}

	// 3) Disabled section nodes = effectively disabled + ancestor context
	const disabledSectionNodes = new Set<NodeId>(effectivelyDisabled)
	const ancestorsTraced = new Set<NodeId>()
	for (const node of directlyDisabledNodes) {
		let parentId = node.parent_id
		while (parentId !== null) {
			if (ancestorsTraced.has(parentId)) break
			ancestorsTraced.add(parentId)
			disabledSectionNodes.add(parentId)
			const parent = nodeById.get(parentId)
			if (!parent) break
			parentId = parent.parent_id
		}
	}

	return { effectivelyDisabled, disabledSectionNodes }
}

/////////////////////////////////////////////////
// localStorage helpers

function loadExpanded(key: string, disabled: Set<NodeId>): Set<string> {
	try {
		const raw = localStorage.getItem(key)
		if (raw) {
			const ids: Array<string> = JSON.parse(raw)
			return new Set(
				ids.filter(id => {
					if (id === DISABLED_SECTION_KEY || id.startsWith(DISABLED_PREFIX)) return true
					return !disabled.has(id)
				}),
			)
		}
	} catch {
		/* ignore */
	}
	return new Set()
}

function saveExpanded(key: string, expanded: Set<string>, disabled: Set<NodeId>): void {
	try {
		const ids = Array.from(expanded).filter(id => {
			if (id === DISABLED_SECTION_KEY || id.startsWith(DISABLED_PREFIX)) return true
			return !disabled.has(id)
		})
		localStorage.setItem(key, JSON.stringify(ids))
	} catch {
		/* ignore */
	}
}

/////////////////////////////////////////////////
// Sub-components

function TreeNode({
	node,
	childrenByParent,
	effectivelyDisabled,
	expandedNodes,
	onToggle,
	isRoot,
}: {
	node: Node
	childrenByParent: Map<NodeId | null, Array<Node>>
	effectivelyDisabled: Set<NodeId>
	expandedNodes: Set<string>
	onToggle: (key: string) => void
	isRoot: boolean
}): React.JSX.Element {
	const enabledChildren = (childrenByParent.get(node.id) ?? []).filter(
		c => !effectivelyDisabled.has(c.id),
	)
	const isLeaf = enabledChildren.length === 0
	const isExpanded = expandedNodes.has(node.id)
	const label = node.name ?? node.id

	const cn = [
		'tree-view__node',
		isRoot && 'tree-view__node--root',
		isLeaf ? 'tree-view__node--leaf' : 'tree-view__node--branch',
	]
		.filter(Boolean)
		.join(' ')

	if (isLeaf) {
		return (
			<li className={cn} data-node-id={node.id}>
				<Link className="tree-view__node-label" to={`/node/${node.id}`}>{label}</Link>
			</li>
		)
	}

	return (
		<li className={cn} data-node-id={node.id}>
			<details open={isExpanded}>
				<summary
					className="tree-view__node-label"
					onClick={e => {
						e.preventDefault()
						onToggle(node.id)
					}}
				>
					<Link to={`/node/${node.id}`} onClick={e => e.stopPropagation()}>{label}</Link>
					{' '}<span className="tree-view__node-count">({enabledChildren.length})</span>
				</summary>
				{isExpanded && (
					<ul className="tree-view__children">
						{enabledChildren.map(child => (
							<TreeNode
								key={child.parent_id + ':' + child.id}
								node={child}
								childrenByParent={childrenByParent}
								effectivelyDisabled={effectivelyDisabled}
								expandedNodes={expandedNodes}
								onToggle={onToggle}
								isRoot={false}
							/>
						))}
					</ul>
				)}
			</details>
		</li>
	)
}

function DisabledTreeNode({
	node,
	childrenByParent,
	disabledSectionNodes,
	effectivelyDisabled,
	expandedNodes,
	onToggle,
}: {
	node: Node
	childrenByParent: Map<NodeId | null, Array<Node>>
	disabledSectionNodes: Set<NodeId>
	effectivelyDisabled: Set<NodeId>
	expandedNodes: Set<string>
	onToggle: (key: string) => void
}): React.JSX.Element {
	const sectionChildren = (childrenByParent.get(node.id) ?? []).filter(c =>
		disabledSectionNodes.has(c.id),
	)
	const isLeaf = sectionChildren.length === 0
	const expandKey = DISABLED_PREFIX + node.id
	const isExpanded = expandedNodes.has(expandKey)
	const label = node.name ?? node.id
	const isIntermediate = !effectivelyDisabled.has(node.id)

	const cn = [
		'tree-view__node',
		'tree-view__node--disabled',
		isLeaf ? 'tree-view__node--leaf' : 'tree-view__node--branch',
		isIntermediate && 'tree-view__node--intermediate',
	]
		.filter(Boolean)
		.join(' ')

	if (isLeaf) {
		return (
			<li className={cn} data-node-id={node.id}>
				<span className="tree-view__node-label">{label}</span>
			</li>
		)
	}

	return (
		<li className={cn} data-node-id={node.id}>
			<details open={isExpanded}>
				<summary
					className="tree-view__node-label"
					onClick={e => {
						e.preventDefault()
						onToggle(expandKey)
					}}
				>
					{label} <span className="tree-view__node-count">({sectionChildren.length})</span>
				</summary>
				{isExpanded && (
					<ul className="tree-view__children">
						{sectionChildren.map(child => (
							<DisabledTreeNode
								key={child.parent_id + ':' + child.id}
								node={child}
								childrenByParent={childrenByParent}
								disabledSectionNodes={disabledSectionNodes}
								effectivelyDisabled={effectivelyDisabled}
								expandedNodes={expandedNodes}
								onToggle={onToggle}
							/>
						))}
					</ul>
				)}
			</details>
		</li>
	)
}

/////////////////////////////////////////////////
// Main component

export function TreeView({
	nodes = getꓽall(),
	state = DEFAULT_STATE,
	storageKey = DEFAULT_STORAGE_KEY,
}: TreeViewProps): React.JSX.Element {
	const maps = useMemo(() => buildTreeMaps(nodes), [nodes])

	const { effectivelyDisabled, disabledSectionNodes } = useMemo(
		() => computeDisabledInfo(nodes, state, maps),
		[nodes, state, maps],
	)

	const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() =>
		loadExpanded(storageKey, effectivelyDisabled),
	)

	// Forget open/close state for newly disabled nodes
	useEffect(() => {
		setExpandedNodes(prev => {
			let changed = false
			const next = new Set<string>()
			for (const id of prev) {
				if (id === DISABLED_SECTION_KEY || id.startsWith(DISABLED_PREFIX)) {
					next.add(id)
				} else if (!effectivelyDisabled.has(id)) {
					next.add(id)
				} else {
					changed = true
				}
			}
			return changed ? next : prev
		})
	}, [effectivelyDisabled])

	// Persist to localStorage
	useEffect(() => {
		saveExpanded(storageKey, expandedNodes, effectivelyDisabled)
	}, [expandedNodes, storageKey, effectivelyDisabled])

	const toggleNode = useCallback((key: string) => {
		setExpandedNodes(prev => {
			const next = new Set(prev)
			if (next.has(key)) next.delete(key)
			else next.add(key)
			return next
		})
	}, [])

	const roots = maps.childrenByParent.get(null) ?? []
	const enabledRoots = roots.filter(n => !effectivelyDisabled.has(n.id))
	const disabledRoots = roots.filter(n => disabledSectionNodes.has(n.id))
	const hasDisabled = effectivelyDisabled.size > 0

	const NAV_STYLE: React.CSSProperties = {
		width: '100%',
		height: '100%',
		overflowY: 'auto',
	}

	if (enabledRoots.length === 0 && !hasDisabled) {
		return (
			<nav className="tree-view" aria-label="Document tree" data-o-component="tree-view" style={NAV_STYLE}>
				<p className="tree-view__empty-state">No documents to display.</p>
			</nav>
		)
	}

	return (
		<nav className="tree-view" aria-label="Document tree" data-o-component="tree-view" style={NAV_STYLE}>
			{enabledRoots.length > 0 ?
				<ul className="tree-view__list">
					{enabledRoots.map(root => (
						<TreeNode
							key={root.id}
							node={root}
							childrenByParent={maps.childrenByParent}
							effectivelyDisabled={effectivelyDisabled}
							expandedNodes={expandedNodes}
							onToggle={toggleNode}
							isRoot
						/>
					))}
				</ul>
			:	<p className="tree-view__empty-state">All documents are disabled.</p>}

			{hasDisabled && (
				<details
					className="tree-view__disabled-section"
					open={expandedNodes.has(DISABLED_SECTION_KEY)}
				>
					<summary
						className="tree-view__disabled-section-label"
						onClick={e => {
							e.preventDefault()
							toggleNode(DISABLED_SECTION_KEY)
						}}
					>
						Disabled ({effectivelyDisabled.size})
					</summary>
					{expandedNodes.has(DISABLED_SECTION_KEY) && (
						<ul className="tree-view__list">
							{disabledRoots.map(root => (
								<DisabledTreeNode
									key={root.id}
									node={root}
									childrenByParent={maps.childrenByParent}
									disabledSectionNodes={disabledSectionNodes}
									effectivelyDisabled={effectivelyDisabled}
									expandedNodes={expandedNodes}
									onToggle={toggleNode}
								/>
							))}
						</ul>
					)}
				</details>
			)}
		</nav>
	)
}

/////////////////////////////////////////////////
