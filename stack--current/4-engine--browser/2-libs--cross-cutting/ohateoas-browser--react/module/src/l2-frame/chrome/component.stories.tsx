import type { Meta‿v3, Story‿v3 } from '@monorepo-private/storypad'

import { ᄆComponent } from './component.tsx'
import type { Uri‿x } from '@monorepo-private/ts--types--web'
import type { OHAHyper, OHALinkRelation, OHALinkTarget } from '@monorepo-private/ohateoas'

/////////////////////////////////////////////////

export default {
	component: ᄆComponent,
	args: {
		url: '/foo'
	},
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const Default: Story‿v3 = {}
