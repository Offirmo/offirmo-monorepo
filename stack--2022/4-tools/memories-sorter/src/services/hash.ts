import assert from 'tiny-invariant'
import { hashFile } from 'hasha'

import { AbsolutePath } from '../types.js'
import logger from './logger.js'

export type FileHash = string

export async function ↆgetꓽfile_hash(abs_path: AbsolutePath): Promise<FileHash> {
	const hash = await hashFile(abs_path, { algorithm: 'sha256' })
	assert(hash, 'hasha ok')
	logger.silly(`- got hash for "${abs_path}"…`, { hash })
	return hash
}

export default ↆgetꓽfile_hash
