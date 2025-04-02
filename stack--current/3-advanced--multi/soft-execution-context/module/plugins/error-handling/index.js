import { getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'
import { createError as _createError, normalizeError } from '@offirmo/error-utils'


import { INTERNAL_PROP } from '../../consts.ts'
import { flattenToOwn } from '../../utils.ts'
import * as State from './state.ts'
import { _create_catcher } from './catch-factory.ts'
import { PLUGIN_ID as ID_DI } from '../dependency-injection/index.ts'
import * as TopState from '../../state.ts'

const PLUGIN_ID = 'error_handling'

function _clean_temp(err) {
	delete err._temp
	return err
}

function _handleError({SXC, debugId = '?', shouldRethrow = true}, err) {
	_create_catcher({
		debugId,
		decorators: [
			err => normalizeError(err, { alwaysRecreate: true }),
			err => SXC._decorateErrorWithLogicalStack(err),
			err => SXC._decorateErrorWithDetails(err),
		],
		onError: shouldRethrow
			? null
			: err => SXC.emitter.emit('final-error', { SXC, err: _clean_temp(err) }),
	})(err)
}

const PLUGIN = {
	id: PLUGIN_ID,
	state: State,
	augment: prototype => {

		prototype._decorateErrorWithDetails = function _decorateErrorWithDetails(err) {
			const SXC = this
			const state = SXC[INTERNAL_PROP]
			const now = getꓽUTC_timestamp‿ms()

			const autoDetails = {
				ENV: state.plugins[ID_DI].context.ENV,
				TIME: now,
				SESSION_DURATION_MS: now - state.plugins[ID_DI].context.SESSION_START_TIME_MS,
			}
			const userDetails = flattenToOwn(state.plugins[PLUGIN_ID].details)
			err.details = {
				...autoDetails,
				...userDetails,
				...(err.details || {}),
			}

			return err
		}

		prototype.setErrorDetails = function setErrorDetails(details) {
			const SXC = this
			let root_state = SXC[INTERNAL_PROP]

			root_state = TopState.reduce_plugin(root_state, PLUGIN_ID, plugin_state => {
				Object.entries(details).forEach(([key, value]) => {
					plugin_state = State.addDetail(plugin_state, key, value)
				})
				return plugin_state
			})

			this[INTERNAL_PROP] = root_state

			return SXC // for chaining
		}
		// this getter should normally not be used, errors are automatically decorated
		prototype.getErrorDetails = function getErrorDetails() {
			const SXC = this
			const plugin_state = SXC[INTERNAL_PROP].plugins[PLUGIN_ID]

			return flattenToOwn(plugin_state.details)
		}

		// useful if creating an error later from a saved SXC, ex. from a pipeline
		prototype.createError = function createError(message, details = {}) {
			const SXC = this
			const err = _createError(message, details)
			err.framesToPop = (err.framesToPop || 0) + 1

			return SXC._decorateErrorWithLogicalStack(
				SXC._decorateErrorWithDetails(err)
			)
		}

		// for termination promises
		prototype.handleError = function handleError(err, debugId) {
			const SXC = this
			_handleError({
				SXC,
				debugId,
				shouldRethrow: false,
			}, err)
		}

		prototype.xTry = function xTry(operation, fn) {
			console.assert(!!operation)
			const SXC = this
				.createChild()
				.setLogicalStack({operation})

			const params = SXC[INTERNAL_PROP].plugins[ID_DI].context

			try {
				return fn(params)
			}
			catch (err) {
				_handleError({
					SXC,
					debugId: 'xTry',
					shouldRethrow: true,
				}, err)
			}
		}

		prototype.xTryCatch = function xTryCatch(operation, fn) {
			console.assert(!!operation)
			const SXC = this
				.createChild()
				.setLogicalStack({operation})

			const params = SXC[INTERNAL_PROP].plugins[ID_DI].context

			try {
				return fn(params)
			}
			catch (err) {
				_handleError({
					SXC,
					debugId: 'xTryCatch',
					shouldRethrow: false,
				}, err)
			}
		}

		prototype.xNewPromise = function xPromise(operation, resolver_fn) {
			console.assert(!!operation)
			const SXC = this
				.createChild()
				.setLogicalStack({operation})

			const params = SXC[INTERNAL_PROP].plugins[ID_DI].context

			return (new Promise(resolver_fn.bind(undefined, params)))
				.catch(err => {
					_handleError({
						SXC,
						debugId: 'xPromise',
						shouldRethrow: true,
					}, err)
				})
		}

		prototype.xPromiseTry = function xPromiseTry(operation, fn) {
			console.assert(!!operation)
			const SXC = this
				.createChild()
				.setLogicalStack({operation})

			const params = SXC[INTERNAL_PROP].plugins[ID_DI].context

			return Promise.try(() => fn(params))
				.catch(err => {
					_handleError({
						SXC,
						debugId: 'xPromiseTry',
						shouldRethrow: true,
					}, err)
				})
		}


	},
}

export {
	PLUGIN,
}
