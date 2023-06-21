import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { getꓽrandom, RNGEngine } from '@offirmo/random'
import { NORMALIZERS } from '@offirmo-private/normalize-string'

import { Sect } from './types.js'

/////////////////////////////////////////////////

const VARIANTS = [
	'sect', 'sect', 'sect', 'sect', 'sect',
	'sect', 'sect', 'sect', 'sect', 'sect',

	'court',
	'holy land',
	'pagoda',
	'palace', 'palace',
	'paradise',
	'pavilion', 'pavilion',
	'school', 'school',
	'temple','temple',
	'union',
	'valley', 'valley',
	//'chamber of commerce'
	//'domain',
	//'heaven',
	//'merchant guild',
	//'realm',
]

const CORE = [
	'reliance',
	'heaven',
	'ghost',
	'demon',
	'dao',
	'corpse',
	'spirit',
	'netherworld',
	'desolation',
	'flower',

	// elements
	'fire',
	'gold',
	'ice',
	'water',
	'wood',
	'yang',
	'yin',
	'yin-Yang',

	// features
	'river',
	'sea',
	'mist',
	'mountain',
	'cloud',
	'wind',
	'rain',
	'moon',
	'star',
	'starry sky',

	// divine beasts
	'dragon',
	'phoenix',

	// 4 symbols https://en.wikipedia.org/wiki/Four_Symbols
	'dragon',
	'bird',
	'tiger',
	'tortoise',

	// 12 ornaments https://en.wikipedia.org/wiki/Twelve_Ornaments
	'sun',
	'moon',
	'star',
	'mountain',
	'dragon',
	'fire',

	// tosort
	'lightning',
	'sword',
]

const MODIFIERS = [
	// colors
	'black', 'dark', 'shadow',
	'blood',
	'blue', ' azure',
	'five colored',
	'green',
	'purple',
	'red', 'crimson', 'scarlet',
	'white', 'ashen',
	'yellow', 'golden',

	// numbers
	'twin', 'nine', 'thousand',

	// tosort
	//'free and unfettered',
	'ancient',
	'bright',
	'flying', 'returning',
	'high', 'great',
	'mysterious',
]

const EPIC_MODIFIERS = [
	'ancestral',
	'boundless',
	'deep',
	'defying',
	'divine',
	'exalted',
	'exquisite',
	'heavenly',
	'perpetual',
	'primordial',
	'profound',
	'pure',
	'shocking',
	'supreme',
	'true',
	'unending',
]



function get_randomꓽsect(engine: RNGEngine): Sect {
	const variant = getꓽrandom.picker.of(VARIANTS)(engine)
	const core = getꓽrandom.picker.of(CORE)(engine)
	const modifier = getꓽrandom.picker.of(MODIFIERS)(engine)

	let parts = [ modifier, core, variant].join(' ').split(' ').map(NORMALIZERS.capitalize)

	return {
		name: parts.join(' '),
	} as Sect
}


/////////////////////////////////////////////////

export {
	type Sect,

	get_randomꓽsect,
}
