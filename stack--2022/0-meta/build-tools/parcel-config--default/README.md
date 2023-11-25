

## Concepts
https://parceljs.org/plugin-system/configuration/#shared-configuration

## Plugins

### core plugins

Parcel requires the plugins from "@parcel/config-default" to be added as dependencies when our setup actually uses them.

Added so far:
* `@parcel/transformer-webmanifest`
* @parcel/packager-raw-url for "*.{jsonld,svg,webmanifest}"

### extra plugins

Resolver
* "@parcel/resolver-glob"

### 3rd party plugins

Current issue https://github.com/parcel-bundler/parcel/issues/7823#issuecomment-1826123439
* tried "parcel-resolver-typescript-esm", but it's not working https://www.npmjs.com/package/parcel-resolver-typescript-esm



## tosort



		"@parcel/packager-ts": "^2",
		"@parcel/packager-xml": "^2",
		"@parcel/resolver-glob": "^2",
		"@parcel/transformer-typescript-tsc": "^2",
		"@parcel/transformer-typescript-types": "^2",
		"@parcel/transformer-xml": "^2",


		"..."



	"transformers": {
	}


		"*.{ts,tsx}": ["@parcel/transformer-typescript-tsc"],
		"*.{zip,tgz}": ["@parcel/transformer-raw"]
