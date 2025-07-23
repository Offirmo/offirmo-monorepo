/////////////////////////////////////////////////

type AbsPath = string

function getꓽdefault_namespace(module_details: {
	root‿abspath: AbsPath,
	isꓽpublished: boolean,
}) {
	if (module_details.root‿abspath.includes('C-final/tbrpg'))
		return '@tbrpg'

	if (module_details.root‿abspath.includes('7-multimorphic/libs--rpg'))
		return '@oh-my-rpg'

	return module_details.isꓽpublished
		? '@offirmo'
		: '@offirmo-private'
}

/////////////////////////////////////////////////

export {
	getꓽdefault_namespace,
}
