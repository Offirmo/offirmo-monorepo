import assert from 'tiny-invariant'
import { normalizeError } from '@offirmo/error-utils'
import { exiftool, Tags, ExifDateTime } from 'exiftool-vendored'
import { type Immutable, HashOf } from '@monorepo-private/ts--types'
import micro_memoize from 'micro-memoize'
import { enforceꓽimmutable } from '@monorepo-private/state-utils'

import { AbsolutePath, TimeZone } from '../types.js'
import {
	LegacyDate,
	create_better_date_from_ExifDateTime,
	getꓽdebug_representation,
	getꓽembedded_timezone,
	are_same_tms_date_with_potential_tz_difference,
	are_tms_within_24h_of_each_other,
} from './better-date.js'
import logger from './logger.js'
import { TimestampUTCMs } from '@monorepo-private/timestamps'

/////////////////////////////////////////////////

/** ☆☆☆☆ ✔ Example: 1 */
//TimeZoneOffset?: number;
/** ★★★★ ✔ Example: 2218-09-22T02:32:14.000 */
//CreateDate?: ExifDateTime;
/** ★★★★ ✔ Example: 2218-09-22T02:32:14.000 */
//DateTimeOriginal?: ExifDateTime;
/** ☆☆☆☆ ✔ Example: 2020-07-08 */
//GPSDateStamp?: ExifDate;
/** ☆☆☆☆   Example: 2006-12-19 */
//DateCreated?: ExifDate;
/** ☆☆☆☆ ✔ Example: 2019-07-20T19:21:25.000-07:00 */
//DateTimeCreated?: ExifDateTime;
/** ☆☆☆☆ ✔ Example: 2019-05-25 */
//DigitalCreationDate?: ExifDate;
/** ☆☆☆☆ ✔ Example: 13:39:28 */
//DigitalCreationTime?: ExifTime;
/** ☆☆☆☆   Example: 2013-03-12T16:31:26.000 */
//DateTimeGenerated?: ExifDateTime;
/** ☆☆☆☆ ✔ Example: 2017-02-12T10:28:20.000 */
//MediaCreateDate?: ExifDateTime;

// undocumented in exiftool but seen in exif data and being more reliable than other fields (ex. iphone IMG_0170.MOV)
const EXIF_DATE_FIELD__CREATION_DATE = 'CreationDate' as keyof Tags

// documented but seen it very wrong in a few imgs  ex. IMG_20170124_125515_bad_exif.jpg
const EXIF_DATE_FIELD__CREATE_DATE = 'CreateDate' as keyof Tags

const EXIF_DATE_FIELDS: Array<keyof Tags> = [
	EXIF_DATE_FIELD__CREATION_DATE,

	// https://github.com/photostructure/exiftool-vendored.js#dates
	'SubSecCreateDate',
	'SubSecDateTimeOriginal',
	EXIF_DATE_FIELD__CREATE_DATE,
	//'ModifyDate',
	'DateTimeOriginal',
	//'GPSDateStamp',
	//'DateCreated',
	//'DateTimeCreated',
	//'DigitalCreationDate',
	//'DigitalCreationTime',
	'DateTimeGenerated',
	'MediaCreateDate',
	//'GPSDateTime', // seems to not be as precise TODO use it if no other valid field
	'TrackCreateDate', // seen on movies, usually == CreateDate but sometimes yields a better date
]

// we won't rely on those, but we use them for cross-checks
const FS_DATE_FIELDS: Array<keyof Tags> = [
	'FileModifyDate',
	'FileAccessDate',
	'FileInodeChangeDate',
]

const EXIF_FIELD__TZ = 'tz' as keyof Tags
const EXIF_FIELD__ORIENTATION = 'Orientation' as keyof Tags
const EXIF_FIELD__SOURCEFILE = 'SourceFile' as keyof Tags
const EXIF_FIELD_ERRORS = 'errors' as keyof Tags

const USEFUL_FIELDS = [
	EXIF_FIELD__TZ,
	EXIF_FIELD__ORIENTATION,
	EXIF_FIELD__SOURCEFILE,
	EXIF_FIELD_ERRORS,
	...EXIF_DATE_FIELDS,
	...FS_DATE_FIELDS,
]

////////////////////////////////////

export async function readꓽexif_data(abs_path: AbsolutePath): Promise<Immutable<Tags>> {
	//console.log('??? readꓽexif_data()…', abs_path)
	return exiftool.read(abs_path)
		.then(_exif_data => {
			// cleanup of unused fields to save RAM
			const exif_data: Tags = {}
			;(Object.keys(_exif_data) as Array<keyof Tags>).forEach(k => {
				if (USEFUL_FIELDS.includes(k)) {
					;(exif_data as any)[k] = _exif_data[k]
				}
			})

			return enforceꓽimmutable(exif_data)
		})
}

