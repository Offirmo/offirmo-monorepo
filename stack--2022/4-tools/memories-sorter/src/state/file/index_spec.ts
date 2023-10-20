import { expect } from 'chai'

import { LIB } from '../../consts.js'
import {
	getꓽbest_creation_date,
	_getꓽbest_creation_date‿compact,
	getꓽbest_creation_date‿meta,
	getꓽbest_creation_date__year,
	getꓽcurrent_basename,
	getꓽcurrent_parent_folder_id,
	getꓽideal_basename,
	is_confident_in_date_enough_to__fix_fs,
	is_confident_in_date_enough_to__sort,
} from './index.js'
import {
	getꓽembedded_timezone,
	getꓽhuman_readable_timestamp_auto,
} from '../../services/better-date.js'
import { ALL_MEDIA_DEMOS } from '../../__test_shared/real_files/index.js'


import './__test_shared.js'

/////////////////////

describe(`${LIB} - file (state)`, function() {

	describe('integration', function() {

		describe('real files', function() {
			this.timeout(5000) // actual file loading and parsing

			ALL_MEDIA_DEMOS
				//.slice(5)
				.forEach(({ data: MEDIA_DEMO, getꓽphase1_state, getꓽphase2_state }, index) => {

				it(`should work up to phase 1 - #${index+1}: "${MEDIA_DEMO.BASENAME}"`, async () => {
					let state = await getꓽphase1_state()

					expect(getꓽcurrent_basename(state)).to.equal(MEDIA_DEMO.BASENAME)
					expect(getꓽcurrent_parent_folder_id(state)).to.equal('.')
				})

				it(`should work up to phase 2 - #${index+1}: "${MEDIA_DEMO.BASENAME}"`, async () => {
					let state = await getꓽphase2_state()

					expect(getꓽcurrent_basename(state), 'current bn').to.equal(MEDIA_DEMO.BASENAME)
					expect(getꓽcurrent_parent_folder_id(state), 'current parent').to.equal('.')

					expect(getꓽhuman_readable_timestamp_auto(getꓽbest_creation_date(state), 'tz:embedded')).to.deep.equal(MEDIA_DEMO.DATE__HUMAN_AUTO)

					expect(getꓽbest_creation_date__year(state), 'bcy').to.equal(MEDIA_DEMO.YEAR)
					expect(_getꓽbest_creation_date‿compact(state), 'compact').to.equal(MEDIA_DEMO.DATE__COMPACT)
					expect(getꓽembedded_timezone(getꓽbest_creation_date(state)), 'tz').to.deep.equal(MEDIA_DEMO.FINAL_TZ)

					const bcd_meta = getꓽbest_creation_date‿meta(state)
					//console.log(bcd_meta)
					expect(bcd_meta.confidence, 'confidence').to.equal(MEDIA_DEMO.CONFIDENCE)
					expect(is_confident_in_date_enough_to__fix_fs(state)).to.equal(MEDIA_DEMO.CONFIDENCE === 'primary')
					expect(is_confident_in_date_enough_to__sort(state)).to.equal(MEDIA_DEMO.CONFIDENCE !== 'junk')

					expect(getꓽideal_basename(state)).to.equal(MEDIA_DEMO.IDEAL_BASENAME)
				})
			})
		})
	})
})
