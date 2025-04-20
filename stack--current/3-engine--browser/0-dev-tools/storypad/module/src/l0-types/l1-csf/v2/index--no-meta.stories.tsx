import { $EXAMPLE_COMPLETE_NODE } from '@offirmo-private/rich-text-format'

import type { Meta‿v2, Story‿v2 } from './index.ts'

export const PlainText: Story‿v2 = () => 'This is a CSF v2 story returning plain text.'

export const Html: Story‿v2 = () => `This is a CSF <strong>v2</strong> story returning <em><strong>HTML</strong> as a text.</em>`

export const RichText: Story‿v2 = () => $EXAMPLE_COMPLETE_NODE

export const React: Story‿v2 = () => (

)
