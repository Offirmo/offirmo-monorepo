import assert from 'tiny-invariant'

import * as fse from '@offirmo/cli-toolbox/fs/extra'

//console.log('XXXXXXXX fse im\n', Object.keys(fse).sort().filter(k => k[0].toLowerCase() === k[0]).join('\n'))

import { AbsolutePath } from '../types.js'

export function _is_same_inode(abs_path_a: AbsolutePath, abs_path_b: AbsolutePath): boolean {
	// TODO shortcut if paths are equal? or throw?

	const stats_a = fse.statSync(abs_path_a)
	const stats_b = fse.statSync(abs_path_b)

	assert(stats_a !== undefined && stats_b !== undefined, `_is_same_inode at least 1 param should exist!`)

	return stats_a?.ino === stats_b?.ino
}
