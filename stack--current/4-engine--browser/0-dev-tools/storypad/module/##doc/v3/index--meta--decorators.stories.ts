import type { Meta‿v3, Story‿v3, StoryContext } from '@monorepo-private/storypad/types'

import { decorateWithCSSDiagnostics } from '@monorepo-private/storypad/decorators/diagnostics'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	render: (args: any) => `Hi 👋 (look at the dev console)`,
	decorators: [
		(Story: unknown, context: StoryContext) => {
			console.log('Hello from Decorator Meta/1', { Story, context })
			return Story as any
		},
		(Story: unknown, context: StoryContext) => {
			console.log('Hello from Decorator Meta/2', { Story, context })
			return Story as any
		}
	],
} satisfies Meta‿v3


/////////////////////////////////////////////////

export const Default: Story‿v3 = {}

export const Some: Story‿v3 = {
	decorators: [
		(Story: unknown, context: StoryContext) => {
			console.log('Hello from Decorator Story/1', { Story, context })
			return Story as any
		},
		(Story: unknown, context: StoryContext) => {
			console.log('Hello from Decorator Story/2', { Story, context })
			import('../../../__tests/css-pollution.css')
			return Story as any
		}
	]
}

export const Diagnostics: Story‿v3 = {
	render: () => `<a href="http://insecure.local">Click me 😈</a>`,
	decorators: [
		decorateWithCSSDiagnostics
	]
}
