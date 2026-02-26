// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'
import { getꓽISO8601ⵧsimplified‿days } from '@monorepo-private/timestamps'
import json_stable_stringify from "@monorepo-private/json-stable-stringify";

import { DIR_FILES_TO_SERVE } from '../../consts.ts'
import type { WebPropertyEntryPointSpec, EntryPoints } from '../../types.ts'

/////////////////////////////////////////////////
// Cloudflare Workers

function generateꓽcloudflareⵧworkers(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		'wrangler.jsonc': json_stable_stringify({
			"compatibility_date": getꓽISO8601ⵧsimplified‿days(), // https://developers.cloudflare.com/workers/best-practices/workers-best-practices/#keep-your-compatibility-date-current
			"compatibility_flags": [
				"nodejs_compat", // https://developers.cloudflare.com/workers/best-practices/workers-best-practices/#enable-nodejs_compat
			],
			"observability": {
				// https://developers.cloudflare.com/workers/observability/traces/
				"enabled": true
			},
			"assets": {
				// https://developers.cloudflare.com/workers/wrangler/configuration/#assets
				// https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
				"directory": `./${DIR_FILES_TO_SERVE}`,
				run_worker_first: false,
				html_handling: 'auto-trailing-slash', // https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
				"not_found_handling": spec.isꓽcatching_all_routes ? "single-page-application" : "404-page",
			},
		})
	}
}

/////////////////////////////////////////////////
// Cloudflare Pages (LEGACY)

function generateꓽ_headersⵧcloudflareⵧpages(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return `
## https://developers.cloudflare.com/pages/configuration/headers/
`.trim()
}
function generateꓽ_redirectsⵧcloudflareⵧpages(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return `
## https://developers.cloudflare.com/pages/configuration/redirects/
`.trim()
}
function generateꓽcloudflareⵧpages(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
			_headers: generateꓽ_headersⵧcloudflareⵧpages(spec),
			_redirects: generateꓽ_redirectsⵧcloudflareⵧpages(spec),
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
	switch (spec.host) {
		case 'cloudflare--workers':
			return generateꓽcloudflareⵧworkers(spec)
		case 'cloudflare--pages':
			return generateꓽcloudflareⵧpages(spec)
		case 'netlify':
			return generateꓽnetlify(spec)
		case 'github-pages':
			return generateꓽgithub_pages(spec)
		default:
			// other we could do:
			// Apache .htaccess https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess
			throw new Error(`host not implemented: ${spec.host}`)
	}
}

/////////////////////////////////////////////////

export default generate
