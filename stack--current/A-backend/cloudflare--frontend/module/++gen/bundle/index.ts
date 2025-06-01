// https://parceljs.org/features/parcel-api/

import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import { Parcel } from '@parcel/core'

let bundler = new Parcel({
	entries: path.join(fileURLToPath(import.meta.url), '../entry-points/*.html'),
	defaultConfig: '@offirmo-private/parcel-config',
	/*mode: 'production',
	defaultTargetOptions: {
		engines: {
			browsers: ['last 1 Chrome version']
		}
	}*/
})

try {
	let {bundleGraph, buildTime} = await bundler.run();
	let bundles = bundleGraph.getBundles();
	console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
} catch (err) {
	console.log(err.diagnostics);
}
