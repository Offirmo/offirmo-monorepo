import { getRootSEC } from '@offirmo-private/soft-execution-context'
import {
	listenToErrorEvents,
	listenToUnhandledRejections,
} from '@offirmo-private/soft-execution-context--browser'

/////////////////////////////////////////////////

const STYLES = 'padding: .5em; background-color: red; color: white; font-weight: bold;'

async function init(): Promise<void> {
	const rootSEC = getRootSEC()

	rootSEC.emitter.on('final-error', function onFinalError({SEC, err}) {
		try {
			// this code must be super extra safe!!!
			// don't even use the advanced logger!

			console.group('%cSEC "final-error" event!', STYLES)

			/*
			// ignore some
			if (err.message === 'the-boring-rpg›(browser/on error event): Failed to execute \'removeChild\' on \'Node\': The node to be removed is not a child of this node.') {
				logger.info('(↑ error in the ignore list)')
				return
			}*/

			console.error('%c↑ error! (no report since dev)', STYLES, {SEC, err})

			console.groupEnd()
		}
		catch(err) {
			console.log(`%c RECURSIVE CRASH!!! SEC ERROR HANDLING CAN ABSOLUTELY NOT CRASH!!! FIX THIS!!!`,
				STYLES,
			)
			console.log(err)
		}
	})

	listenToErrorEvents()
	listenToUnhandledRejections()

	rootSEC.xTry('init:SEC', ({logger, SEC}) => {
		logger.debug('Root SEC is now decorated with error details ✔', SEC.getErrorDetails())
	})
}

/////////////////////////////////////////////////

export default init


/*
import { get_raven_client, set_imminent_captured_error } from './raven'
 */
