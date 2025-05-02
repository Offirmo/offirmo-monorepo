import React from 'react'

import type { Uri‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

interface Props {
	url: Uri‿str
}

function Component({url}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log('🔄 XXX')

	return (
		<div>
			<button>🏠</button>
			<button>⏪</button>
			<button>⏩</button>
			<button>🔃</button>
			<code>{url}</code>
		</div>
	)
}

/////////////////////////////////////////////////

export default Component
