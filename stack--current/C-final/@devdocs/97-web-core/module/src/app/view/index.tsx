import 'react'
import { RouterProvider } from 'react-router'

import loadꓽcss from './css'

import { router } from './router'

/////////////////////////////////////////////////

export function Root() {
	loadꓽcss()

	return <RouterProvider router={router} />
}

export function Root0() {
	loadꓽcss()

	return <>Hello World!</>
}
