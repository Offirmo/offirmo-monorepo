import terminalEscapesCodes from 'ansi-escapes'

// code taken from https://github.com/sindresorhus/clear-cli
// The MIT License (MIT)
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

function clearCli() {
	process.stdout.write(terminalEscapesCodes.clearScreen)
}

export {
	clearCli,
}
export default clearCli
