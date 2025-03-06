import { expect } from 'chai'
import type { RelativePath } from '@offirmo-private/ts-types'

import { LIB } from '../consts.js'
import { createꓽgraphⵧfilesystem } from '../../../__fixtures/graph--filesystem.js'

import { FileSystemNodeⳇFolder, createꓽfilesystem, insertꓽfile, upsertꓽfolder, getꓽrepresentationⵧlines } from './index.js'

/////////////////////////////////////////////////

describe(`${LIB} -- file system`, function() {

	describe('example', function() {

		it('should work', () => {
			type Graph = FileSystemNodeⳇFolder<undefined, undefined>
			const { graph, ...rest } = createꓽgraphⵧfilesystem<Graph>(
				createꓽfilesystem,
				(g: Graph, path: RelativePath) => insertꓽfile(g, path, undefined),
				upsertꓽfolder,
			)
			//console.log(graph)
			//console.log(rest)

			const lines = getꓽrepresentationⵧlines(graph)
			expect(lines).to.deep.equal(`
📁 <root>
└ 📁 foo
  ├ 📁 bar
  │ ├ 📁 gnokman
  │ └ 📄 baz.xyz
  └ 📄 gloups.xyz
`.trim().split('\n'))

			getꓽrepresentationⵧlines(graph).forEach(line => {
				console.log(line)
			})
		})
	})

	describe('getꓽrepresentationⵧlines()', function() {

		context('when the tree is empty', function() {

			it('should work', () => {
				const tree = createꓽfilesystem()
				const lines = getꓽrepresentationⵧlines(tree)
				expect(lines).to.deep.equal([ '[empty tree]' ])
			})
		})
	})
})
