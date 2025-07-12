import * as fs from 'node:fs'

console.log(`\n\n\n`)

/////////////////////////////////////////////////
console.log(stylize_string.bold('Loading file…'))

const some_file = process.env.EDGE_SOCIAL_FILE
//console.log(some_file)

const contents = fs.readFileSync(some_file, 'utf8')
//console.log(contents)

/////////////////////////////////////////////////
console.log(stylize_string.bold('Deserializing…'))

import { deserialize, serialize } from '../serialization--file/index.ts'
const state = deserialize(contents)
//console.log(state)

/////////////////////////////////////////////////
import stylize_string from 'chalk'
import * as SELib from '../state/index.ts'


console.log(stylize_string.bold('\n\n🤜 DASHBOARD  🤛'))
const handled = new Set<string>()


// circle 0 = me
console.group(`${stylize_string.bold.redBright('ME')} ${stylize_string.dim('@me')}`)
;(() => {
	handled.add('@me')
	console.log(SELib.getꓽone_linerⵧperson(state, '@me'))
})()
console.groupEnd()

// circle 1 = partner
console.group(stylize_string.bold.magentaBright('PARTNER'))
;(function partner() {
	const id = SELib.getꓽpartner(state)
	if (!id) {
		console.log('no partner')
	}
	else {
		handled.add(id)
		console.log(`${stylize_string.dim(id)} ${SELib.getꓽone_linerⵧperson(state, id)}`)
		// TODO birthday
		// TODO anniversaries
	}
})()
console.groupEnd()

// circle 2 = family -- close
console.group(stylize_string.bold.green('CLOSE FAMILY'))
;(function familyⵧclose() {
	const closeFamilyIds = SELib.getꓽfamilyⵧclose(state)
	closeFamilyIds.forEach(id => {
		if (handled.has(id)) return
		handled.add(id)

		console.log(`${stylize_string.dim(id)} ${SELib.getꓽone_linerⵧperson(state, id)}`)
		// TODO birthday
		// TODO anniversaries
	})
})()
console.groupEnd()

// circle 3 = family -- rest

// circle 4 = friends

// circle 5 = orgs -- active

// circle 6 = rest
console.group(stylize_string.bold.bgWhite('REST'))
;(function rest() {
	SELib.getꓽall(state).forEach(id => {
		if (handled.has(id)) return
		handled.add(id)

		console.log(`${stylize_string.dim(id)} ${SELib.getꓽone_linerⵧperson(state, id)}`)
	})
})()
console.groupEnd()

/////////////////////////////////////////////////

console.log(`Serializing back...`)
console.log(serialize(state))

// TODO check if input is ~ same size as input



// objective
// - next anniversaries (birth, fête, work...)
// TO priority by "circle" me -> closest -> close family -> family -> friends -> work/neighbors -> onlookers
// - time since last called mum


// TODO dashboard
// close circle:
// - current age
// - last connection
// - next anniversary
// current active orgs
// - a random one
// - next anniversaries / dates
// - prompt to connect
// for each lower circle
// - soon anniversaries
