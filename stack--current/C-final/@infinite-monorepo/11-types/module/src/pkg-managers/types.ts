// https://yarnpkg.com/features/workspaces

// https://github.com/boltpkg/bolt
interface WorkspaceSpecⳇBolt {
	type: 'bolt'
	entries: string[]
}

// can be declared in:
// - package.json
// - pnpm-workspace.yaml
// example:
// packages:
//   - 'apps/*'
//   - 'packages/*'
//   - '!apps/legacy'
interface WorkspaceSpecⳇPnpm {
	type: 'pnpm'
	entries: string[]
}

// https://yarnpkg.com/features/workspaces
interface WorkspaceSpecⳇYarnBerry {
	type: 'yarnⵧberry'
	entries: string[]
}

// extra rules
// ex. allow "commenting out" a workspace spec line with # or //
