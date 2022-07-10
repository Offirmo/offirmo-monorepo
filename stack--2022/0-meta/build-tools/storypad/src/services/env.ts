export function get_current_url__cleaned(): string {
	const location = document.location
	return location.origin + location.pathname
}
