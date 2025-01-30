import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import * as NORMALIZERS from '@offirmo-private/normalize-string'
import * as RichText from '@offirmo-private/rich-text-format'

import {
	WithSchemaVersion,
	WithRevision,
	WithTimestamp,
	WithLastUserInvestmentTimestamp,
	AnyOffirmoState,
	BaseRootState,
	isꓽRootState,
	UTBundle,
	isꓽUTBundle,
	BaseUState,
	BaseTState,
	isꓽWithSchemaVersion, isꓽBaseState, isꓽUState, isꓽTState,
} from '@offirmo-private/state-utils'
import { getꓽUTC_timestampⵧhuman_readable‿ms } from '@offirmo-private/timestamps'

import * as RRT from '@tbrpg/ui--rich-text'

/////////////////////////////////////////////////

function _getꓽstate_type(raw_state: Immutable<any>): 'root' | 'bundle' | 'U' | 'T' | 'base' | 'unknown' {
	switch (true) {
		case isꓽRootState(raw_state):
			return 'root'
		case isꓽUTBundle(raw_state):
			return 'bundle'
		case isꓽUState(raw_state):
			return 'U'
		case isꓽTState(raw_state):
			return 'T'
		case isꓽBaseState(raw_state):
			return 'base'
		// we don't go deeper (WithSchema etc. as we'll handle those common props on everything
		default:
			return 'unknown'
	}
}

/////////////////////////////////////////////////

function _renderⵧWithSchemaVersion(state: Immutable<WithSchemaVersion>, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧinline()

	builder.pushText(`v${state.schema_version}`)

	return builder.done()
}

function _renderⵧWithRevision(state: Immutable<WithRevision>, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧinline()

	builder.pushText(`rev# ${state.revision}`)

	return builder.done()
}

function _renderⵧWithTimestamp(state: Immutable<WithTimestamp>, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧinline()

	const d = new Date(state.timestamp_ms)
	builder.pushText(`⏲  ${getꓽUTC_timestampⵧhuman_readable‿ms(d)}`)

	return builder.done()
}

function _renderⵧWithLastUserInvestmentTimestamp(state: Immutable<WithLastUserInvestmentTimestamp>, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧinline()

	const d = new Date(state.last_user_investment_tms)
	builder.pushText(`⏲  ${getꓽUTC_timestampⵧhuman_readable‿ms(d)}`)

	return builder.done()
}

/////////////////////////////////////////////////

function _renderⵧRootState(state: Immutable<BaseRootState>, options: Options, key?: string): RichText.Document {
	assert(!key, `root should be root! "${key}"`)

	const builder = RichText.fragmentⵧblock()

	const keys = new Set([
		...Object.keys(state),
	])
	keys.delete('u_state')
	keys.delete('t_state')

	builder.pushHeading(`ᘛ ${state.ⵙapp_id} ᘚ`)
	keys.delete('ⵙapp_id')

	if (keys.has('schema_version')) {
		builder.pushNode(_renderⵧWithSchemaVersion(state as any))
		builder.pushLineBreak()
		keys.delete('schema_version')
	}

	if (keys.has('last_user_investment_tms')) {
		builder.pushNode(_renderⵧWithLastUserInvestmentTimestamp(state as any))
		keys.delete('last_user_investment_tms')
	}

	const kvⵧown = RichText.listⵧunordered()
	keys.forEach(k => {
		kvⵧown.pushKeyValue(k, (state as any)[k])
	})
	builder.pushNode(kvⵧown.done())

	//builder.pushHorizontalRule()

	const subkeys = new Set<string>([
		...Object.keys(state.u_state),
		...Object.keys(state.t_state),
	])
	subkeys.delete('revision')
	subkeys.delete('schema_version')
	subkeys.delete('timestamp_ms')
	subkeys.forEach(k => {
		const u = (state.u_state as any)[k] as BaseUState | undefined
		const t = (state.t_state as any)[k] as BaseTState | undefined
		builder.pushHeading(`{${NORMALIZERS['capitalize']!(k)}}`)
		//console.log({ u: !!u, t: !!t })
		if (!t) {
			builder.pushNode(_render(u!, options, k))
		}
		else {
			builder.pushNode(_render([u, t] as any, options, k))
		}
	})

	return builder.done()
}

