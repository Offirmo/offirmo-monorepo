import React, { Component, type ReactNode } from "react"
import { type Hyperlink, type Uri‿str, type URI‿x, type SchemeSpecificURIPart } from '@offirmo-private/ts-types-web'

import { type HATEOASServer } from '../../to-export-to-own-package/hateoas/types'
import { DEFAULT_ROOT_URI, normalizeꓽuri‿str } from '../to-migrate'

interface Props<HypermediaType, Action> {
	server: HATEOASServer<HypermediaType, Action>
}

interface State<HypermediaType> {
	current_route: Uri‿str
	current_hypermedia: HypermediaType | undefined
}

export class HypermediaBrowserWithWebInterface<HypermediaType, Action> extends Component<
	Props<HypermediaType, Action>,
	State<HypermediaType>
> {
	ↆpending_get: Promise<void> | undefined

	constructor(props: Props<HypermediaType, Action>) {
		super(props)

		this.state = {
			current_route: DEFAULT_ROOT_URI,
			current_hypermedia: undefined,
		}
	}

	navigate_to(uri: URI‿x) {
		console.log(`\n[⇨ Navigating to: "${uri}"…]`)
		console.log('------------------------------------------------------')
		const new_route = normalizeꓽuri‿str(uri)

		this.setState((prevState, props) => {
			if (prevState.current_route === new_route) {
				console.log('navigate_to -> setState, same route ignoring.')
				return
			}

			return {
				current_route: new_route,
				current_hypermedia: undefined,
			}
		})

		// start preloading immediately
		const ↆget = this.props.server.get(new_route)
		this.ↆpending_get = ↆget.then(hypermedia => {
			if (this.state.current_route !== new_route) {
				console.log('🚨 Navigation changed while loading, ignoring.')
				return
			}
			this.setState({
				current_route: new_route,
				current_hypermedia: hypermedia,
			})
		})
	}

	render() {
		console.log("🔄 Browser render", this.props, this.state);

		const elements: ReactNode[] = [];
		elements.push(<code key="route">{this.current_route}</code>)

		if (!this.current_hypermedia) {
			elements.push(<p>Loading...</p>)
			if (!this.pending_get) {
				this.pending_get = this.props.server.get(this.current_route)
					.then(hypermedia => {
						this.current_hypermedia = hypermedia
						//this.forceUpdate()
					})
			}
		}
		else {
			elements.push(<p>NIMP!</p>)
		}

		return (<table>
				<thead>
					<tr>
						<th>{this.state.current_route}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{this.state.current_hypermedia
							? <p>NIMP!</p>
							: 'Loading...'
						}</td>
					</tr>
				</tbody>
			</table>

		)
	}
}
