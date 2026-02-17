import { lsFilesSync } from '@offirmo-private/fs--ls'
import { strict as assert } from 'node:assert'

import { createꓽfile_entry } from '@offirmo-private/file-entry'
import { ↆreadꓽfile } from '@infinite-monorepo/read-write-any-structured-file/read'
import {
	type StructuredFileFormat,
	ೱwriteꓽfile,
} from '@infinite-monorepo/read-write-any-structured-file/write'
import { type Node } from '@devdocs/types'

import { fileURLToPath } from 'node:url'

import * as path from 'node:path'
import type { AnyFilePath, Immutable, JSONObject } from '@offirmo-private/ts-types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATASOURCE_ROOT = path.resolve(__dirname, '../../../../../../../../yvem/dev-docs')

const { getꓽdata_sources } = await import(path.resolve(DATASOURCE_ROOT, 'module/++gen/index.ts'))

const nodes: Array<Node> = []
const statuses = new Set()

await Promise.all(
	getꓽdata_sources().map(async ({ url, path‿abs }): Promise<void> => {
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

				const eip_files = getꓽmarkup_files_from_datasource(path.resolve(path‿abs, 'EIPS'))
				const eip_nodes: Array<Node> = await Promise.all(
					eip_files.map(async fe => {
						const original‿url = `${url.replace('.git', '/blob/master/EIPS')}/${fe.basename}`
						const x = await ↆreadꓽfile(fe.path‿abs)
						const {
							dataⵧjson: { frontmatter },
						} = x
						//console.log(fe, frontmatter)
						assert(!!frontmatter, `EIP should have a frontmatter!`)

						let {
							title,
							eip: eip_index,
							type,
							category,
							status = 'unknown',
							created: created_at,
						} = frontmatter
						assert(!!eip_index, `EIP should have an index!`)

						status = status.toLowerCase().trim()
						statuses.add(status)

						const id = `EIP-${String(eip_index).padStart(5, '0')}`
						const node: Node = {
							parent_id: 'EIPs',
							id,
							...(frontmatter.title && { name: `${id} ${frontmatter.title}` }),
							index_for_sorting: eip_index,
							created_at,
							status,
							links: [],
							tags: [type, category],
							original‿url,
						}

						return node
					}),
				)

				// post process
				eip_nodes.sort((na, nb) => {
					const ia = na.index_for_sorting ?? Math.INFINITY
					const ib = nb.index_for_sorting ?? Math.INFINITY
					if (ia !== ib) {
						return ia - ib
					}

					// TODO created at?

					return na.id.localeCompare(nb.id)
				})
				nodes.push(...eip_nodes)

				// TODO ERCs
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
				const files = getꓽmarkup_files_from_datasource(
					path.resolve(path‿abs, 'hyperliquid-docs/hyperliquid-improvement-proposals-hips'),
				)

				// TODO create nodes
				break
			}

			default:
				throw new Error(`Unknown submodule URL: ${url}, please add handling!`)
		}
	}),
)

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

await ೱwriteꓽfile(path.resolve(__dirname, '../src/node--datasources.ts'), nodes)

await ೱwriteꓽfile(
	path.resolve(__dirname, '../src/statuses.ts'),
	Array.from(statuses.values()).sort(),
)
