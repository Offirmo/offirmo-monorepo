import { useState } from 'react'
import { Outlet } from 'react-router'
import { create, type State } from '@devdocs/state'

import { LayoutSplitPane } from '../layout--split-pane'
import { SidebarTree } from '../sidebar'

/////////////////////////////////////////////////

export function Layout() {
	const [state] = useState<State>(() => create())

	const sidebar = <SidebarTree state={state} />
	const content = <Outlet context={state} />

	return <LayoutSplitPane sidebar={sidebar} content={content} />
}
