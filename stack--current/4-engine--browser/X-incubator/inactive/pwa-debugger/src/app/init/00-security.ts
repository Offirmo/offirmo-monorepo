/** Immediate security initializations.
 * This code will be executed immediately when the app starts.
 *
 * We can't ensure full security, but we can try to mitigate some risks.
 * https://owasp.org/www-project-top-ten/
 * - We assume our own code can be compromised (ex. supply chain)
 * - We assume the opener of our page may have injected some js https://krausefx.com//blog/ios-privacy-instagram-and-facebook-can-track-anything-you-do-on-any-website-in-their-in-app-browser
 */
import { getRootSXC } from '@monorepo-private/soft-execution-context'

/////////////////////////////////////////////////

// add immediate security actions here
// TODO should happen synchronously inside the HTML!
function initⵧimmediate(): void {
	console.log('%cEnforcing app security…', 'font-style: oblique;')
	// protect against prototype pollution
	// is that really useful?
	// https://www.synopsys.com/blogs/software-security/javascript-security-best-practices.html#6
	Object.freeze(Object.prototype)

	// TODO strip global scope and APIs
	// TODO detect unwanted DOM manipulations
}

// add logs or later security actions here
async function initⵧdeferred() {
	getRootSXC().xTry('init:SXC', ({ logger }) => {
		// ensure we have a CSP
		const allowsꓽunsafe_evals = (() => {
			// https://stackoverflow.com/a/27399739/587407
			try {
				new Function('')
				return true
			} catch (e) {
				return false
			}
		})()
		if (allowsꓽunsafe_evals) {
			// this is the first thing a CSP disables...
			logger.error('Content Security Policy is missing! Consider this app unsafe!')
		}

		const isꓽiframe = window.self !== window.top
		if (isꓽiframe) {
			// strictly speaking the web is composable and there is nothing wrong with being an iframe
			// however there are a few attacks...
			// https://web.dev/articles/security-headers#xfo
			logger.warn('Running in an iframe, be cautious!!')
			// since we don't have any iframe-specific feature, let's cut off the connection
			window.parent = window
			window.top = window
		}
	})
}

/////////////////////////////////////////////////

initⵧimmediate()

export default initⵧdeferred
