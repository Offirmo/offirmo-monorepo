import { expect } from 'chai'

import { LIB } from './consts.js'

import {
	create,
	upsertꓽfile,
	mkdirp,
} from './index.js'
import {
	getꓽarborescence_view
} from '../generic/index.js'







describe(`${LIB} -- reducers`, function() {

	it('should work', () => {
		let fs = create()

		fs = upsertꓽfile(fs, 'foo/bar/baz.xyz')
		fs = upsertꓽfile(fs, 'foo/glop.xyz')
		fs = mkdirp(fs, 'foo/bar/gnokman/')

		//console.log(fs)
		console.log(getꓽarborescence_view(fs.graph))
	})

	it('should reject duplicates')


})
