
import type {
	AbsolutePath,
	RelativePath,
	Basename,
	Extension,
} from '../types.ts'

/////////////////////////////////////////////////

interface FileEntry {
	path‿abs: AbsolutePath
	path‿rel: RelativePath

	basename: Basename       // ex index.stories.ts
	ext: Extension           // ex              .ts
	extⵧsub: Extension       // ex      .stories
	extⵧextended: Extension  // ex      .stories.ts
	basename‿noext: Basename // ex index
}

/////////////////////////////////////////////////

export {
	type FileEntry,
}
