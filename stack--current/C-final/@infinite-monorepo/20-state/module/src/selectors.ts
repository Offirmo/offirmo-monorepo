import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { isꓽobjectⵧliteral } from '@offirmo-private/type-detection'

import type { Node, JsRuntimeSpec, NodeId, PackageManagerKey, PackageManagerSpec } from '@infinite-monorepo/types'

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

	name: 'node', // most standard 2025/08
	versionsⵧacceptable: '^22', // current LTS 2025/08
	versionⵧrecommended: '22.19.0', // 2025/08
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

const PKG_MANAGER_SPECⵧPNPM: PackageManagerSpec = {
	// https://pnpm.io/blog
	name: 'pnpm',
	versionsⵧacceptable: '^10', // current LTS 2025/10
	versionⵧrecommended: '10.17',
}

function getꓽpackage_manager(state: Immutable<State>): PackageManagerSpec {
	const raw_spec = state.spec.package_manager
	if (typeof raw_spec === 'string') {
		switch (raw_spec) {
			case 'pnpm':
				return structuredClone(PKG_MANAGER_SPECⵧPNPM)
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
