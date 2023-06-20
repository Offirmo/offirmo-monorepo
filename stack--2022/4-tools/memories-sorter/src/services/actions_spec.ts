import { expect } from 'chai'

import {
	get_report_to_string,
} from './actions.js'
import { LIB } from '../consts.js'

/////////////////////

describe(`${LIB} -- service -- Actions`, function() {

	describe('exec_pending_actions_recursively_until_no_more()', function () {

		it('should work')
	})

	describe('get_report_to_string()', function () {

		it('should work', () => {
			const s = getꓽreport_to_string()
			expect(s).to.include('Actions report:')
			expect(s).to.include('Aggregated counters:')
		})
	})
})
