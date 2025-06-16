
import type {
	AbsolutePath,
	RelativePath,
	Basename,
	Extension,
} from '../types.ts'

/////////////////////////////////////////////////

interface FileEntry {
	path‿abs: AbsolutePath      // ex. /Users/sam/work/src/off/offirmo-monorepo/stack--current/4-engine--browser/0-dev-tools/storypad/module/src/index.stories.ts
	path‿rel: RelativePath      // ex. src/index.stories.ts

	basename: Basename          // ex. index.stories.ts
	ext: Extension              // ex.              .ts
	basename‿no_ᐧext: Basename   // ex. index.stories
	extⵧextended: Extension     // ex.      .stories.ts
	basename‿no_ᐧxᐧext: Basename // ex. index              "no Xtended ext"
	extⵧsub: Extension          // ex.      .stories

	basenameⵧsemantic‿no_ᐧext: string // ex. foo/index.tests.ts -> foo.tests
}

/////////////////////////////////////////////////

export {
	type FileEntry,
}
