import { getRootSXC } from '@offirmo-private/soft-execution-context'
import {
	listenToErrorEvents,
	listenToUnhandledRejections,
} from '@offirmo-private/soft-execution-context--browser'

/////////////////////////////////////////////////

const STYLES = 'padding: .5em; background-color: red; color: white; font-weight: bold;'

async function init(): Promise<void> {
	const rootSXC = getRootSXC()

	rootSXC.emitter.on('final-error', function onFinalError({SXC, err}) {
		try {
			// this code must be super extra safe!!!
			// don't even use the advanced logger!
			console.group('%cSXC "final-error" event!', STYLES)

			console.error(err, {err})

			/*
			// ignore some
			if (err.message === 'the-boring-rpg›(browser/on error event): Failed to execute \'removeChild\' on \'Node\': The node to be removed is not a child of this node.') {
				logger.info('(↑ error in the ignore list)')
				return
			}*/

			console.error({SXC})

			console.log('↑ error! (no report since dev)', STYLES)

			console.groupEnd()
		}
		catch(err) {
			console.log(`%c RECURSIVE CRASH!!! SXC ERROR HANDLING CAN ABSOLUTELY NOT CRASH!!! FIX THIS!!!`,
				STYLES,
			)
			console.log(err)
		}
	})

	listenToErrorEvents()
	listenToUnhandledRejections()

	rootSXC.xTry('init:SXC', ({logger, SXC}) => {
		logger.debug('Root SXC is now decorated with error details ✔', SXC.getErrorDetails())
	})
}

/////////////////////////////////////////////////

export default init


/*
import { get_raven_client, set_imminent_captured_error } from './raven'
 */
