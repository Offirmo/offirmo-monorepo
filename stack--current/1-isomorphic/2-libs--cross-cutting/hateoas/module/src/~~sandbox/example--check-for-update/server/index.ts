import * as RichText from '@offirmo-private/rich-text-format'
import type {
	SemVer,
} from '@offirmo-private/ts-types'
import type {
	HyperMedia,
	HyperActionCandidate,
	HyperAction,
	HATEOASServer,
	HATEOASPendingEngagement,
	HyperLink,
} from '../../../types.ts'

/////////////////////////////////////////////////

function backend() {
	return {
		async ↆgetꓽproducts(): Promise<Record<string, SemVer>> {
			return {
				'Webstorm': '2024.3.5',
				'JetBrains Gateway': '2024.3.2',
				'IntelliJ IDEA': '2024.3.5',
			}
		}
	}
}


/////////////////////////////////////////////////

function createꓽserver(): HATEOASServer {

	const ↆget: HATEOASServer['ↆget'] = async (url = '/') => {
		const data = await backend().ↆgetꓽproducts()

		const _doc = RichText.listⵧordered()
		Object.entries(data).forEach(([name, version]) => {
			const $name = RichText.fragmentⵧinline(name)
				.addHints({ })
				.done()
			const $version = RichText.weak(`v${version}`)
				.addHints({
					underlying: version,
				})
				.done()
			_doc.pushRawNode(
				RichText.fragmentⵧinline()
					.pushNode($name, { id: 'name' })
					.pushText(' ')
					.pushNode($version, { id: 'version' })
					.done(),
				{ id: name },
			)
		})

		// Hypermedia
		_doc.addHints({
			underlying__href: url, // self
		})

		// related actions
		const links: Array<HyperLink> = [
			{
				href: 'https://jb.gg/toolbox-app-faq',
				rel: ['about', 'external', 'noopener'], // TODO some defaults could be inferred from the href
				//cta: 'about', // TODO could be inferred from the rel
				target: '_blank', // TODO could be inferred from href being external
			},
		]
		const actions: Array<HyperActionCandidate> = [
			{
				type: 'refresh', // really?
				cta: 'Check for updates',
				shortcut: 'Apple+R', // needed? inferrable? too specific? conflicts?

				input: {
					'os': {},
					'arch': {},
				},

				feedback: {
					type: 'background',
					type: 'loader',
					summary: 'Checking for updates…',
				},
			},
		]
		_doc.addHints({
			links,
			actions,
		})

		return _doc.done()
	}

	const dispatch: HATEOASServer['dispatch'] = async (action) => {
		console.log(`Server: asked to dispatch action…`, action)

		// TODO return engagement pending action
		throw new Error(`Not implemented!`)
	}

	return {
		ↆget,
		dispatch,
	}
}

/////////////////////////////////////////////////

export {
	createꓽserver,
}
