import { lsFilesSync } from '@offirmo-private/fs--ls'
import { strict as assert } from 'node:assert'

import { createꓽfile_entry } from '@offirmo-private/file-entry'
import { ↆreadꓽfile } from '@infinite-monorepo/read-write-any-structured-file/read'

import { fileURLToPath } from 'node:url'

import * as path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATASOURCE_ROOT = path.resolve(__dirname, '../../../../../../../../yvem/dev-docs')

const { getꓽdata_sources } = await import(path.resolve(DATASOURCE_ROOT, 'module/++gen/index.ts'))

const nodes: Array<Node> = []

await Promise.all(getꓽdata_sources().map(({ url, path‿abs }): Promise<void> => {
	switch (url) {
		case 'https://github.com/bitcoin/bips.git': {
			nodes.push({ id: 'BIPs', parent_id: 'Bitcoin', name: 'Improvement Proposals' })
			const files = getꓽmarkup_files_from_datasource(path‿abs)

			// TODO create nodes
			break
		}

		case 'https://github.com/ChainAgnostic/CAIPs.git': {
			nodes.push({ id: 'CAIPs', parent_id: 'Chain Agnostic', name: 'Improvement Proposals' })
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'CAIPs'))

			// TODO create nodes

			break
		}

		case 'https://github.com/ensdomains/ensips.git': {
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'ensips'))

			// TODO create nodes
			nodes.push({ id: 'ENS', parent_id: 'Ethereum' })
			nodes.push({ id: 'ENSIPs', parent_id: 'ENS', name: 'Improvement Proposals' })

			break
		}

		case 'https://github.com/ethereum/EIPs.git': {
			nodes.push({ id: 'EIPs', parent_id: 'Ethereum', name: 'Improvement Proposals' })
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'EIPS'))

			files.forEach(async fe => {
				const x = await ↆreadꓽfile(fe.path‿abs)
				const { dataⵧjson: { frontmatter } } = x
				assert(!!frontmatter)

				const { title, eip, type, category, status, created: created_at } = frontmatter

				console.log(x)
				debugger

				nodes.push({
					parent_id: 'EIPs',
					id: 'EIPs',
					name: frontmatter.title,
				})
			})

			break
		}

		case 'https://github.com/infinex-xyz/proposals.git': {
			nodes.push({ id: 'XIPs', parent_id: 'Infinex', name: 'Improvement Proposals' })
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'content/xips'))
			// TODO other files?

			// TODO create nodes
			break
		}

		case 'https://github.com/satoshilabs/slips.git': {
			nodes.push({ id: 'SLIPs', parent_id: 'Satoshi Labs', name: 'Improvement Proposals' })
			const files = getꓽmarkup_files_from_datasource(path‿abs)

			// TODO create nodes
			break
		}

		case 'https://github.com/solana-foundation/solana-improvement-documents.git': {
			nodes.push({ id: 'SIPs', parent_id: 'Solana', name: 'Improvement Proposals' })
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'proposals'))

			// TODO create nodes
			break
		}

		case 'https://github.com/Synthetixio/SIPs.git': {
			nodes.push({ id: 'SIPs', parent_id: 'Synthetix', name: 'Improvement Proposals' })
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'content/sips'))
			// TODO other files?

			// TODO create nodes
			break
		}

		case 'https://bitcoin.org/': {
			//nodes.push()
			// TODO 1D
			break
		}

		case 'https://hyperliquid.gitbook.io/': {
			nodes.push({ id: 'HIPs', parent_id: 'Hyperliquid', name: 'Improvement Proposals' })
			const files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'hyperliquid-docs/hyperliquid-improvement-proposals-hips'))

			// TODO create nodes
			break
		}

		default:
			throw new Error(`Unknown submodule URL: ${url}, please add handling!`)
	}
}))

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

	//console.log(feⵧrelevant.map(fe => fe.basename‿no_ᐧxᐧext).sort())

	return feⵧrelevant
}

console.log(nodes)
