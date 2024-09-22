import assert from 'tiny-invariant'


import type { URI‿x, SchemeSpecificURIPart } from './types.js'


/////////////////////////////////////////////////

function getꓽscheme_specific_partⵧfrom_URLObject(url: URL): SchemeSpecificURIPart {
	throw new Error(`NIMP!`)
}

function getꓽscheme_specific_part(link: URI‿x): SchemeSpecificURIPart {
	if (typeof link !== 'string')
		return link

	return getꓽscheme_specific_partⵧfrom_URLObject(new URL(link))
}

/////////////////////////////////////////////////

export {
	getꓽscheme_specific_part
}
