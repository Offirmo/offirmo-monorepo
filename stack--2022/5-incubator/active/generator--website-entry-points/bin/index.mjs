#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"

import meow from 'meow'
import stylize_string from 'chalk'

/////////////////////

const cli = meow('generate-website-entry-points', {
	importMeta: import.meta,
})

/////////////////////

console.error('XXX TODO')
