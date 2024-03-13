// I don't use prettier but vscode "format on paste" is using it :/

// https://prettier.io/docs/en/configuration#basic-configuration

/** @type {import("prettier").Config} */
const config = {
// https://prettier.io/docs/en/options
	// we have an editorconfig, no need to duplicate it
	semi: false,
	singleQuote: true,
	arrowParens: 'avoid',
}

export default config
