import { createBrowserRouter } from 'react-router'

import { Layout } from './components/root'
import { NodePage } from './components/page--node/claude'

/////////////////////////////////////////////////

function IndexPage() {
	return <div>Welcome to DevDocs.</div>
}

/////////////////////////////////////////////////

export const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		children: [
			{ index: true, Component: IndexPage },
			{ path: 'node/:id', Component: NodePage },
		],
	},
])
