import {
	StylizeOptions,
} from './types.js'

/////////////////////////////////////////////////

function getꓽstylize_optionsⵧterminal(chalk: any): StylizeOptions {
	return {
		stylizeꓽdim: (s: string) => chalk.dim(s),
		stylizeꓽsuspicious: (s: string) => chalk.bold(s),
		stylizeꓽerror: (s: string) => chalk.red.bold(s),
		stylizeꓽglobal: (s: string) => chalk.magenta(s),
		stylizeꓽprimitive: (s: string) => chalk.green(s),
		stylizeꓽsyntax: (s: string) => chalk.yellow(s),
		stylizeꓽuser: (s: string) => chalk.blue(s),
		// see also https://nodejs.org/api/util.html#customizing-utilinspect-colors
	}
}

/////////////////////////////////////////////////

export {
	getꓽstylize_optionsⵧterminal,
}
