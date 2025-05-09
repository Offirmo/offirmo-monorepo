import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import { ᄆComponent } from './connected.tsx'

import { createꓽserver as createꓽserverⵧcfu } from '@offirmo-private/ohateoas/examples/check-for-updates'
import { createꓽserver as createꓽserverⵧtbrpg } from '@offirmo-private/ohateoas/examples/tbrpg'
import { createꓽserver as createꓽserverⵧhyp } from '@offirmo-private/ohateoas/examples/hyperspace'

/////////////////////////////////////////////////

export default {
	component: ᄆComponent,
	args: {
		url: '/',
		name: '_root',
	}
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
