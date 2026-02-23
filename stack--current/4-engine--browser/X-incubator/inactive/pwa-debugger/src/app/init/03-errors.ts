import { getRootSXC } from '@monorepo-private/soft-execution-context'
import { listenToErrorEvents, listenToUnhandledRejections } from '@monorepo-private/soft-execution-context--browser'

/////////////////////////////////////////////////

const STYLES = 'padding: .5em; background-color: red; color: white; font-weight: bold;'

async function init(): Promise<void> {
	const rootSXC = getRootSXC()

	rootSXC.emitter.on('final-error', function onFinalError({ SXC, err, CHANNEL }) {
		try {
			// this code must be super extra safe!!!
			// don't even use the advanced logger!

			console.group('%cSXC "final-error" event!', STYLES)

			if (CHANNEL === 'dev') {
				console.error('%c↑ error! (no report since dev)', STYLES, { SXC, err })
				return
			}

			//console.log('(this error will be reported)')
			// TODO integrate with Sentry!

			console.groupEnd()
		} catch (err) {
			console.log(`%c RECURSIVE CRASH!!! SXC ERROR HANDLING CAN ABSOLUTELY NOT CRASH!!! FIX THIS!!!`, STYLES)
			console.log(err)
		}
	})

	listenToErrorEvents()
	listenToUnhandledRejections()

	rootSXC.xTry('init:SXC', ({ logger, SXC }) => {
		logger.debug('Root SXC is now decorated with error details ✔', SXC.getErrorDetails())
	})
}

/////////////////////////////////////////////////

export default init
