import { expect } from 'chai'

import { LIB } from '../../../consts.ts'

import {
	isꓽStory‿v2,
} from './index.ts'

import * as NoMetaStories from './index--no-meta.stories.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- type -- CSF v2`, function() {

	describe('isꓽStory‿v2', function () {

		it('should work', () => {
			Object.entries(NoMetaStories).forEach(([name, story]) => {
				expect(isꓽStory‿v2(story), `isꓽStory‿v2(${name})`).to.be.true
			})
		})
	})
})
