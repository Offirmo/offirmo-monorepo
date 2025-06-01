// https://parceljs.org/features/parcel-api/

import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import { Parcel } from '@parcel/core'

const INPUT_DIR = path.resolve(path.join(fileURLToPath(import.meta.url), '../../../src/'))
const OUTPUT_DIR = path.resolve(path.join(fileURLToPath(import.meta.url), '../../../../dist/'))

const OPTIONS = {
	// https://parceljs.org/plugin-system/api/#InitialParcelOptions

	entries: INPUT_DIR + '/index.ts',
	defaultConfig: '@offirmo-private/parcel-config',
	//mode: 'production',
	defaultTargetOptions: {
		context: 'node',
		engines: {
			"node": ">= 23"
		},
		outputFormat: 'esmodule',
		includeNodeModules: true,
		distDir: OUTPUT_DIR,
		/*engines: {
			browsers: ['last 1 Chrome version']
		}*/
	}
}

console.log({
	INPUT_DIR,
	OUTPUT_DIR,
	OPTIONS,
})

let bundler = new Parcel(OPTIONS)

try {
	let {bundleGraph, buildTime} = await bundler.run();
	let bundles = bundleGraph.getBundles();
	if (bundles.length === 0) throw new Error('Nothing built!!')
	console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
} catch (err) {
	console.error(`XXX ERROR`, err)
	console.log(err.diagnostics);
}
