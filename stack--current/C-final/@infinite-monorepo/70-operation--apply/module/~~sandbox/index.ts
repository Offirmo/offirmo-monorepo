
import { loadꓽspec } from '@infinite-monorepo/load-spec'
import * as StateLib from '@infinite-monorepo/state'
import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'


/////////////////////////////////////////////////


async function apply() {
	console.log(`@infinite-monorepo/apply…`)

	let state = StateLib.create()

	const spec = await loadꓽspec()
	state = StateLib.onꓽspec_loaded(state, spec)

	// TODO all root files
	// TODO nvmrc

	dumpꓽanyⵧprettified('state', state)

	//console.log(`state=`, state)
}

/////////////////////////////////////////////////

console.log(`Hi!`)

await apply()
