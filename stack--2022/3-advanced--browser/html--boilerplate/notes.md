{
"name": "@offirmo-private/html--boilerplate",
"version": "0.0.1",
"description": "My personal HTML5 template",
"author": "Offirmo <offirmo.net@gmail.com>",
"license": "Unlicense",
"private": true,

	"optionalDependencies": {
		"@offirmo-private/xoff": "^0"
	},
	"dependencies": {
	},

	"scripts": {
		"clean": "monorepo-script--clean-package …dist …cache",

		"start:parcel": "parcel --out-dir .parcel --no-autoinstall doc/demo/*.html",
		"_build:dev:watch": "monorepo-script--build-typescript-package --watch",
		"_build:prod": "monorepo-script--build-typescript-package",

		"demo-p": "run-s clean start:parcel",
		"dev": "run-s clean _build:dev:watch",
		"build": "run-p _build:prod",

		"demo": "offirmo-simple-upgradable-template-apply --template=./src/index.html --destination=./doc/demo/index.html"
	},
	"devDependencies": {
		"@offirmo-private/monorepo-scripts": "*",
		"@offirmo-private/simple-upgradable-template": "^0",
		"@size-limit/preset-small-lib": "^7",
		"npm-run-all": "^4",
		"typescript": "^4"
	}
}
