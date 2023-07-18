import { Book } from '../types.js'

const imageUrl = new URL(
	'xian_ni_chap7.png',
	import.meta.url,
)

/////////////////////////////////////////////////

// qi condensation manual
const MANUALⵧCULTIVATIONⵧQI_CONDENSATION: Book = {
	// ex. https://ww5.mangakakalot.tv/chapter/manga-ii985865/chapter-3
	// writings and drawings
	// The physical exercise chart https://en.wikipedia.org/wiki/Qigong
	// fake to teach the cultivation basics
	// + gauge the talent, motivation, affinities
	// will include
	// - some bottleneck
	// - discipline
	// - cut from the mortal world
	// - reality of the cultivation world: addicted to power and increasing it
	// - fighting
	// - limited guidance to check if resourceful

	title: '⎨⎨origin⎬⎬’s Qi Condensation Manual',

	// 9 volumes
	parts_type: 'volume',
	parts: {
		volume01: {
			// intro
			content: `
Introduce sect
Introduce Spiritual Qi
Qi condensation
			`,
			//contentⵧvisual: imageUrl.toString(),
			/*sub: {

			}*/
		},
		volume02: {
			// breathing technique / Qigong
			// https://mangakakalot.com/chapter/xian_ni/chapter_7
			content: `
[Introduce breathing technique]
foundation establishment
			`
		},
		volume03: {
			// https://mangakakalot.com/chapter/xian_ni/chapter_12
			content: `
breaking through 1st level = impurities
a few basic arts with wide compatibility
			`
		},
		volume04: {
			// only given if L1
			content: `
			(formula to L2)
			`
		},
		volume05: {
			content: `
			`
		},
		volume06: {
			content: `
			`
		},
		volume07: {
			content: `
			`
		},
		volume08: {
			content: `
			`
		},
		volume09: {
			content: `
			`
		},
	}
}

/////////////////////////////////////////////////

export {
	MANUALⵧCULTIVATIONⵧQI_CONDENSATION,
}
