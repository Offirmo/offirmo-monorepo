import reportꓽancestry from './ancestry/index.js'
import reportꓽsecurity from '../../../security'
import reportꓽenvironment from '../../index'
import reportꓽsiteData from '../../../local-persistence'
import reportꓽauxiliaries from '../../../auxiliaries'
import reportꓽdemo from '../../../template'

export default function report() {
	const node = create_node(window.origin)


	reportꓽancestry(node, LIB)
	reportꓽsiteData(node, LIB)
	reportꓽauxiliaries(node, LIB)
	reportꓽdemo(node, LIB)

	// some checks need promises resolutions
	// TODO aggregate promises and wait!
	setTimeout(() => {
		printReport(node)
	}, 10)
}



/*
export function explore_browser_context() {
	console.xlog(`[${LIB}]`, {
		global: {
			self, // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope
			'self.origin': self.origin,
			'self.isSecureContext': self.isSecureContext,
		},
		'process.env': globalThis?.process?.env,
		'top.localStorage.keys': (() => {
			try {
				// if cross-origin, will throw
				const localStorage = window.top.localStorage
				return Array.from({length: localStorage.length}, (item, index) => localStorage.key(index))
			}
			catch (err) {
				return err
			}
		})(),
		'window': {
			top: window.top,
			document: window.document,
			navigator: window.navigator,
			opener: window.opener,
			frameElement: window.frameElement,
			viewport: {
				w: window.innerWidth,
				h: window.innerHeight,
			},
			'isTop?': window.top === window,
			url_obj: new URL(window.location.href),
		},
	})
}
*/
