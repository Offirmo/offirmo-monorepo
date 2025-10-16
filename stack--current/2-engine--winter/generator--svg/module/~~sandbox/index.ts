import * as SVGLib from '@offirmo-private/generator--svg'

let $svg = SVGLib.createꓽempty()
$svg = SVGLib.setꓽviewBox($svg, [ 0, 0, 5000, 5000])
$svg = SVGLib.addꓽcontentꘌcontour($svg)

//let $layer = SVGLib.createꓽgroup()
//$svg = SVGLib.addꓽlayer($svg, $layer)

$svg = SVGLib.decorate_for_editors($svg)
const svg‿str = SVGLib.getꓽsvg‿str($svg)
//console.log(svg‿str)


/////////////////////////////////////////////////
import '@prettier/plugin-xml' // for dep detection
import * as Prettier from 'prettier'
const PRETTIER_OPTIONS = {
	printWidth: 120,
	tabWidth: 3,
	useTabs: true,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	quoteProps: 'consistent',
	arrowParens: 'avoid',

	// https://github.com/prettier/plugin-xml
	singleAttributePerLine: true,
	xmlSortAttributesByKey: true,
	xmlWhitespaceSensitivity: 'ignore'
} satisfies Partial<Prettier.RequiredOptions>
const svgⵧformatted‿str = await Prettier.format(svg‿str, { ...PRETTIER_OPTIONS, parser: 'xml', plugins: ["@prettier/plugin-xml"], })
console.log(svgⵧformatted‿str)

/////////////////////////////////////////////////
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
await fs.writeFile(path.join(__dirname, 'index.svg'), svgⵧformatted‿str)
