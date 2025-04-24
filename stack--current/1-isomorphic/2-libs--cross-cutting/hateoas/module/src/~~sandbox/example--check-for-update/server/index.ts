import type {
	HyperMedia,
	HATEOASServer
} from '../../../types.ts'


function createꓽserver(): HATEOASServer {

	const get: HATEOASServer['get'] = async (url = '/') => {
		throw new Error(`Not implemented!`)
	}

	const dispatch: HATEOASServer['dispatch'] = async (action) => {
		throw new Error(`Not implemented!`)
	}

	const getꓽengagementsⵧpending: HATEOASServer['getꓽengagementsⵧpending'] = async (url = '/') => {
		throw new Error(`Not implemented!`)
	}

	return {
		get,
		dispatch,
		getꓽengagementsⵧpending,
	}
}
