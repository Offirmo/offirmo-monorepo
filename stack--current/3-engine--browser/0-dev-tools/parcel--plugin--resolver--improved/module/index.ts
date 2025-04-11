// https://parceljs.org/plugin-system/resolver/

import { Resolver } from '@parcel/plugin'

import * as path from 'node:path'
import assert from 'tiny-invariant'


const DEBUG = false

export default new Resolver({
	async resolve(params) {
		if (params.specifier?.endsWith('.js')) {
			if (DEBUG) {
				console.warn('@offirmo-private/parcel--plugin--resolver--improved ACTIVATING 😓')
				console.log('Params=', params)
				const { specifier, specifierType, sourcePath, resolveFrom } = params.dependency
				console.log('Dependency=', { specifier, specifierType, sourcePath, resolveFrom })
			}

			const parsed = path.parse(params.specifier)
			const ts = path.join(parsed.root, parsed.dir, parsed.name + '.ts')
			DEBUG && console.log('Remapping to=', ts)
			assert(params.dependency.resolveFrom, `Expecting resolveFrom!`)
			const realFrom = path.parse(params.dependency.resolveFrom).dir
			const filePath = path.resolve(realFrom, ts)
			DEBUG && console.log('Resolving to=', filePath)

			if (DEBUG) {
				// Parcel error output hides the latest lines
				for(let i = 0; i < 20; ++i) console.log('-')
				await new Promise(resolve => setTimeout(resolve, 5000))
			}

			return { filePath }
		}

		// no match, let the next resolver in the pipeline handle this dependency.
		// Since this plugin is a "last resort", that may cause a failure.

		if (DEBUG) {
			console.error('@offirmo-private/parcel--plugin--resolver--improved ABOUT TO FAIL')
			console.error('Params=', params)
			const { specifier, specifierType, sourcePath, resolveFrom } = params.dependency
			console.error('Dependency=', { specifier, specifierType, sourcePath, resolveFrom })
		}

		return null;
	}
})