////////////////////////////////////

// TODO memory optim getꓽrelevant_exif_subset

function _getꓽvalid_exifdate_field(field: keyof Tags, exif_data: Immutable<Tags>, { DEBUG }: { DEBUG: boolean }): undefined | ExifDateTime {
	const SourceFile = exif_data[EXIF_FIELD__SOURCEFILE]
	let raw_exiftool_date: undefined | any = exif_data[field]
	DEBUG && console.log(`_getꓽvalid_exifdate_field("${field}"): raw = ${raw_exiftool_date}`)
	if (!raw_exiftool_date) return undefined

	const now_legacy = new LegacyDate()
	DEBUG && console.log(`_getꓽvalid_exifdate_field("${field}"): FYI`, { exif_tz: exif_data[EXIF_FIELD__TZ], now_legacy })

	// https://github.com/photostructure/exiftool-vendored.js/issues/73
	// "If date fields aren't parsable, the raw string from exiftool will be provided."
	if (typeof raw_exiftool_date === 'string') {
		if (raw_exiftool_date === '0000:00:00 00:00:00') {
			// happens a lot, cut the noise
		}
		else {
			logger.warn(`un-parsable exif date`, { SourceFile, field, raw_exiftool_date })
			// TODO use our own better parser
			//WARN   › un-parsable exif date {'SourceFile': '…circa--2010/- 2016/2016/20161119 - weekend/MM2016-12-10_10h56m48_IMG_0135.jpg','field': 'CreateDate','raw_exiftool_date': '2016-12-10_16:56:49'}
			//WARN   › un-parsable exif date {'SourceFile': '…circa--2010/- 2016/2016/20161119 - weekend/MM2016-12-10_10h56m48_IMG_0135.jpg','field': 'DateTimeOriginal','raw_exiftool_date': '2016-12-10_16:56:49'}
		}
		return undefined
	}

	let exiftool_date: ExifDateTime = raw_exiftool_date
	DEBUG && console.log(`_getꓽvalid_exifdate_field("${field}"): seems we have an ExifDateTime (pending further validation):`, {
		exiftool_date,
		...(!!exiftool_date.toDate && {
			toDate: exiftool_date.toDate(),
		}),
	})

	// seen 1/1/00 = meaningless TODO filter out?

	if (field === 'GPSDateTime' && exiftool_date.tzoffsetMinutes === 0) {
		// "GPSDateTime" seems to always be in UTC. If we inferred a TZ, try to enrich it
		const tz = exif_data[EXIF_FIELD__TZ]
		if (tz) {
			DEBUG && console.log(`  - ${field}: reparsing with better tz…`, { tz })
			assert(raw_exiftool_date.rawValue, 'exif date has raw value')
			const reparsed_exiftool_date = ExifDateTime.fromEXIF(raw_exiftool_date.rawValue, tz as string)
			assert(reparsed_exiftool_date, 'reparsed date success')
			exiftool_date = reparsed_exiftool_date
		}
	}

	if (exiftool_date.tzoffsetMinutes === undefined) {
		DEBUG && console.warn(`_getꓽvalid_exifdate_field("${field}"): missing tz…`, { SourceFile, field })
		// TODO find a real example of a tz fixable with this method
		// we'd rather not botcher things without it.
		/*
		const auto_tz = exif_data[EXIF_FIELD__TZ] ?? undefined //getꓽtimezoneⵧdefault(getꓽtimestamp_ms_from_ExifDateTime(exiftool_date))
		if (auto_tz) {
			DEBUG && console.log(`  - #${index}: reparsing with better tz…`, { auto_tz })
			assert(raw_exiftool_date.rawValue, 'exif date has raw value')
			const reparsed_exiftool_date = ExifDateTime.fromEXIF(raw_exiftool_date.rawValue, auto_tz)
			assert(reparsed_exiftool_date, 'reparsed date success')
			exiftool_date = reparsed_exiftool_date
		}*/
	}

	// further validate the date
	try {
		const date = exiftool_date.toDate()
		assert(date && date.getFullYear, `_getꓽvalid_exifdate_field("${field}") has correct shape (1)`)
		assert(+date, `_getꓽvalid_exifdate_field("${field}") has correct shape (2)`)
		assert(+date < +now_legacy, `_getꓽvalid_exifdate_field("${field}") value is ok compared to now`) // seen when recent photo and wrong default timezone => photo in the future
	}
	catch (_err) {
		const err = normalizeError(_err)
		logger.fatal('error reading EXIF date', {
			SourceFile,
			field,
			klass: exiftool_date.constructor.name,
			date_object: exiftool_date,
			err,
		})
		err.message = 'error reading EXIF date: ' + err.message
		throw err
	}

	return exiftool_date
}

