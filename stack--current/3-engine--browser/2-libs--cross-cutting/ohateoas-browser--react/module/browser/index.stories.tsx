import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import Component from './index.tsx'

import { createꓽserver } from '@offirmo-private/ohateoas/examples/check-for-updates'

/////////////////////////////////////////////////

export default {
	component: Component
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const CheckForUpdates: Story‿v3 = {
	args: {
		server: createꓽserver(),
	},
}
/*
export const NoHyper = {

}*/
