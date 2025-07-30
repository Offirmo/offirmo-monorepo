
import type { AnyPath } from '@offirmo-private/ts-types'

import type { } from '@infinite-monorepo/types'

/////////////////////////////////////////////////

function searchꓽroot(starting_point: AnyPath) {
	throw new Error(`Not implemented!`)
}

function loadꓽconfig() {
	throw new Error(`Not implemented!`)
}

/////////////////////////////////////////////////

async function apply() {
	console.log(`Applying...`)

	const config = loadꓽconfig()

	// TODO all root files
	// TODO nvmrc

}

/////////////////////////////////////////////////

console.log(`Hi!`)

await apply()
