import { expect } from 'chai'

import { LIB } from '../consts.ts'


import {
	getꓽpage,
} from './selectors.ts'

import { BOOK } from '../__fixtures/wow-alliance-of-lordaeron/content.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- Model: Book -- selectors`, function() {

	describe('getꓽpage', function () {

		it('should work', () => {
			const result = getꓽpage(BOOK)
			console.log(result)


			// 1.
			expect(result).to.have.nested.property('content.content', BOOK.parts[1])

			// 2a.
			expect(result).to.have.nested.property('breadcrumbs[0]', BOOK.title)
			expect(result).to.have.property('part_type', 'page')
			expect(result).to.have.property('relative_index‿human', 1)
			expect(result).to.have.property('group_count', 16)

			// 2b.
			expect(result).to.have.property('referenceⵧcurrent', '1')
			expect(result).to.have.property('referenceⵧnextⵧin_tree', '2')
			expect(result).to.have.property('referenceⵧpreviousⵧin_tree', '.')

// 3a. secondary result -- for display
// for simulating double-sided printing, we return previous and next page IN CURRENT GROUP
// cf. https://en.wikipedia.org/wiki/Recto_and_verso
// (TODO if none, return blank?)
// TODO one day
//contentⵧprevious: Immutable<BookPage> | null // if null, means there is no previous, we are the first
//contentⵧnext: Immutable<BookPage> | null // if null, means there is no next, we are the last

// 3b. secondary result -- for navigation
// for classic pagination first / prev / current / next / last INSIDE CURRENT GROUP
// TODO one day
//referenceⵧfirstⵧin_group: BookNodeReference // can = current if current is first
//referenceⵧpreviousⵧin_group: BookNodeReference // can = current if current is first
//referenceⵧnextⵧin_group: BookNodeReference // can = current if current is last
//referenceⵧlastⵧin_group: BookNodeReference // can = current if current is last
//referenceⵧup: BookNodeReference

// more hint for visual display
// TODO one day
//direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
//medium?: 'sheet' | 'scroll' | 'screen'

		})
	})
})
