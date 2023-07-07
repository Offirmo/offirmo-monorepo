import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { getꓽrandom, RNGEngine } from '@offirmo/random'
import { NORMALIZERS } from '@offirmo-private/normalize-string'

import { Sect } from './types.js'
import { GenderRequirement } from '../../torefine/index.js'

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
	'corpse',
	'dao',
	'demon',
	'desolation',
	'elixir',
	'flower',
	'ghost',
	'heaven',
	'netherworld',
	'reliance',
	'spirit',

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
	'twin', 'nine', 'hundred', 'thousand', 'myriad',

	// tosort
	// TODO 'free and unfettered',
	'ancient',
	'bright',
	'flying', 'returning',
	'formless',
	'high', 'great',
	'mysterious',
	'void',
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


interface Options {
	requirement_gender: GenderRequirement,
	// TODO alignment
	// TODO epicness
}
function get_randomꓽsect(engine: RNGEngine, options: Immutable<Partial<Options>> = {}): Sect {
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
