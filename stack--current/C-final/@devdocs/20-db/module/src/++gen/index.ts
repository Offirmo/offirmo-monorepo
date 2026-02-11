import { lsFilesSync } from '@offirmo-private/fs--ls'
import { strict as assert } from 'node:assert'

import { createꓽfile_entry } from '@offirmo-private/file-entry'
import { ↆreadꓽfile } from '@infinite-monorepo/read-write-any-structured-file/read'

import { fileURLToPath } from 'node:url'

import * as path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATASOURCE_ROOT = path.resolve(__dirname, '../../../../../../../../../yvem/dev-docs')

const { getꓽdata_sources } = await import(path.resolve(DATASOURCE_ROOT, 'module/++gen/index.ts'))

const nodes: Array<Node> = []

getꓽdata_sources().forEach(async ({ url, path‿abs }) => {
	switch (url) {
		case 'https://github.com/bitcoin/bips.git': {
			const files = getꓽmarkup_files_from_datasource(path‿abs)

			// TODO create nodes
			break
		}

		case 'https://github.com/ChainAgnostic/CAIPs.git': {
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'CAIPs'))

			// TODO create nodes

			files.forEach(async fe => {
				const x = await ↆreadꓽfile(fe.path‿abs)
				console.log(x)
			})

			break
		}

		case 'https://github.com/ensdomains/ensips.git': {
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'ensips'))

			// TODO create nodes
			break
		}

		case 'https://github.com/ethereum/EIPs.git': {
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'EIPS'))

			// TODO create nodes
			break
		}

		case 'https://github.com/infinex-xyz/proposals.git': {
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'content/xips'))
			// TODO other files?

			// TODO create nodes
			break
		}

		case 'https://github.com/satoshilabs/slips.git': {
			const files = getꓽmarkup_files_from_datasource(path‿abs)

			// TODO create nodes
			break
		}

		case 'https://github.com/solana-foundation/solana-improvement-documents.git': {
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'proposals'))

			// TODO create nodes
			break
		}

		case 'https://github.com/Synthetixio/SIPs.git': {
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'content/sips'))
			// TODO other files?

			// TODO create nodes
			break
		}

		case 'https://bitcoin.org/': {
			// TODO 1D
			break
		}

		case 'https://hyperliquid.gitbook.io/': {
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'hyperliquid-docs/hyperliquid-improvement-proposals-hips'))

			// TODO create nodes
			break
		}

		default:
			throw new Error(`Unknown submodule URL: ${url}, please add handling!`)
	}
})

function getꓽmarkup_files_from_datasource(path‿abs: string) {
	const filesⵧall = lsFilesSync(path‿abs)

	const feⵧall = filesⵧall.map(absp => createꓽfile_entry(absp, DATASOURCE_ROOT))

	const feⵧmarkup = feⵧall.filter(
		fe =>
			fe.ext === '.md'
			|| fe.ext === '.markdown'
			|| fe.ext === '.mdoc'
			|| fe.ext === '.mediawiki',
	)

	const feⵧrelevant = feⵧmarkup.filter(fe => {
		const name = fe.basename‿no_ᐧxᐧext.toLowerCase()
		return name !== 'readme' && name !== 'index' && name !== 'contributing'
	})

	assert(
		feⵧrelevant.length >= 3,
		`Suspiciously few markup files found in ${path‿abs}, please check!`,
	)

	console.log(feⵧrelevant.map(fe => fe.basename‿no_ᐧxᐧext).sort())

	return feⵧrelevant
}
