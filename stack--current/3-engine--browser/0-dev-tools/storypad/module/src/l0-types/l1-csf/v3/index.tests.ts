import { expect } from 'chai'

import { LIB } from '../../../consts.ts'

import {
	isꓽStory‿v3,
} from './index.ts'

import * as NoMetaStories from './index--no-meta.stories.ts'

/////////////////////////////////////////////////

describe(`${LIB} -- type -- CSF v3`, function() {

	describe('isꓽStory‿v3()', function () {

		it('should work', () => {
			Object.entries(NoMetaStories).forEach(([name, story]) => {
				expect(isꓽStory‿v3(story), `isꓽStory‿v3(${name})`).to.be.true
			})
		})
	})
})
