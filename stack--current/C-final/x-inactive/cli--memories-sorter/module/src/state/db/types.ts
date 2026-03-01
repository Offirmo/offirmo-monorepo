
import { PathⳇAbsolute } from '../../types.js'
import { Action } from '../actions.js'

import * as Folder from '../folder/index.js'
import * as File from '../file/index.js'
import * as Notes from '../notes/index.js'
import { FolderId } from '../folder/index.js'
import { FileId } from '../file/index.js'

import { FileHash } from '../../services/hash.js'

/////////////////////

export interface State {
	root: PathⳇAbsolute

	extra_notes: Notes.State,
	folders: { [id: FolderId ]: Folder.State }
	files: { [id: FileId ]: File.State }

	encountered_hash_count: {
		[hash: FileHash ]: number
	}

	queue: Action[],
}
