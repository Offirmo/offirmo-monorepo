import type { Meta, Story } from '@offirmo-private/storypad/types'

import Component from './index.tsx'

import { EXAMPLE } from '../model--book-stash/__fixtures/index.ts'

/////////////////////////////////////////////////

export default {
	component: Component,
	args: {
		state: EXAMPLE,
	},
	decorators: [
		(stuff: any) => {
			import('@offirmo-private/css--framework')
			return stuff
		},
	]
} satisfies Meta

export const Default = {

} satisfies Story

//export const Custom = {}
