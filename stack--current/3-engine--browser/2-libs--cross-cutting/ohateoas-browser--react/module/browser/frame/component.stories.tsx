import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import { DOC_DEMO_RPG_03 } from '@offirmo-private/rich-text-format/examples'
import { ᄆComponent } from './component.tsx'

/////////////////////////////////////////////////

export default {
	component: ᄆComponent
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const Default: Story‿v3 = {
	args: {
		$doc: DOC_DEMO_RPG_03,
		url: 'https://example.com',
	},
}
