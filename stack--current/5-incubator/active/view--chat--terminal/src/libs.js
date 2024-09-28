const to_prettified_str = require('@offirmo-private/prettify-any')

const stylize_string = require('chalk')


// https://github.com/AnAppAMonth/linewrap
const linewrap = require('linewrap')
function wrap_string(s, size) {
	return linewrap(size, {skipScheme: 'ansi-color'})(s)
}

////////////

module.exports = {
	to_prettified_str,
	stylize_string,
	wrap_string,
}
