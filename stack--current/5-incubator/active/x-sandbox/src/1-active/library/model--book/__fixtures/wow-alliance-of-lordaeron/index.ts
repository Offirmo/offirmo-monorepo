/* plain, basic example of an in-game book
 * https://www.wowhead.com/item=145298/the-alliance-of-lordaeron
 */

import type { Book, BookCover, BookPage, BookPartKey, BookUId } from '../../types/index.ts'

/////////////////////////////////////////////////

const uid: BookUId = '〖BOOKꓽWoW【The Alliance of Lordaeron】〗'

const AUTHOR: Book['author'] = "a scholar from the Alliance"

const COVER: BookCover = {
	title: 'The Alliance of Lordaeron',
	author: AUTHOR,
	flavor: 'Copy commissioned by Archmage Newhearth of the Curators. Do not worry about returning the book, it will return on its own.',
	hints: {
		pages_count: 16,
		emoji: '📘',
		icon: 'https://wow.zamimg.com/images/wow/icons/large/spell_misc_hellifrepvphonorholdfavor.jpg',
		color_bg: 'hsl(42, 100%, 87%)',
		color_fg: 'hsl(337, 16%, 28%)',
	}
}

const BOOK: Book = {
	...COVER,
	uid,
	parts: {
		1: 'Lord Lothar rallied the remnants of Azeroth\'s armies after their defeat at Stormwind Keep, and then launched a massive exodus across the sea to the northern kingdom of Lordaeron. Convinced that the Horde would overcome all of humanity if left unchecked, the leaders of the seven human nations met and agreed to unite in what would become known as the Alliance of Lordaeron.',
		2: 'For the first time in nearly three thousand years, the disparate nations of Arathor were once again united under a common banner. Appointed as Supreme Commander of the Alliance forces, Lord Lothar prepared his armies for the coming of the Horde.',
		3: 'Aided by his lieutenants, Uther the Lightbringer, Admiral Daelin Proudmoore, and Turalyon, Lothar was able to convince Lordaeron\'s demi-human races of the impending threat as well. The Alliance succeeded in gaining the support of the stoic dwarves of Ironforge and a small number of high elves of Quel\'Thalas.',
		4: 'The elves, led at that time by Anasterian Sunstrider, were largely uninterested in the coming conflict. However, they were duty-bound to aid Lothar because he was the last descendent of the Arathi bloodline, which had aided the elves in ages past.',
		5: 'The Horde, now led by Warchief Doomhammer, brought in ogres from its homeworld of Draenor and conscripted the disenfranchised Amani forest trolls into its fold. Setting out on a massive campaign to overrun the dwarf kingdom of Khaz Modan and the southern reaches of Lordaeron, the Horde effortlessly decimated all opposition.',
		6: '',
		7: '',
		8: '',
		9: '',
		10: '',
		11: '',
		12: '',
		13: '',
		14: '',
		15: '',
		16: 'The scattered orc clans were quickly rounded up and placed within guarded internment camps. Though it seemed that the Horde had been defeated for good, some remained highly skeptical that peace would last. Khadgar, now an Archmage of some renown, convinced the Alliance high command to build the fortress of Nethergarde that would watch over the ruins of the Dark Portal and ensure that there would be no further invasions from Draenor.',
	}
}

/////////////////////////////////////////////////

export {
	COVER,
	BOOK,
}
