
import { INTERNAL_PROP } from '../../consts.js'
import * as TopState from '../../state.js'
import {
	LOGICAL_STACK_BEGIN_MARKER,
	LOGICAL_STACK_END_MARKER,
	LOGICAL_STACK_SEPARATOR,
	LOGICAL_STACK_OPERATION_MARKER,
	LOGICAL_STACK_SEPARATOR_NON_ADJACENT,
} from './consts.js'
import * as State from './state.js'
import { _getSXCStatePath } from '../../utils.js'

const PLUGIN_ID = 'logical_stack'

const BRANCH_JUMP_PSEUDO_STATE = {
	sid: -1,
	plugins: {
		[PLUGIN_ID]: {
			stack: {
				// NO module
				operation: LOGICAL_STACK_SEPARATOR_NON_ADJACENT,
			},
		},
	},
}

function _reduceStatePathToLogicalStack(statePath) {
	let current_module = null
	return statePath.reduce((res, state) => {
		const {module, operation} = state.plugins[PLUGIN_ID].stack

		if (module // check existence of module due to special case "BRANCH_JUMP_PSEUDO_STATE" above
			&& module !== current_module
		) {
			res = res
				+ (res.length ? LOGICAL_STACK_SEPARATOR : '')
				+ module
			current_module = module
		}

		if (operation)
			res = res
				+ LOGICAL_STACK_SEPARATOR
				+ operation
				+ LOGICAL_STACK_OPERATION_MARKER

		return res
	}, '') + LOGICAL_STACK_END_MARKER
}

const PLUGIN = {
	id: PLUGIN_ID,
	state: State,
	augment: prototype => {

		prototype.setLogicalStack = function setLogicalStack({module, operation}) {
			const SXC = this
			let root_state = SXC[INTERNAL_PROP]

			root_state = TopState.reduce_plugin(root_state, PLUGIN_ID, state => {
				if (module)
					state = State.set_module(state, module)
				if (operation)
					state = State.set_operation(state, operation)

				return state
			})

			SXC[INTERNAL_PROP] = root_state

			return SXC
		}

		prototype.getLogicalStack = function getLogicalStack() {
			const SXC = this

			return _reduceStatePathToLogicalStack(
				_getSXCStatePath(SXC),
			)
		}

		prototype.getShortLogicalStack = function get_stack_end() {
			const { stack } = this[INTERNAL_PROP].plugins[PLUGIN_ID]
			return LOGICAL_STACK_BEGIN_MARKER
				+ stack.module
				+ LOGICAL_STACK_SEPARATOR_NON_ADJACENT //LOGICAL_STACK_SEPARATOR
				+ stack.operation
				+ LOGICAL_STACK_OPERATION_MARKER
				+ LOGICAL_STACK_END_MARKER
		}

		// internal only
		// expects an already normalized error (through @offirmo/error-utils)
		prototype._decorateErrorWithLogicalStack = function _decorateErrorWithLogicalStack(err) {
			const SXC = this

			err._temp = err._temp || {}
			err.details = err.details || {}

			const logicalStack = {
				full: SXC.getLogicalStack(),
			}

			if (err._temp.SXC) {
				// OK this error is already decorated.
				// Thus the message is also already decorated, don't touch it.

				// BUT we may be able to add more info, can we?
				if (err.details.logicalStack.includes(logicalStack.full)) {
					// ok, logical stack already chained, nothing to add
				}
				else {
					// SXC chain has branched, reconcile paths
					// OK maybe overkill...
					const other_path = err._temp.statePath
					const current_path = _getSXCStatePath(SXC)

					// find common path
					let last_common_index = 0
					for (let i = 1; i < current_path.length; ++i) {
						if (other_path[i] !== current_path[i])
							break
						last_common_index = i
					}

					// reconcile the 2 stack traces
					let improvedStatePath = [].concat(current_path)
					improvedStatePath.push(BRANCH_JUMP_PSEUDO_STATE)
					improvedStatePath = improvedStatePath.concat(
						other_path.slice(last_common_index + 1),
					)

					err._temp.statePath = improvedStatePath
					err.details.logicalStack = _reduceStatePathToLogicalStack(improvedStatePath)
				}
			}
			else {
				err._temp.SXC = SXC
				err._temp.statePath = _getSXCStatePath(SXC)

				logicalStack.short = SXC.getShortLogicalStack()
				if (err.message.startsWith(logicalStack.short)) {
					// can that happen??? It's a bug!
					/* eslint-disable no-console */
					console.warn('UNEXPECTED SXC non-decorated error already prefixed??')
					/* eslint-enable no-console */
				}
				else {
					const original_message = err.message
					err.message = logicalStack.short + ': ' + original_message
					const expected_first_line_of_the_stack = `${err.name}: ${original_message}`
					if (err.stack?.startsWith(expected_first_line_of_the_stack))
						err.stack = `${err.name}: ${err.message}` + err.stack.slice(expected_first_line_of_the_stack.length)
				}

				err.details.logicalStack = logicalStack.full
			}

			return err
		}
	},
}

export {
	PLUGIN,
}
