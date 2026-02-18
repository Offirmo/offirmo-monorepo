/**
 * Use case: inferring the environment dev/staging/prod
 */

/////////////////////////////////////////////////

// https://en.wikipedia.org/wiki/.localhost
function isꓽlocalhost(currentWindow = window): boolean {
	return [
		// https://en.wikipedia.org/wiki/.localhost
		'localhost',
		'example',
		'test',
		'invalid',
		'local', // seen https://github.com/peterldowns/localias
	].some(domain => currentWindow.location.hostname.endsWith(domain))
}

/////////////////////////////////////////////////

export { isꓽlocalhost }
