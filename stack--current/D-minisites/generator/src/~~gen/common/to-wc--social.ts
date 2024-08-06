import { Immutable } from '@offirmo-private/ts-types'
import { Html‿str, Css‿str, Email‿str, WithOnlinePresence, Author, ThingWithOnlinePresence } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

function toꓽwcⵧsocial(spec: Immutable<WithOnlinePresence | Author | ThingWithOnlinePresence>, {
	style = '' as Css‿str,
}): Html‿str {
	const email: Email‿str | undefined = (() => {
		if ('contact' in spec) {
			// TODO check format
			return spec.contact
		}

		if ('email' in spec)
			return spec.email

		return undefined
	})()

	// TODO obfuscate email
	// mailto:ye(dot)jutard(at)gmail.com

	return `
<nav is="offirmoⳆsocial-links" style="${style}">
	<ol>
		${email
			? `<li><a is="offirmoⳆsocial-link" target="_blank" href="${email}">email</a></li>`
			: ''
		}
		${(spec.urlsⵧsocial || [])
			.map(({ url, network, handle }) =>
				`<li><a is="offirmoⳆsocial-link" target="_blank" network="${network}" handle="${handle}" href="${url}">${network}</a></li>`)
			.join('\n')
		}
	</ol>
</nav>
	`
}

/////////////////////////////////////////////////

export {
	toꓽwcⵧsocial,
}
