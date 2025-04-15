import { expect } from 'chai'

import { LIB } from './consts.ts'

import { createꓽfilesystem, getꓽrepresentationⵧlines } from './index.ts'
import { createⵧroot, createⵧsub } from './__examples/foo-bar-gnokman/index.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- selectors`, function() {

	describe('getꓽrepresentationⵧlines()', function() {

		it('should work -- empty tree', () => {
			const tree = createꓽfilesystem()
			const lines = getꓽrepresentationⵧlines(tree)
			expect(lines).to.deep.equal([ '[empty tree]' ])
		})

		it('should work -- root', () => {
			const tree = createⵧroot()
			const lines = getꓽrepresentationⵧlines(tree)

			lines.forEach(line => {
				console.log(line)
			})

			expect(lines).to.deep.equal(`
📁 <root>
└ 📁 foo
├ 📁 bar
│ ├ 📁 gnokman
│ └ 📄 baz.xyz
└ 📄 gloups.xyz
`.trim().split('\n'))
		})
	})

	it('should work -- sub', () => {
		const tree = createⵧsub()
		const lines = getꓽrepresentationⵧlines(tree)

		lines.forEach(line => {
			console.log(line)
		})

		expect(lines).to.deep.equal(`
📁 <root>
└ 📁 foo
├ 📁 bar
│ ├ 📁 gnokman
│ └ 📄 baz.xyz
└ 📄 gloups.xyz
`.trim().split('\n'))
	})
})
