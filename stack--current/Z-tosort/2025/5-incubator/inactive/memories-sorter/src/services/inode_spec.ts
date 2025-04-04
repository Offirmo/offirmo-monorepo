import { fileURLToPath } from 'node:url'

import { expect } from 'chai'

import { LIB } from '../consts.js'
import * as fs from './inode.js'

/////////////////////

describe(`${LIB} -- service -- inode`, function() {

	describe('_is_same_inode', function () {

		it('should work', () => {
			const is_same = fs._is_same_inode(
				fileURLToPath(import.meta.url),
				fileURLToPath(import.meta.url),
				)
			expect(is_same).to.be.true
		})

		it('should correctly detect unicode-normalized path as same inode')

		it('should correctly detect fs-auto-unicode-normalized equal path as same inode')
	})
})
