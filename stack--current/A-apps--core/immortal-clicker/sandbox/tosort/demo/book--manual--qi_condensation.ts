import { Book } from '../../src/library/book/types'


/////////////////////////////////////////////////
// qi condensation manual

const imageUrl = new URL(
	'xian_ni_chap7.png',
	import.meta.url,
)

/* TODO sect dao
- orthodox / mixed / demonic?
- against the heavens or following the heavens?
 */
const ps = {

}

const MANUALⵧCULTIVATIONⵧQI_CONDENSATION: Book = {
	uid: 'manualⵧcultivationⵧqi_condensation',

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

	title: '⎨⎨slotꓽsect⎬⎬’s Qi Condensation Manual',

	// 9 volumes
	parts_type: 'volume',
	parts: {
		volume01: {
			parts: {
				'01-sect_intro': `
[This volume introduce the sect:
Explains how the sect has a profound understanding of the Dao,
prestigious origins, deep foundations, superior techniques, etc.]`,
				'02-warning_traitors': `
[This volume also warns that the sect's techniques and teachings
should not be shared outside of the sect
and that traitors will be severely punished.
This includes this manual!]`,
			},
			//contentⵧvisual: imageUrl.toString(),
			/*sub: {

			}*/
		},
		volume02: {
			// breathing technique / Qigong
			// https://mangakakalot.com/chapter/xian_ni/chapter_7
			parts: {
				'01-cultivation_intro': `
[This volume introduce Immortal cultivation: It's all about rising above mere mortality and wielding the powers of the heavens for oneself!
While mortals' vital force comes from ordinary mortal Qi, Immortals are attuned to the rarer Immortal Qi which changes their body and soul and allows them to use immortal magic!

Immortal Qi must be first be accumulated in one's body until a sufficient amount is reached. This is the "Qi Condensation" phase.
Once enough Immortal Qi is gathered, one should succeed in controlling this Qi and integrate it with one's body & soul. This is the "Foundation Establishment" phase, and only then can one be considered a true immortal.
]
`,
				'02-cultivation_intro_cont': `
TODO
Note that "Immortal" doesn't mean that
`,
				'03-breathing_technique': `[Introduce breathing technique]`,
			}
		},
		volume03: {
			// https://mangakakalot.com/chapter/xian_ni/chapter_12
			parts: {
				content: `
	breaking through 1st level = impurities
	a few basic arts with wide compatibility
	bottleneck about mortality
				`
			},
		},
		volume04: {
			// only given if L1
			parts: {
				content: `
			(formula to L2)
			`
			},
		},
		volume05: {
			parts: {
				content: `
			`
			},
		},
		volume06: {
			parts: {
				content: `
			bottleneck about law of the Jungle
			`,
			},
		},
		volume07: {
			parts: {
				content: `
			`
			},
		},
		volume08: {
			parts: {
				content: `
			`
			},
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
