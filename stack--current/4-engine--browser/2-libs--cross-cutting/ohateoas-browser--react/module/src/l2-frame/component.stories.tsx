import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import { DOC_DEMO_RPG_03 } from '@offirmo-private/rich-text-format/examples'
import {
	create,
	navigate_to,
	onꓽloaded,
} from '@offirmo-private/ohateoas'

import { ᄆComponent } from './component.tsx'


/////////////////////////////////////////////////

export default {
	component: ᄆComponent,
	parameters: {
		layout: 'fullscreen'
	},
	/*
	decorators: [
		(story) => {
			document.getElementById('react-root').classList.add('o⋄full-viewport')
			return story
		},
	]*/
} satisfies Meta‿v3

/////////////////////////////////////////////////

export const Loading: Story‿v3 = {
	args: {
		state: create(),
	},
}

export const LoadingAlt: Story‿v3 = {
	args: {
		state: navigate_to(Loading.args.state, {href: '/rpg/'}),
	},
}

export const Loaded: Story‿v3 = {
	args: {
		state: onꓽloaded(LoadingAlt.args.state, DOC_DEMO_RPG_03),
	},
}
