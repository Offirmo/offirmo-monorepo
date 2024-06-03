console.group('@offirmo-private/browserlist-config')

const fs = require('fs')
const assert = require('assert').strict

const browserslist = require('browserslist')

const BROWSERS_QUERIES = require('.')

console.log({
	queries: BROWSERS_QUERIES,
	resulting_browsers: browserslist(BROWSERS_QUERIES),
})

assert.ok(BROWSERS_QUERIES.slice(-1)[0] === 'not dead')

const ROOT_QUERIES = fs.readFileSync('../../../.browserslistrc', 'utf8')
	.split('\n')
	.map(line => line.trim())
	.filter(line => !!line)
	.filter(line => !line.startsWith('#'))

assert.strictEqual(BROWSERS_QUERIES.join('\n'), ROOT_QUERIES.join('\n'))

console.groupEnd()