function _intelligently_getꓽearliest_defined_date_from_selected_fields_of_exif_data(fields: Array<keyof Tags>, exif_data: Immutable<Tags>, { DEBUG }: { DEBUG: boolean }): ExifDateTime | undefined {
	const SourceFile = exif_data[EXIF_FIELD__SOURCEFILE]
	DEBUG && console.log(`_getꓽearliest_defined_date_from_selected_fields_of_exif_data() starting…`, { SourceFile })

	const now_legacy = new LegacyDate()
	DEBUG && console.log(`- FYI`, { fields, exif_tz: exif_data[EXIF_FIELD__TZ], now_legacy })

	DEBUG && console.log('- filtering defined candidates…')
	// TODO we could also give priority to dates having a tz, however never seen a real case of mixing tz / non tz
	// TODO we could also give priority to dates matching the fs
	const candidate_exifdates: HashOf<ExifDateTime> = fields.reduce((acc: HashOf<ExifDateTime>, field, index) => {
		DEBUG && console.log(`  - #${index}: reading "${field}"…`)

		let exiftool_date: ExifDateTime | undefined = _getꓽvalid_exifdate_field(field, exif_data, { DEBUG })
		if (exiftool_date)
			acc[field] = exiftool_date

		return acc
	}, {} as HashOf<ExifDateTime>)

	if (Object.keys(candidate_exifdates).length === 0) {
		return undefined
	}

	DEBUG && console.log('- selecting the best candidate…')
	let min_date_origin_field: string | null = null
	let confirmation_count = 0
	const min_dateⳇexif: ExifDateTime = Object.keys(candidate_exifdates).reduce((min_dateⳇexif: ExifDateTime, field) => {
		const candidate_dateⳇexif = candidate_exifdates[field]
		const candidate_field = field // for logging

		if (!min_dateⳇexif) {
			min_date_origin_field = field
			return candidate_dateⳇexif
		}

		// select this one or keep the previous?
		const candidate_dateⳇtms = getꓽtimestamp_ms_from_ExifDateTime(candidate_dateⳇexif)
		const min_dateⳇtms = getꓽtimestamp_ms_from_ExifDateTime(min_dateⳇexif)
		if (candidate_dateⳇtms === min_dateⳇtms) {
			// no change TODO switch the field if better
			confirmation_count++
			return min_dateⳇexif
		}

		const is_current_date_earlier = candidate_dateⳇtms < min_dateⳇtms
		// in EXIF, some date fields are rounded to the second
		// while alternative fields are more precise
		// since 0 < xyz ms, we use a special detection to preserve the millis
		const min_has_millis = !!(min_dateⳇtms % 1000)
		const candidate_has_millis = !!(candidate_dateⳇtms % 1000)
		const is_candidate_date_same_but_more_precise =
			Math.floor(candidate_dateⳇtms/1000.) === Math.floor(min_dateⳇtms/1000.)
			&& !min_has_millis
			&& candidate_has_millis
		const is_candidate_same_but_less_precise =
			Math.floor(candidate_dateⳇtms/1000.) === Math.floor(min_dateⳇtms/1000.)
			&& min_has_millis
			&& !candidate_has_millis
		const are_within_24h = are_tms_within_24h_of_each_other(candidate_dateⳇtms, min_dateⳇtms)
		DEBUG && console.log(`  - comparing to acc:`, {
			candidate_date_tms: candidate_dateⳇtms,
			min_date_tms: min_dateⳇtms,
			is_current_date_earlier,
			is_candidate_date_same_but_more_precise,
			is_candidate_same_but_less_precise,
		})
		if (!are_within_24h && !FS_DATE_FIELDS.includes(field as keyof Tags)) {
			const is_known_unreliable_field = [candidate_field, min_date_origin_field].includes(EXIF_DATE_FIELD__CREATE_DATE)
			logger[is_known_unreliable_field ? 'log' : 'warn']('Internal EXIF discrepancy', {
				SourceFile,
				candidate_field,
				min_date_origin_field,
				candidate: getꓽdebug_representation(candidate_dateⳇtms),
				min: getꓽdebug_representation(min_dateⳇtms),
			})
			if (is_known_unreliable_field) {
				// experimentally seen EXIF_DATE_FIELD__CREATE_DATE to be unreliable
				// we drop it under certain conditions
				logger.log(`discarding unreliable EXIF field "${EXIF_DATE_FIELD__CREATE_DATE}" on confirmed suspicion`, {
					SourceFile,
					candidate_field,
					min_date_origin_field,
					candidate: getꓽdebug_representation(candidate_dateⳇtms),
					min: getꓽdebug_representation(min_dateⳇtms),
				})
				if (field === EXIF_DATE_FIELD__CREATE_DATE) {
					return min_dateⳇexif
				}
				else {
					confirmation_count = 0
					min_date_origin_field = field
					return candidate_dateⳇexif
				}
			}
		}
		if (is_candidate_date_same_but_more_precise || (is_current_date_earlier && !is_candidate_same_but_less_precise)) {
			DEBUG && console.log(`  - switching`)
			const previous_confirmation_count = confirmation_count
			confirmation_count = are_within_24h
				? confirmation_count + 1
				: 0
			if (previous_confirmation_count && !confirmation_count) {
				logger.warn('Internal EXIF abandoning a cross-confirmed date. is it correct?', {
					SourceFile,
					candidate_field,
					min_date_origin_field,
					previous_confirmation_count,
					candidate: getꓽdebug_representation(candidate_dateⳇtms),
					min: getꓽdebug_representation(min_dateⳇtms),
				})
			}
			min_date_origin_field = field
			return candidate_dateⳇexif
		}

		confirmation_count = are_within_24h
			? confirmation_count + 1
			: 0
		return min_dateⳇexif
	}, null as any as ExifDateTime)

	assert(min_dateⳇexif, 'min_dateⳇexif should exist since fields found')

	DEBUG && console.log(`- final result`, {
		min_dateⳇexif,
		tms: getꓽtimestamp_ms_from_ExifDateTime(min_dateⳇexif),
		min: getꓽdebug_representation(create_better_date_from_ExifDateTime(min_dateⳇexif)),
	})

	assert(getꓽtimestamp_ms_from_ExifDateTime(min_dateⳇexif) !== +now_legacy, 'coherent dates') // TODO improve test by taking the date on exec start

	return min_dateⳇexif
}

