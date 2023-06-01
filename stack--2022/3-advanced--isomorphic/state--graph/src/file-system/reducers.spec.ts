import { expect } from 'chai'

import { LIB } from '../consts.js'

import {
	create,
	upsertꓽfile,
	mkdirp,
} from './index.js'







describe(`${LIB} -- File System -- reducers`, function() {

	it('should work', () => {
		let fs = create()

		fs = upsertꓽfile(fs, 'foo/bar/baz')
		fs = upsertꓽfile(fs, 'foo/glop')
		fs = mkdirp(fs, 'foo/bar/gnokman')


	})

	it('should reject duplicates')

	it('should allow navigating the tree', () => {
		//const folders = get_folders(fs)

		//const files = get_files(fs)
		//const empty_folders = get_empty_folders(fs)

	})
})
