

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
		<a href="${location.origin + location.pathname + location.search + '#' + String(Math.random())}">link -- never visited</a>
	`
}

export function AlreadyVisited() {
	return `
		<a href="${window.top.location.href}">link -- already visited</a>
	`
}
