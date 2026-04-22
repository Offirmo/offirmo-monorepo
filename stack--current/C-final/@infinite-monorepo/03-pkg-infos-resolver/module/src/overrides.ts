import { NODE_MAJOR_VERSION } from '@monorepo-private/monorepo'

/////////////////////////////////////////////////

// TODO move in another pkg and inject?
const OVERRIDES: Record<string, {}> = {
	'fraction.js': { version: '^4' }, // v5+ switched to BigInt, which is not json-compatible unless we switch to superjson
	'@types/node': { version: `^${NODE_MAJOR_VERSION}` }, // clamp it to the closest, safest available version

	// pnpm 10 for now
	"@pnpm/constants": { version: "^1001" },
	"@pnpm/types": { version: "^1001" },
	"@pnpm/workspace.workspace-manifest-reader": { version: "^1000" },
}

// TODO inject?
const MONOREPO_NAMESPACES = [
	'@monorepo-private',
	'@oh-my-rpg',
	'@dev-docs--web3',
	'@digital-hoarder',
	'@glim',
	'@infinite-monorepo',
	'@tbrpg',
]

/////////////////////////////////////////////////

export {
	OVERRIDES,
	MONOREPO_NAMESPACES,
}
