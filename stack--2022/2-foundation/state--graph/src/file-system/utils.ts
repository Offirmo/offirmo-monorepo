import assert from 'tiny-invariant'
import { Immutable } from '../embedded-deps/immutable.js'

import { FileSystem, FSPath } from './types.js'


function normalize_path(fs: Immutable<FileSystem>, path: FSPath, type: 'file' | 'folder'): FSPath {
	const SEP = fs.options.separator

	// validate input
	if (type === 'file') {
		assert(!path.endsWith(SEP), `file path should not end with a separator! "${path}"`)
	}
	else {
		assert(!path.endsWith(SEP), `file path should not end with a separator! "${path}"`)
	}

	if (path.startsWith(SEP)) path = path.slice(SEP.length)


	// TODO
	return raw_path
}

/////////////////////////////////////////////////

export {
	normalize_path,
}
