// https://parceljs.org/plugin-system/resolver/

import { Resolver } from '@parcel/plugin'

import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

import assert from 'tiny-invariant'

const LIB = '@offirmo-private/parcel-resolver'
const DEBUG = false

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const POSSIBLY_UNRESURRECTED_OFFIRMO_MODULES = [

	// cross-cutting
	'@offirmo-private/react-error-boundary',
	'@offirmo-private/rich-text-format--to-react',
	'@offirmo-private/soft-execution-context--browser',
	'@offirmo/practical-logger-browser',
	'@offirmo/universal-debug-api-browser',
]


export default new Resolver({
	async resolve(params) {
		if (DEBUG) {
			console.warn(`[${LIB}] ACTIVATING 😓`) // sad bc this plugin is a hack
			console.log(`[${LIB}] params=`, params)
			const { specifier, specifierType, sourcePath, resolveFrom } = params.dependency
			console.log(`[${LIB}] Dependency=`, { specifier, specifierType, sourcePath, resolveFrom })
		}

		if (params.specifier?.endsWith('.js')) {
			DEBUG && console.log(`[${LIB}] Evaluating remapping js → ts…`)

			const parsed = path.parse(params.specifier)
			const ts = path.join(parsed.root, parsed.dir, parsed.name + '.ts')
			DEBUG && console.log(`[${LIB} Remapping to=`, ts)
			assert(params.dependency.resolveFrom, `Expecting params.dependency.resolveFrom!`)
			const realFrom = path.parse(params.dependency.resolveFrom).dir
			const filePath = path.resolve(realFrom, ts)
			DEBUG && console.log(`[${LIB} Resolving to=`, filePath)

			if (DEBUG) {
				// Parcel error output hides the latest lines
				for(let i = 0; i < 20; ++i) console.log('-')
				await new Promise(resolve => setTimeout(resolve, 5000))
			}

			return { filePath }
		}

		if (POSSIBLY_UNRESURRECTED_OFFIRMO_MODULES.includes(params.specifier)) {
			DEBUG && console.log(`[${LIB}] Evaluating faking an un-resurrected Offirmo module…`)

			// https://parceljs.org/plugin-system/resolver/#virtual-modules
			return {
				filePath: path.resolve(__dirname, `index.ts`),
				code: `throw new Error('This module is not yet resurrected!')`
			}
		}

		// no match, let the next resolver in the pipeline handle this dependency.
		// Since this plugin is a "last resort",this will very likely cause a failure:

		if (DEBUG) {
			console.error('@offirmo-private/parcel-resolver ABOUT TO FAIL')
			console.error('Params=', params)
			const { specifier, specifierType, sourcePath, resolveFrom } = params.dependency
			console.error('Dependency=', { specifier, specifierType, sourcePath, resolveFrom })
		}

		return null;
	}
})
