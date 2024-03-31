// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebPropertyEntryPointSpec, EntryPoints } from '../types.js'

import generateꓽsecurityᐧtxt from './security-txt/index.js'

/////////////////////////////////////////////////

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
			'functions/hello-world.js': `// https://developers.cloudflare.com/pages/functions/get-started/#create-a-function
export function onRequest(context) {
return new Response("Hello, world!")
}
`,
		}
}

/////////////////////////////////////////////////

function generateꓽ_headersⵧnetlify(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return `
##
`.trim()
}
function generateꓽ_redirectsⵧnetlify(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return `
##
`.trim()
}
function generateꓽnetlify(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		_headers: generateꓽ_headersⵧnetlify(spec),
		_redirects: generateꓽ_redirectsⵧnetlify(spec),
	}
}

/////////////////////////////////////////////////

// Well-known https://en.wikipedia.org/wiki/Well-known_URI
function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		'.well-known/security.txt': generateꓽsecurityᐧtxt(spec),

		...(spec.host === 'cloudflare-pages' && generateꓽcloudflare(spec)),
		...(spec.host === 'netlify' && generateꓽnetlify(spec)),
	}
}

/////////////////////////////////////////////////

export default generate
