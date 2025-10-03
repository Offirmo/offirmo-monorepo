import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import { ᄆComponent } from './component.tsx'

import { createꓽserver as createꓽserverⵧhello_world } from '@offirmo-private/ohateoas/examples/01-hello_world'
//import { createꓽserver as createꓽserverⵧcfu } from '@offirmo-private/ohateoas/examples/10-check-for-updates'
//import { createꓽserver as createꓽserverⵧtbrpg } from '@offirmo-private/ohateoas/examples/30-tbrpg'
//import { createꓽserver as createꓽserverⵧhyp } from '@offirmo-private/ohateoas/examples/40-hyperspace'
//import { createꓽserver as createꓽserverⵧbroken } from '@offirmo-private/ohateoas/examples/90-errors'

/////////////////////////////////////////////////

export default {
	component: ᄆComponent,
	args: {
		url: '/',
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

/*
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
*/
