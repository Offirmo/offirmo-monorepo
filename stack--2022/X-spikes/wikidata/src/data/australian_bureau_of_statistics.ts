// https://www.abs.gov.au/

import { Fact} from '../types'

export const POPULATION: Fact = {
	unit: 'count',
	value: 25_750_198,
	point_in_time: 20210930,
	reference: 'https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/sep-2021',
}

export const LIFE_EXPECTANCYⵧMALE: Fact = {
	unit: 'year',
	value: 81.2,
	point_in_time: 20201231,
	reference: 'https://www.abs.gov.au/statistics/people/population/life-tables/2018-2020',
}

export const LIFE_EXPECTANCYⵧFEMALE: Fact = {
	unit: 'year',
	value: 85.3,
	point_in_time: 20201231,
	reference: 'https://www.abs.gov.au/statistics/people/population/life-tables/2018-2020',
}
