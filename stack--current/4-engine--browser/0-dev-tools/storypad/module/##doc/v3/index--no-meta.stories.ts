import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad/types'

import { $EXAMPLE_COMPLETE_NODE } from '@offirmo-private/rich-text-format'

/////////////////////////////////////////////////

export const String: Story‿v3 = {
	render: () => 'This is a CSF v3 story returning plain text.'
}

export const StringHtml: Story‿v3 ={
	render: () => `This is a CSF <strong>v3</strong> story returning <em><strong>HTML</strong> as a text.</em>`
}

export const RichText: Story‿v3 = {
	render: () => ({
		$content: `This is a CSF v3 story returning RichText: ⎨⎨sub⎬⎬`,
		$sub: {
			sub: $EXAMPLE_COMPLETE_NODE,
		}
	})
}

export const HtmlElement: Story‿v3 = {
	render: () => {
		const div = document.createElement('div')
		div.classList.add('foo')
		div.innerHTML = `This is a CSF <strong>v3</strong> story returning an <strong>HTMLElement</strong>.</em>` // HTML string
		return div
	}
}
