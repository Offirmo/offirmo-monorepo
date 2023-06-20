import { expect } from 'chai'
import { ExifDateTime } from 'exiftool-vendored'

import { LIB } from '../consts.js'
import {
	get_best_creation_date_from_exif,
	get_creation_timezone_from_exif,
	read_exif_data,
} from './exif.js'
import {
	get_human_readable_timestamp_auto,
	create_better_date_from_ExifDateTime,
} from './better-date.js'

import { ALL_MEDIA_DEMOS } from '../__test_shared/real_files/index.js'
import '../__test_shared/mocha_spec.js'

/////////////////////

describe(`${LIB} -- service -- exif`, function() {

	describe('ExifDatetime', function () {

		it('should have the expected API', () => {
			const out = new ExifDateTime(
				2000,
				1, // 1 = Jan
				13,
				14,
				15,
				16,
				123,
			)

			expect(out.toISOString()).to.equal('2000-01-13T14:15:16.123')
		})
	})

	describe('integration', function() {
		this.timeout(5000) // actual file loading and parsing

		describe('real files', function() {

			ALL_MEDIA_DEMOS.forEach(({ data: MEDIA_DEMO }, index) => {

				it(`should work - #${index}: "${MEDIA_DEMO.BASENAME}"`, async () => {

					const exif_data = await read_exif_data(MEDIA_DEMO.ABS_PATH)
					//console.log('exif data', exif_data)

					const EXPECTED_EXIF_DATA = MEDIA_DEMO.EXIF_DATA
					const bcd_edt = getꓽbest_creation_date_from_exif(exif_data)
					if (!EXPECTED_EXIF_DATA) {
						expect(bcd_edt).to.be.undefined
					}
					else {
						if (!bcd_edt) {
							// we have EXIF data but not containing any date
							expect(EXPECTED_EXIF_DATA.EMBEDDED_TZ).to.be.undefined
							expect(EXPECTED_EXIF_DATA.FINAL_TZ).to.be.undefined
							expect(EXPECTED_EXIF_DATA.YEAR).to.be.undefined
							expect(EXPECTED_EXIF_DATA.DATE__COMPACT).to.be.undefined
							expect(EXPECTED_EXIF_DATA.DATE__ISO_STRING).to.be.undefined
							expect(EXPECTED_EXIF_DATA.DATE__HUMAN_AUTO).to.be.undefined
						}
						else {
							expect(get_creation_timezone_from_exif(exif_data), 'TZ').to.equal(EXPECTED_EXIF_DATA.EMBEDDED_TZ)
							expect(bcd_edt!.toISOString(), 'edt iso').to.equal(EXPECTED_EXIF_DATA.DATE__ISO_STRING)
							expect(
								get_human_readable_timestamp_auto(
									create_better_date_from_ExifDateTime(bcd_edt!),
									'tz:embedded',
								),
								'date human'
							).to.equal(EXPECTED_EXIF_DATA.DATE__HUMAN_AUTO)
						}
					}
				})
			})
		})
	})
})
