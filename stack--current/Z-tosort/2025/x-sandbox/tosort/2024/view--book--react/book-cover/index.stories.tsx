import Component, { type Props } from './index.tsx'

import { COVER } from '../../model--book/__fixtures/wow-alliance-of-lordaeron/cover.ts'

export default {
	component: Component,
	//title: 'Task',
	//tags: ['autodocs'],
	//👇 Our exports that end in "Data" are not stories.
	//excludeStories: /.*Data$/,
	/*args: {
		...ActionsData,
	},*/
	decorators: [
		(Story) => {
			import('@offirmo-private/css--framework')
			return Story
		},
		/*(Story) => (
			<div className="o⋄full-viewport">
				<Story />
			</div>
		),*/
	]
}

export const WoW = {
	args: {
		cover: COVER,
	},
	title: COVER.title,
}