function _renderⵧUTBundle(state: Immutable<UTBundle>, options: Options, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧblock()

	builder.pushHeading('TODO UTBundle!')

	return builder.done()
}

function _renderⵧUState(state: Immutable<BaseUState>, options: Immutable<Options>, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧblock()

	const keys = new Set([
		...Object.keys(state),
	])

	builder.pushNode(_renderⵧWithSchemaVersion(state as any))
	builder.pushLineBreak()
	keys.delete('schema_version')

	builder.pushNode(_renderⵧWithRevision(state as any))
	builder.pushLineBreak()
	keys.delete('revision')

	const renderedⵧdedicated = _getꓽrendererⵧdedicated('U', options,key)
	const remaining_keys_node = renderedⵧdedicated
		? renderedⵧdedicated(state, options, key)
		: _renderⵧremaining_keys(state, options, keys)
	builder.pushNode(remaining_keys_node)

	return builder.done()
}

function _renderⵧTState(state: Immutable<UTBundle>, options: Options, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧblock()

	builder.pushHeading('TODO TState!')

	return builder.done()
}

function _renderⵧBaseState(state: Immutable<UTBundle>, options: Options, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧblock()

	builder.pushHeading('TODO BaseState!')

	return builder.done()
}

function _renderⵧany(state: Immutable<any>, options: Options, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧblock()

	builder.pushHeading('TODO Any!')

	return builder.done()
}

function _renderⵧremaining_keys(state: Immutable<any>, options: Options, keys: Set<string>): RichText.Document {
	const builder = RichText.listⵧunordered()

	keys.forEach(k => {
		builder.pushKeyValue(k, String((state as any)[k]))
		//builder.pushKeyValue(k, JSON.stringify((state as any)[k]))
	})

	return builder.done()
}

function _getꓽrendererⵧby_type(type: ReturnType<typeof _getꓽstate_type>): Renderer {
	switch (type) {
		case 'root':
			return _renderⵧRootState

		case 'bundle':
			return _renderⵧUTBundle

		case 'U':
			return _renderⵧUState

		case 'T':
			return _renderⵧTState

		case 'base':
			return _renderⵧBaseState

		default:
			return _renderⵧany
	}
}

/////////////////////////////////////////////////

type Renderer = (raw_state: Immutable<any>, options: Immutable<Options>, key?: string) => RichText.Document

interface Options {
	// TODO review
	//rendererⵧgeneric: Renderer,
	//rendererⵧWithSchemaVersion: Renderer,
	//rendererⵧWithRevision: Renderer,

	renderers: {
		[k: string]: Renderer,
	}
}

function _getꓽrendererⵧdedicated(type: ReturnType<typeof _getꓽstate_type>, options: Immutable<Options>, key?: string): Renderer | undefined {
	let candidate = `${type}:${key}`
	if (options.renderers[candidate])
		return options.renderers[candidate]!

	candidate = `${key}`
	if (options.renderers[candidate])
		return options.renderers[candidate]!

	candidate = `${type}`
	if (options.renderers[candidate])
		return options.renderers[candidate]!

	return undefined
}

/////////////////////////////////////////////////

function _render(raw_state: Immutable<any>, options: Immutable<Options>, key?: string): RichText.Document {
	const type = _getꓽstate_type(raw_state)

	const renderer = _getꓽrendererⵧby_type(type)

	return renderer(raw_state, options, key)
}


function renderꓽstateⵧrich_text(state: Immutable<any>, options: Immutable<Partial<Options>> = {}): RichText.Document {
	const full_options: Immutable<Options> = {
		//rendererⵧgeneric: _render,
		renderers: {},
		...options,
	}
	return _render(state, full_options)
}

/////////////////////////////////////////////////

export {
	renderꓽstateⵧrich_text,
}
