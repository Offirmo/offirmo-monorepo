// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'
import { getꓽISO8601ⵧsimplified‿days } from '@monorepo-private/timestamps'

import type { WebPropertyEntryPointSpec, EntryPoints } from '../../types.ts'

/////////////////////////////////////////////////
// Cloudflare Pages

function generateꓽ_headersⵧcloudflare(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return `
## https://developers.cloudflare.com/pages/configuration/headers/
`.trim()
}
function generateꓽ_redirectsⵧcloudflare(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return `
## https://developers.cloudflare.com/pages/configuration/redirects/
`.trim()
}
function generateꓽcloudflare(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
			_headers: generateꓽ_headersⵧcloudflare(spec),
			_redirects: generateꓽ_redirectsⵧcloudflare(spec),
			'functions/hello-world.ts': `// https://developers.cloudflare.com/pages/functions/get-started/#create-a-function
export function onRequest(context) {
return new Response("Hello, world!")
}
`,
		}
}

/////////////////////////////////////////////////
// Netlify

function generateꓽ_headersⵧnetlify(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return `
## https://docs.netlify.com/routing/headers/#syntax-for-the-headers-file
`.trim()
}
function generateꓽ_redirectsⵧnetlify(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return `
## https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file
`.trim()
}
function generateꓽnetlify(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		_headers: generateꓽ_headersⵧnetlify(spec),
		_redirects: generateꓽ_redirectsⵧnetlify(spec),
	}
}

/////////////////////////////////////////////////
// GitHub pages

function generateꓽgithub_pages(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		'.nojekyll': `From GitHub Staff, 2016/11/04

If you're not using Jekyll, you can add a .nojekyll file to the root of your repository to disable Jekyll from building your site. Once you do that, your site should build correctly.

---
Reason: GitHub build auto-converts the markdown files and don't serve them.
Ref: https://github.com/blog/572-bypassing-jekyll-on-github-pages
`,
		'CNAME': (new URL(spec.urlⵧcanonical)).hostname,
	}
}

/////////////////////////////////////////////////

// Well-known https://en.wikipedia.org/wiki/Well-known_URI
function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		...(spec.host === 'cloudflare--pages' && generateꓽcloudflare(spec)),
		...(spec.host === 'netlify' && generateꓽnetlify(spec)),
		...(spec.host === 'github-pages' && generateꓽgithub_pages(spec)),

		// other we could do:
		// Apache .htaccess https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess
	}
}

/////////////////////////////////////////////////

export default generate
