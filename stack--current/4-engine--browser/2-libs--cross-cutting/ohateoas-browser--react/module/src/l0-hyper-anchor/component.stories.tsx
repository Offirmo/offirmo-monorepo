import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import { ᄆComponent } from './component.tsx'
import type { Uri‿x } from '@offirmo-private/ts-types-web'
import type { OHAHyper, OHALinkRelation, OHALinkTarget } from '@offirmo-private/ohateoas'

/////////////////////////////////////////////////

export default {
	component: ᄆComponent,
	args: {
		onꓽclick: l => console.log(`onꓽclick`, l)
	}
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const SimpleNoCTA: Story‿v3 = {
	args: {
		href: { href: '/foo' },
	},
}

export const SimpleWithCTA: Story‿v3 = {
	args: {
		href: { href: '/foo', hints: {
			cta: 'Foo!'
			} },
	},
}
