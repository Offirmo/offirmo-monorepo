// node --experimental-strip-types ./X-spikes/parse-import-ts/index.mjs


```ts
interface PureModuleDetailsAllowedInManifest {
	name: string // NOT including the namespace
	namespace: string
	license?: SPDXLicense
	description?: string
	version: Semver
	isꓽpublished: boolean
	isꓽapp: boolean // app in the generic sense of "not a lib"
	hasꓽside_effects: boolean // assuming most pkgs don't
	engines: Record<string, Semver>
	status: // EXPERIMENTAL rating of modules TODO clarify
		| 'spike'
		| 'sandbox' // self-contained playground for testing stuff
		| 'tech-demo' // not YET in prod
		| 'unstable' // ex. a rewrite or refactor in progress, most likely behind a flag
		| 'stable'
}

interface PureModuleManifest extends Partial<PureModuleDetailsAllowedInManifest> {
	_dontꓽpresent?: boolean // unsupported module, don't "present" it TODO remove once all the modules are compatible!
	_overrides?: {
		dependencies: Record<string, DependencyDetails | 'ignore'>,
		files: {
			packageᐧjson?: { [path: string]: any }
		},
	}
}
```

DEMO
```json5
{
	_dontꓽpresent: true,

	name: "state-utils",
	namespace: "tbrpg",
	description: "Base types + base utils for Offirmo style states",
	license: 'MIT', // this is a fork, credits due!
	version: "4.0.0",
	isꓽpublished: true,
	isꓽapp: true,
	hasꓽside_effects: true,
	engines: {
		node: "^23",
		browser: '*',
		parcel: "2.x",
	},
	status: 'spike',
	
	_overrides: {
		dependencies: {
			// possibly unresurrected cross-cutting nice to have
			'@offirmo-private/react--error-boundary': 'ignore',
			
			'@offirmo-private/css--reset': { type:  'dev' },
		}
		files: {
			packageᐧjson: {
				"|source": ">DELETE<",
				"|exports|.": ">DELETE<",
				
				'|exports|./examples': "./module/src/__fixtures/examples.ts"
				'|exports|./examples/*': "./module/src/__fixtures/example--*/index.ts"
				
				'|exports|./authors/*': './module/src/l3-authors/*/index.ts',
				'|exports|./__shared-demos': './module/src/__shared-demos/index.ts',
				
				"scripts._start:parcel:main": "parcel serve module/*.html --port 1981 --lazy --no-autoinstall",

				'scripts.build': 'node --experimental-strip-types ./module/__build/bundle.ts',
				
				"|alias|@storybook/test": "./module/src/l3-compat/@storybook/test.ts",
			},
		},
	},
}
```

"./examples": "./module/src/__fixtures/examples.ts"
