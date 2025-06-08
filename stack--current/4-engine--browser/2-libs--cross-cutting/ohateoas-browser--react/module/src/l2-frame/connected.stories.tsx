import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import { ᄆComponent } from './connected.tsx'

import { createꓽserver as createꓽserverⵧcfu } from '@offirmo-private/ohateoas/examples/check-for-updates'
import { createꓽserver as createꓽserverⵧtbrpg } from '@offirmo-private/ohateoas/examples/tbrpg'
import { createꓽserver as createꓽserverⵧhyp } from '@offirmo-private/ohateoas/examples/hyperspace'
import { createꓽserver as createꓽserverⵧbroken } from '@offirmo-private/ohateoas/examples/broken'

/////////////////////////////////////////////////

export default {
	component: ᄆComponent,
	args: {
		name: '_root',
	},
	decorators: [
		(story) => {
			document.getElementById('react-root').classList.add('o⋄full-viewport')
			return story
		},
	]
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const CheckForUpdates: Story‿v3 = {
	args: {
		server: createꓽserverⵧcfu(),
	},
}

export const TBRPG: Story‿v3 = {
	args: {
		server: createꓽserverⵧtbrpg(),
	},
}

export const Hyperspace: Story‿v3 = {
	args: {
		server: createꓽserverⵧhyp(),
	},
}

export const Broken: Story‿v3 = {
	args: {
		server: createꓽserverⵧbroken(),
	},
}
