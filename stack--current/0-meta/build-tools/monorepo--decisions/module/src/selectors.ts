/////////////////////////////////////////////////

type AbsPath = string

function getꓽdefault_namespace(module_details: {
	root‿abspath: AbsPath,
	isꓽpublished: boolean,
}) {
	if (module_details.root‿abspath.includes('the-boring-rpg'))
		return '@tbrpg'

	if (module_details.root‿abspath.includes('-rpg'))
		return '@oh-my-rpg'

	return module_details.isꓽpublished
		? '@offirmo'
		: '@offirmo-private'
}

/////////////////////////////////////////////////

export {
	getꓽdefault_namespace,
}
