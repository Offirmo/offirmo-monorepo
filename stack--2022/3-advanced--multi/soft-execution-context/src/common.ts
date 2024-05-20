import { getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'

import { SoftExecutionContext } from './types.js'

/////////////////////////////////////////////////

function decorateWithDetectedEnv(SXC: SoftExecutionContext<any>) {
	const ENV = (() => {
		try {
			if (typeof process !== 'undefined' && typeof process.env.NODE_ENV === 'string')
				return process.env.NODE_ENV
		}
		catch (err) {
			/* swallow */
		}

		return 'development'
	})()

	const IS_DEV_MODE = false
	const IS_VERBOSE = false
	const CHANNEL = 'dev'
	const SESSION_START_TIME_MS = getꓽUTC_timestamp‿ms()

	SXC.injectDependencies({
		ENV,
		'NODE_ENV': ENV, // yes, intentional 1) ENV = NODE_ENV 2) default value
		IS_DEV_MODE,
		IS_VERBOSE,
		CHANNEL,
		SESSION_START_TIME_MS,
	})

	SXC.setAnalyticsAndErrorDetails({
		ENV,
		CHANNEL,
	})
}

/////////////////////////////////////////////////

export {
	decorateWithDetectedEnv,
}