function _getꓽcreation_date_from_exif__nocache(exif_data: Immutable<Tags>): ExifDateTime | undefined {
	const SourceFile = exif_data[EXIF_FIELD__SOURCEFILE]
	const DEBUG = false
	DEBUG && console.log(`getꓽcreation_date_from_exif() starting…`, { SourceFile })

	// if only exif data was reliable… 😭😭😭
	// unfortunately we encountered several cases of the exif data being botched
	// ex. WhatsApp seems to strip or to remove the timezone
	// ex. iPhones seems to have different dates with erroneous ones
	// ex. strange cameras mixing good dates with bad ones? (suspicion)
	// In this method we try to intelligently figure out the real date.

	//console.log(exif_data)

	// unreliable in itself, but useful as a cross-validation
	const earliest_date_from_fs𖾚exif: ExifDateTime | undefined = _intelligently_getꓽearliest_defined_date_from_selected_fields_of_exif_data(
		FS_DATE_FIELDS,
		exif_data,
		{
			DEBUG,
		},
	)

	// this undocumented key has been seen as the most reliable in some iPhone photos,
	// however we'll cross-validate it before using it
	const date_from_CreationDate𖾚exif: ExifDateTime | undefined = _getꓽvalid_exifdate_field(
		EXIF_DATE_FIELD__CREATION_DATE,
		exif_data,
		{
			DEBUG,
		},
	)

	// normal algorithm
	let candidate_date𖾚exif: ExifDateTime | undefined = _intelligently_getꓽearliest_defined_date_from_selected_fields_of_exif_data(
		EXIF_DATE_FIELDS,
		exif_data,
		{
			DEBUG,
		},
	)

	if (!candidate_date𖾚exif) {
		// no date in EXIF Data.
		// seen happening on
		// - edited jpg
		// - imaged received through WhatsApp then saved = exif dates are stripped
		// TODO add to file log
		//logger.warn('EXIF compatible file has no usable EXIF date', { SourceFile })
		return undefined
	}

	// we have candidates, let's cross-check them
	if (date_from_CreationDate𖾚exif) {
		if (!are_same_tms_date_with_potential_tz_difference(
			getꓽtimestamp_ms_from_ExifDateTime(candidate_date𖾚exif),
			getꓽtimestamp_ms_from_ExifDateTime(date_from_CreationDate𖾚exif),
		)) {
			logger.warn('EXIF compatible file has EXIF dates discrepancy!', {
				SourceFile,
				candidate: _to_debug(candidate_date𖾚exif),
				from_creation_date: _to_debug(date_from_CreationDate𖾚exif),
				candidate_tms: getꓽtimestamp_ms_from_ExifDateTime(candidate_date𖾚exif),
				from_creation_date_tms: getꓽtimestamp_ms_from_ExifDateTime(date_from_CreationDate𖾚exif),
			})
			// we have seen CreationDate to be more reliable
			candidate_date𖾚exif = date_from_CreationDate𖾚exif
		}
	}

	if (candidate_date𖾚exif.tzoffsetMinutes === undefined) {
		// seen in WhatsApp movies (.mov, .mp4)
		// the exif date is propagated but the timezone is stripped, leading to a wrong date
		// HOWEVER the file date happens to be correct. Attempt to fix the exif date that way...

		if (earliest_date_from_fs𖾚exif && earliest_date_from_fs𖾚exif.tzoffsetMinutes !== undefined
			&& are_same_tms_date_with_potential_tz_difference(getꓽtimestamp_ms_from_ExifDateTime(earliest_date_from_fs𖾚exif), getꓽtimestamp_ms_from_ExifDateTime(candidate_date𖾚exif))) {
			// perfect, the FS date is perfectly matching + has a tz
			candidate_date𖾚exif = earliest_date_from_fs𖾚exif
			const bd = create_better_date_from_ExifDateTime(candidate_date𖾚exif)
			/*logger.info(`✔️️ _getꓽcreation_date_from_exif__nocache() recovered missing TZ thanks to fs date.`, {
				SourceFile,
				//tms1: getꓽtimestamp_ms_from_ExifDateTime(earliest_date_from_fs𖾚exif),
				//tms2: getꓽtimestamp_ms_from_ExifDateTime(candidate_date𖾚exif),
				tz: getꓽembedded_timezone(bd),
				local: getꓽdebug_representation(bd),
			})*/
		}
		else {
			DEBUG && console.warn('candidate exif date has no tz…', { SourceFile })
		}
	}

	return candidate_date𖾚exif
}

