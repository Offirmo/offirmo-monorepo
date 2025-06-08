import type { Meta‿v3, Story‿v3 } from './index.ts'


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	render: (args: any) => `Hi 👋`,
} satisfies Meta‿v3


/////////////////////////////////////////////////

export const Default: Story‿v3 = {}

export const Centered: Story‿v3 = {
	parameters: {
		layout: 'centered',
	}
}

export const FullScreen: Story‿v3 = {
	parameters: {
		layout: 'fullscreen',
	}
}

export const Padded: Story‿v3 = {
	parameters: {
		layout: 'padded',
	}
}

export const Bare: Story‿v3 = {
	parameters: {
		layout: 'bare',
	}
}
