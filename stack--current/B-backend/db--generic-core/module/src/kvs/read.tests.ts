/////////////////////

import { expect, assert } from 'chai'

import { LIB } from '../consts.ts'
import get_db from '../db.ts'
import {
	get_test_base_user_01,
	get_test_base_user_02,
	cleanup as user_cleanup,
} from '../users/_test_helpers.ts'
import { create_user } from '../users/index.ts'
import { TABLE__KEY_VALUES } from './consts.ts'
import {
	create_kv_entry
} from './create.ts'
import {
	get,
	get_value,
} from './read.ts'

////////////////////////////////////

describe(`${LIB} - ${TABLE__KEY_VALUES} - read`, function() {
	before(user_cleanup)
	afterEach(user_cleanup)

	const key = 'unit-tests--kv--test-key'

	describe('get()', function () {

		it('should work when no user', async () => {
			const data = await get({
				user_id: 123456789,
				key,
			})
			//console.log(data)
			expect(data).to.be.null
		})

		it('should work when no kv entry', async () => {
			const TEST_USER1_ID = await create_user(get_test_base_user_01())

			await create_kv_entry({
				user_id: TEST_USER1_ID,
				key: 'bar',
				value: { bar: { baz: 42 }},
			})

			const data = await get({
				user_id: TEST_USER1_ID,
				key,
			})
			//console.log(data)
			expect(data).to.be.null
		})
	})

	describe('get_value()', function () {

		it('should work when no user', async () => {
			const value = await get_value({
				user_id: 123456789,
				key,
			})
			expect(value).to.be.null
		})

		it('should work when no kv entry', async () => {
			const TEST_USER1_ID = await create_user(get_test_base_user_01())

			await create_kv_entry({
				user_id: TEST_USER1_ID,
				key: 'bar',
				value: { bar: { baz: 42 }},
			})

			const value = await get_value({
				user_id: TEST_USER1_ID,
				key,
			})
			expect(value).to.be.null
		})
	})
})
