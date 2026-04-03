import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

import type { JsRuntimeSpec, PackageManagerSpec } from '@infinite-monorepo/primitives'
import type { Node } from '@infinite-monorepo/graph'

import type { State } from './types.ts'

/////////////////////////////////////////////////

function getꓽnodesⵧnew(state: Immutable<State>): Immutable<Array<Node>> {
	return Object.values(state.graphs.nodesⵧworkspace).filter(node => node.status === 'new')
}

function getꓽfile__content(state: Immutable<State>): Immutable<Array<Node>> {
	throw new Error('nimp!')
}

const JS_RUNTIME_SPECⵧNODE: JsRuntimeSpec = {
	// https://github.com/nodejs/Release/blob/main/schedule.json

	name: 'node', // most standard 2026/03 but also bun
	versionsⵧacceptable: '^24', // current LTS 2026/03
	versionⵧrecommended: '24.14.0', // 20256/03
}

function getꓽruntimeⵧlocal(state: Immutable<State>, node: Immutable<Node>): JsRuntimeSpec {
	// TODO 1D node with inheritance

	const raw_spec = state.spec.runtimeⵧlocal
	if (typeof raw_spec === 'string') {
		switch (raw_spec) {
			case 'node':
				return structuredClone(JS_RUNTIME_SPECⵧNODE)
			default:
				throw new Error('Unhandled runtimeⵧlocal!')
		}
	}

	if (raw_spec.name) {
		return raw_spec
	}

	throw new Error('Unhandled runtimeⵧlocal!')
}

// TODO should be in dedicated package
const PKG_MANAGER_SPECⵧPNPM: PackageManagerSpec = {
	// https://pnpm.io/blog
	name: 'pnpm',
	versionsⵧacceptable: '^10', // current LTS 2025/10
	versionⵧrecommended: '10.17',
}
// TODO should be in dedicated package
const PKG_MANAGER_SPECⵧBOLT: PackageManagerSpec = {
	// https://github.com/boltpkg/bolt
	name: 'bolt',
	versionsⵧacceptable: '^0',
	versionⵧrecommended: '0.24.10',
}

function getꓽpackage_manager(state: Immutable<State>): PackageManagerSpec {
	const raw_spec = state.spec.package_manager
	if (typeof raw_spec === 'string') {
		switch (raw_spec) {
			case 'pnpm':
				return structuredClone(PKG_MANAGER_SPECⵧPNPM)
			case 'bolt':
				return structuredClone(PKG_MANAGER_SPECⵧBOLT)

			default:
				throw new Error(`Unhandled package_manager "${raw_spec}"!`)
		}
	}

	if (raw_spec.name) {
		return raw_spec
	}

	throw new Error('Unhandled runtimeⵧlocal!')
}

/////////////////////////////////////////////////

export { getꓽnodesⵧnew, getꓽruntimeⵧlocal, getꓽpackage_manager }
