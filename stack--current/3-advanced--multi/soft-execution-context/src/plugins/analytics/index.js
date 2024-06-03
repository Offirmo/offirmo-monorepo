import { getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'

import { INTERNAL_PROP } from '../../consts.js'
import * as TopState from '../../state.js'
import { flattenToOwn } from '../../utils.js'
import * as State from './state.js'
import {PLUGIN_ID as ID_DI} from '../dependency-injection/index.js'

const PLUGIN_ID = 'analytics'

const PLUGIN = {
	id: PLUGIN_ID,
	state: State,
	augment: prototype => {

		prototype.setAnalyticsDetails = function setAnalyticsDetails(details) {
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
		prototype.getAnalyticsDetails = function getAnalyticsDetails() {
			const SXC = this
			const plugin_state = SXC[INTERNAL_PROP].plugins[PLUGIN_ID]

			return flattenToOwn(plugin_state.details)
		}

		prototype.fireAnalyticsEvent = function fireAnalyticsEvent(eventId, details = {}) {
			const SXC = this
			const now = getꓽUTC_timestamp‿ms()
			const root_state = SXC[INTERNAL_PROP]

			if (!eventId)
				throw new Error('Incorrect eventId!')

			const { ENV } = SXC.getInjectedDependencies()

			const autoDetails = {
				ENV,
				TIME: now,
				SESSION_DURATION_MS: now - root_state.plugins[ID_DI].context.SESSION_START_TIME_MS,
			}
			const userDetails = SXC.getAnalyticsDetails()
			details = {
				...autoDetails,
				...userDetails,
				...details,
			}

			SXC.emitter.emit('analytics', { SXC, eventId, details })

			return SXC // for chaining
		}
	},
}

export {
	PLUGIN_ID,
	PLUGIN,
}
