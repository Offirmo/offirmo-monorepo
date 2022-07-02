

export function All() {
	return [
		NeverVisited(),
		AlreadyVisited(),
	].join('<br/>')
}

export function NeverVisited() {
	const location = document.location
	console.log('hello')

	return `
		<a href="${location.origin + location.pathname + location.search + '&random=' + String(Math.random())}">link -- never visited</a>
	`
}

export function AlreadyVisited() {
	const location = document.location

	return `
		<a href="${location.origin + location.pathname + location.search}">link -- already visited</a>
	`
}
