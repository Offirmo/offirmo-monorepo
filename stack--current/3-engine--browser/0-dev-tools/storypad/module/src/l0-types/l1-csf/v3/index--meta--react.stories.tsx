//import * as React from 'react'

interface Props {
	target: string
}
function Component({target = 'default'}: Props) {
	return <div>
		Hello, {target}!
	</div>
}

// Meta
export default {
	component: Component
}

export const Default = {}

export const WithTarget = {
	args: {
		target: 'special'
	}
}
