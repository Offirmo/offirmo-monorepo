import type { PathⳇAny } from '@monorepo-private/ts--types'

import {
	loadꓽconfigⵧchain,
} from '@infinite-monorepo/load-config'

/////////////////////////////////////////////////

// useful to build the graph
async function loadꓽspecⵧchainⵧraw(from?: PathⳇAny): ReturnType<typeof loadꓽconfigⵧchain> {
	return await loadꓽconfigⵧchain('.monorepo', { ...(from && { from }) })
}

/////////////////////////////////////////////////

export { loadꓽspecⵧchainⵧraw }