const getꓽbest_creation_date_from_exif = micro_memoize(function getꓽbest_creation_date_from_exif(exif_data: Immutable<Tags>): ExifDateTime | undefined {
	const SourceFile = exif_data[EXIF_FIELD__SOURCEFILE]
	assert(SourceFile, `getꓽcreation_date_from_exif() exif data should have SourceFile!`)

	return _getꓽcreation_date_from_exif__nocache(exif_data)
}, {
	//maxSize: 10,
})

function getꓽcreation_timezone_from_exif(exif_data: Immutable<Tags>): TimeZone | undefined {
	// TODO extract a better tz from GPS?
	const res = exif_data[EXIF_FIELD__TZ]
	assert(typeof res === 'string' || typeof res === 'undefined', 'exif_data.tz type check')
	return res
}

function has_errors(exif_data: Immutable<Tags>): boolean {
	return (!!exif_data.errors) && (exif_data.errors.length > 0)
}

// useful when reading EXIF on files we're not sure are exif-powered
function has_actual_exif_fields(exif_data: Immutable<Tags>): boolean {
	for (let key in exif_data) {
		if (key === 'errors' || key === 'SourceFile')
			continue

		if (key.startsWith('File'))
			continue

		//logger.debug('Found true EXIF field', { key, SourceFile: exif_data.SourceFile })

		return true
	}

	return false
}


// there are several orientation fields, provision for the future
function getꓽorientation_from_exif(exif_data: Immutable<Tags>): number | undefined {
	return exif_data[EXIF_FIELD__ORIENTATION] as any
}

function getꓽtimestamp_ms_from_ExifDateTime(date_exif: ExifDateTime): TimestampUTCMs {
	const date_legacy = date_exif.toDate()
	return +date_legacy
}

function _to_debug(date_exif: ExifDateTime): string {
	return getꓽdebug_representation(
		create_better_date_from_ExifDateTime(date_exif)
	)
}

/////////////////////////////////////////////////

export {
	getꓽbest_creation_date_from_exif,
	getꓽcreation_timezone_from_exif,
	has_errors,
	has_actual_exif_fields,
	getꓽorientation_from_exif,
	getꓽtimestamp_ms_from_ExifDateTime,
}
