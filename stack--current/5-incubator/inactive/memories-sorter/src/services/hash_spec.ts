import { fileURLToPath } from 'node:url'

import { expect } from 'chai'

import { LIB } from '../consts.js'

import ↆgetꓽfile_hash from './hash.js'

/////////////////////

describe(`${LIB} -- service -- hash`, function() {

	describe('ↆgetꓽfile_hash()', function () {

		it('should work', async () => {
			const h = await ↆgetꓽfile_hash(fileURLToPath(import.meta.url))
			expect(h).to.be.a('string')
			expect(h).to.have.a.lengthOf(64)
		})

		it('should be stable', async () => {
			const h1 = await ↆgetꓽfile_hash(fileURLToPath(import.meta.url))
			const h2 = await ↆgetꓽfile_hash(fileURLToPath(import.meta.url))
			expect(h1).to.have.a.lengthOf(64)
			expect(h2).to.deep.equal(h1)
		})
	})
})
