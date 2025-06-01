// https://parceljs.org/features/parcel-api/

import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import { Parcel } from '@parcel/core'
import type {
	InitialParcelOptions, TargetDescriptor,
} from '@parcel/types';

const INPUT_DIR = path.resolve(path.join(fileURLToPath(import.meta.url), '../../../src/'))
const OUTPUT_DIR = path.resolve(path.join(fileURLToPath(import.meta.url), '../../../../dist/'))

const OPTIONS: InitialParcelOptions = {
	// https://parceljs.org/plugin-system/api/#InitialParcelOptions

	entries: INPUT_DIR + '/index.ts',
	defaultConfig: '@offirmo-private/parcel-config',
	mode: 'production',

	targets: {
		'worker': {
			context: 'node',
			engines: {
				"node": ">= 23"
			},
			outputFormat: "esmodule",
			includeNodeModules: true,
			distDir: OUTPUT_DIR,
		} satisfies TargetDescriptor,
	},
}

console.log({
	INPUT_DIR,
	OUTPUT_DIR,
	OPTIONS,
})

let bundler = new Parcel(OPTIONS)

/*
let subscription = await bundler.watch((err, event) => {
	if (err) {
		// fatal error
		throw err;
	}

	if (event.type === 'buildSuccess') {
		let bundles = event.bundleGraph.getBundles();
		console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
	} else if (event.type === 'buildFailure') {
		console.log(event.diagnostics);
	}
});*/
//await subscription.unsubscribe();

try {
	let {bundleGraph, buildTime} = await bundler.run();
	let bundles = bundleGraph.getBundles();
	if (bundles.length === 0) throw new Error('Nothing built!!')
	console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
} catch (err: any) {
	console.error(`XXX ERROR`, err)
	console.log(err?.diagnostics);
}
