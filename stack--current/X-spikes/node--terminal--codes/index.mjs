// https://github.com/chalk/chalk
import chalk from 'chalk'
import {
	modifierNames,
	foregroundColorNames,
	backgroundColorNames,
	colorNames,
} from 'chalk';

console.log({
	modifierNames,
	foregroundColorNames,
	backgroundColorNames,
	colorNames, // = fg + bg
})

const ORDERED_COLORS_BASIC = foregroundColorNames
	.filter(c => c !== 'gray' && c !== 'grey') // all are aliases for "black bright"
	.filter(c => ! c.endsWith('Bright'))
	.sort((c1, c2) => {
		const ORDER = [
			'black',
			'white',
			// rainbow order https://en.wikipedia.org/wiki/Rainbow#Number_of_colours_in_a_spectrum_or_a_rainbow
			'red',
			'yellow',
			'green',
			'cyan',
			'blue',
			'magenta', // violet
		]
		return (ORDER.indexOf(c1) - ORDER.indexOf(c2))
	})

const MAX_WIDTH = Math.max(...ORDERED_COLORS_BASIC.map(c => c.length)) + 1 + 1

function get_even_sized_text(c) {
	return ' ' + c.padEnd(MAX_WIDTH)
}

function capitalize(c) {
	return c[0].toUpperCase() + c.slice(1)
}

ORDERED_COLORS_BASIC.forEach(color => {

	const bg = ORDERED_COLORS_BASIC.map(bgc => {
		return chalk[color][`bg${capitalize(bgc)}`](get_even_sized_text(color))
			+ chalk[color][`bg${capitalize(bgc)}Bright`](get_even_sized_text(color))
	})

	//console.log(chalk[color](`${get_even_sized_text(color)}`))
	console.log(bg.join(''))
})
