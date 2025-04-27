import * as RichText from '@offirmo-private/rich-text-format'
import type {
	HyperMedia,
	HATEOASServer
} from '../../../types.ts'
import { Hyperlink, HyperActionCandidate } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

function backend() {
	return {

	}
}


/////////////////////////////////////////////////

function createꓽserver(): HATEOASServer {

	const ↆget: HATEOASServer['ↆget'] = async (url = '/') => {

		const data: Record<string, string> = {
			'Webstorm': '2024.3.5',
			'JetBrains Gateway': '2024.3.2',
			'IntelliJ IDEA': '2024.3.5',
		}

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
			_doc.push(
				RichText.fragmentⵧinline()
					.pushNode($name, { id: 'name' })
					.pushText(' ')
					.pushNode($version, { id: 'version' })
					.done()
			)
		})

		// Hypermedia
		_doc.addHints({
			underlying__href: url, // self
		})

		// related actions
		const links: Array<Hyperlink> = [
			{
				href: 'https://jb.gg/toolbox-app-faq',
				rel: ['about', 'external', 'noopener'], // TODO some defaults could be inferred from the href
				//cta: 'about', // TODO could be inferred from the rel
				target: '_blank', // TODO could be inferred from href being external
			},
		]
		const actions: Array<HyperActionCandidate> = [
			{
				type: 'refresh',
				cta: 'Check for updates',
				shortcut: 'Apple+R',
				feedback: 'Checking for updates…',
			},
		]
		_doc.addHints({
			links,
			actions,
		})

		return _doc.done()
	}

	const dispatch: HATEOASServer['dispatch'] = async (action) => {
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
