// Even without using prettier, vscode "format on paste" is using this

// https://prettier.io/docs/en/configuration#basic-configuration

/** @type {import("prettier").Config} */
const config = {
	// https://prettier.io/docs/en/options
	// we have an editorconfig, no need to duplicate it
	// However, some options are not covered by editorconfig
	semi: false,
	singleQuote: true,
	arrowParens: 'avoid',
	experimentalOperatorPosition: 'start',
	experimentalTernaries: true,

	printWidth: 100,
}

export default config
