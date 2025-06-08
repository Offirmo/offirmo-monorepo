import type { Meta, Story } from '@offirmo-private/storypad/types'

import type { NodeLike } from '@offirmo-private/rich-text-format'

import renderⵧto_react from './index.tsx'

/////////////////////////////////////////////////

type Props = {
	$doc: NodeLike
}
function Component({ $doc }: Props) {
	return renderⵧto_react($doc)
}

/////////////////////////////////////////////////

import {
	$EXAMPLE_COMPLETE_NODE,

	DOC_DEMO_BASE_TYPES,
	DOC_DEMO_LIST_ORDERED,
	DOC_DEMO_LIST_UNORDERED,
	DOC_DEMO_LIST_NESTED,
	DOC_DEMO_ADVANCED_TYPES,
	DOC_DEMO_HINTS,

	DOC_DEMO_RPG_01,
	DOC_DEMO_RPG_02,
	DOC_DEMO_RPG_03,
	DOC_DEMO_INVENTORY,
} from '@offirmo-private/rich-text-format/examples'

export default {
	component: Component,
	decorators: [
		(stuff: any) => {
			import('@offirmo-private/css--framework')
			return stuff
		},
	]
} satisfies Meta

export const NodelikeString = { args: { $doc: "Hello!" }} satisfies Story
export const NodelikeNumber = { args: { $doc: 42 }} satisfies Story

export const COMPLETE_NODE = { args: { $doc: $EXAMPLE_COMPLETE_NODE }} satisfies Story

export const BASE_TYPES = { args: { $doc: DOC_DEMO_BASE_TYPES }} satisfies Story
export const LIST_ORDERED = { args: { $doc: DOC_DEMO_LIST_ORDERED }} satisfies Story
export const LIST_UNORDERED = { args: { $doc: DOC_DEMO_LIST_UNORDERED }} satisfies Story
export const LIST_NESTED = { args: { $doc: DOC_DEMO_LIST_NESTED }} satisfies Story
export const ADVANCED_TYPES = { args: { $doc: DOC_DEMO_ADVANCED_TYPES }} satisfies Story
export const HINTS = { args: { $doc: DOC_DEMO_HINTS }} satisfies Story

export const RPG_01 = { args: { $doc: DOC_DEMO_RPG_01 }} satisfies Story
export const RPG_02 = { args: { $doc: DOC_DEMO_RPG_02 }} satisfies Story
export const RPG_03 = { args: { $doc: DOC_DEMO_RPG_03 }} satisfies Story
export const INVENTORY = { args: { $doc: DOC_DEMO_INVENTORY }} satisfies Story
