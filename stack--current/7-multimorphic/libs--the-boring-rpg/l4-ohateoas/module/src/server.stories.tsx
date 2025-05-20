import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import {
	type OHABrowserRootProps,
	ᄆOHABrowserRoot,
} from '@offirmo-private/ohateoas-browser--react'

import { createꓽserver } from './server.ts'

/////////////////////////////////////////////////

export default {
	component: ᄆOHABrowserRoot,
	args: {
		url: '/',
		name: '_root',
		server: createꓽserver(),
	},
	decorators: [
		(story) => {
			document.getElementById('react-root').classList.add('o⋄full-viewport')
			return story
		},
	]
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const Default: Story‿v3 = {
}
