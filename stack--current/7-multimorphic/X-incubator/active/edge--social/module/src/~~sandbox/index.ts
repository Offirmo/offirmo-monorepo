import * as fs from 'node:fs'

/////////////////////////////////////////////////

const some_file = process.env.EDGE_SOCIAL_FILE
//console.log(some_file)

const contents = fs.readFileSync(some_file, 'utf8')
//console.log(contents)

/////////////////////////////////////////////////
import { deserialize, serialize } from '../serialization--file/index.ts'
const state = deserialize(contents)
//console.log(state)

/////////////////////////////////////////////////
import stylize_string from 'chalk'
import * as SELib from '../state/index.ts'

console.log(stylize_string.bold('🤜 DASHBOARD  🤛'))

;(() => {
	console.log(stylize_string.bold.green('ME'))
	console.log(SELib.getꓽone_linerⵧperson(state, '@me'))
	throw new Error(`Not implemented!`)
})()

;(function partner() {
	console.log(stylize_string.red('PARTNER'))

	const partnerId = SELib.getꓽpartner(state)
	if (!partnerId) {
		console.log('no partner')
	}
	else {
		console.log(`partner = ${partnerId}`)
		birthday
		anniversaries
	}
})()

/////////////////////////////////////////////////


console.log(serialize(state))

// TODO check if input is ~ same size as input



// objective
// - next anniversaries (birth, fête, work...)
// TO priority by "circle" me -> closest -> close family -> family -> work/neighbors -> onlookers
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
