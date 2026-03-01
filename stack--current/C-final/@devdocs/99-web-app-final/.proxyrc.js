// https://github.com/parcel-bundler/parcel/issues/3407#issuecomment-686247350

const serveStatic = require('serve-static')

module.exports = function (app) {
	app.use(serveStatic('module/src/foo'))
}
