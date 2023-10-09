import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { NORMALIZERS } from '@offirmo-private/normalize-string'
import * as RichText from '@offirmo-private/rich-text-format'

import {
	WithSchemaVersion,
	WithRevision,
	WithTimestamp,
	WithLastUserInvestmentTimestamp,
	AnyOffirmoState,
	BaseRootState,
	isꓽRootState,
	isꓽUTBundle,
	BaseUState,
	BaseTState,
	isꓽWithSchemaVersion, isꓽBaseState, isꓽUState, isꓽTState,
} from '@offirmo-private/state-utils'
import { getꓽUTC_timestampⵧhuman_readable‿ms } from '@offirmo-private/timestamps'


/////////////////////////////////////////////////


// count of user-initiated *changes*
// (should not increment if an action triggers no change)
/*export interface WithRevision {
	revision: number
}*/

interface Options {

}

function _renderⵧWithSchemaVersion(state: Immutable<WithSchemaVersion>, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧinline()

	builder.pushText(`ⓥ  ${state.schema_version}`)

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


	const kvⵧown = RichText.listⵧunordered()
	keys.forEach(k => {
		kvⵧown.pushKeyValue(k, (state as any)[k])
	})
	builder.pushNode(kvⵧown.done())

	return builder.done()
}


function _renderⵧRootState(state: Immutable<BaseRootState>, options: Options): RichText.Document {
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


function _render(raw_state: Immutable<AnyOffirmoState>, options: Immutable<Options>, key?: string): RichText.Document {
	const builder = RichText.fragmentⵧblock()

	switch (true) {
		case isꓽRootState(raw_state): {
			assert(!key)
			builder.pushNode(_renderⵧRootState(raw_state as any, options))
			break
		}

		case isꓽUTBundle(raw_state): {
			builder.pushHeading('TODO UTBundle!')
			break
		}

		case isꓽUState(raw_state): {
			builder.pushNode(_renderⵧUState(raw_state as any, options, key))
			break
		}

		case isꓽTState(raw_state): {
			builder.pushHeading('TODO TState!')
			break
		}

		case isꓽBaseState(raw_state): {
			builder.pushHeading('TODO BaseState!')
			break
		}

		default:
			builder.pushHeading('TODO ANY!')
			//console.log(raw_state)
			break
	}

	return builder.done()
}


function renderꓽstateⵧrich_text(state: Immutable<AnyOffirmoState>): RichText.Document {
	const options: Options = {}
	return _render(state, options)
}

/////////////////////////////////////////////////

export {
	renderꓽstateⵧrich_text,
}
