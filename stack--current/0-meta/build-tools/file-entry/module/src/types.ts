/////////////////////////////////////////////////
// for readability. Unfortunately this doesn't cause a real additional safety

type Basename = string
type Extension = string // '.' included, ex. '.ts'

type RelativePath = string // relative to some known/conventional "root" dir
type AbsolutePath = string

/////////////////////////////////////////////////

// prettier-ignore
interface FileEntry {
	path‿abs: AbsolutePath      // ex. /Users/sam/work/src/off/offirmo-monorepo/stack--current/4-engine--browser/0-dev-tools/storypad/module/src/index.stories.ts
	path‿rel: RelativePath      // ex. src/index.stories.ts
	root‿abspath: AbsolutePath  // ex. /Users/sam/work/src/off/offirmo-monorepo/stack--current/4-engine--browser/0-dev-tools/storypad/module

	basename: Basename          // ex.     index.stories.ts
	ext: Extension              // ex.                  .ts
	basename‿no_ᐧext: Basename   // ex.     index.stories
	extⵧextended: Extension     // ex.          .stories.ts
	basename‿no_ᐧxᐧext: Basename // ex.      index
	extⵧsub: Extension          // ex.          .stories

	basenameⵧsemantic‿no_ᐧext: string // ex. foo/index.tests.ts -> foo.tests
}

/////////////////////////////////////////////////

export { type Basename, type Extension, type RelativePath, type AbsolutePath, type FileEntry }
