const fs = require('fs-extra')

const json = require('./json/index.cjs')
const ls = require('./ls/index.cjs')

module.exports = {
	...fs,
	...json,
	...ls,
}
