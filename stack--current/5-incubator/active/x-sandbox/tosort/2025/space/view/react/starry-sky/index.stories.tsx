import Component from './index'

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
		(Story) => (
			<div className="o⋄full-viewport">
				<Story />
			</div>
		),
	]
}

export const Default = {}

export const Custom = {}
