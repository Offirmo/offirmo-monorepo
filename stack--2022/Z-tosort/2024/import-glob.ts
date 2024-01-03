/////////////////////////////////////////////////

async function importꓽglob(glob: string) {
	const isꓽvite = true
	const isꓽparcel = !isꓽvite

	switch (true) {
		case isꓽvite: {
			// https://vitejs.dev/guide/features.html#glob-import
			return import.meta.glob(glob)
		}
		case isꓽparcel: {
			// https://parceljs.org/features/dependency-resolution/#glob-specifiers
			return import(glob)
		}
	}
}

/////////////////////////////////////////////////

export {
	importꓽglob
}

export default importꓽglob
