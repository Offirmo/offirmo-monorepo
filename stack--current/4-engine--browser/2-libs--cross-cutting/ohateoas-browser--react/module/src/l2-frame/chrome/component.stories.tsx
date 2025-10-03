import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import { ᄆComponent } from './component.tsx'
import type { Uri‿x } from '@offirmo-private/ts-types-web'
import type { OHAHyper, OHALinkRelation, OHALinkTarget } from '@offirmo-private/ohateoas'

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
