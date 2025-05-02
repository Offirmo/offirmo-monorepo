import React from 'react'

import type { Uri‿str } from '@offirmo-private/ts-types-web'
import type { OHAHyperMedia } from '@offirmo-private/ohateoas'
import renderⵧto_react from '@offirmo-private/rich-text-format--to-react'

/////////////////////////////////////////////////

interface Props {
	$doc: OHAHyperMedia
	url: Uri‿str
}

function Component({$doc}: Props) {
	if (window.oᐧextra?.flagꓽdebug_render) console.log('🔄 XXX')

	return (
		<div>
			{renderⵧto_react($doc)}
		</div>
	)
}

/////////////////////////////////////////////////

export default Component
