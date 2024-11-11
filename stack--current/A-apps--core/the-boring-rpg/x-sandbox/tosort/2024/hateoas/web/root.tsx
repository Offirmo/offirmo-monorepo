import React from "react"

import { AppHateoasServer } from './server'
import { HypermediaBrowserWithWebInterface } from './browser'

export default function Root() {
	const server = new AppHateoasServer()

	return (
		<HypermediaBrowserWithWebInterface server={server} />
	)
}
