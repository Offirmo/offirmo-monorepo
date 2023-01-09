const fs = require('fs-extra')

const json = require('./json')
const ls = require('./ls')

module.exports = {
	...fs,
	...json,
	...ls,
}
