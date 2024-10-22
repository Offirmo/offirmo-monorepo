import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import React, { Component, type ReactNode } from "react"
import { type Hyperlink, type Uri‿str, type URI‿x, type SchemeSpecificURIPart } from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'
import { to_react } from '@offirmo-private/rich-text-format--to-react'

import { type HATEOASServer } from '../../to-export-to-own-package/hateoas/types'
import {
	DEFAULT_ROOT_URI,
	getꓽCTA,
	normalizeꓽuri‿SSP,
	normalizeꓽuri‿str,
	getꓽactionⵧcontinue_to, getꓽactionsⵧreducers, getꓽactionsⵧlinks,
} from '../to-migrate'

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

	componentDidMount() {
		this.navigate_to(DEFAULT_ROOT_URI)
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
		}, () => {
			// start preloading immediately
			console.log(`navigate_to: initiating load for route ${new_route}`, { current: this.state.current_route})
			const ↆget = this.props.server.get(new_route)
			this.ↆpending_get = ↆget.then(hypermedia => {
				console.log(`navigate_to: hypermedia loaded for route ${new_route}`)
				if (this.state.current_route !== new_route) {
					console.log('but route changed in-between! ignoring.')
					return
				}

				const actions = RichText.renderⵧto_actions(hypermedia)
				const actionⵧlinkⵧcontinue = getꓽactionⵧcontinue_to(actions)

				if (actionⵧlinkⵧcontinue) {
					console.log('navigate_to -> preload -> found a continue link, following...')
					this.navigate_to(actionⵧlinkⵧcontinue.link.href)
					return
				}

				this.setState((prevState, props) => {
					if (prevState.current_route !== new_route) {
						console.log('navigate_to -> preload -> setState, route changed in-between! ignoring.')
						return
					}

					return {
						current_hypermedia: hypermedia,
					}
				})
			})
		})
	}

	render() {
		console.log("🔄 Browser render", {
			props: this.props,
			state: this.state,
		});

		const elements: ReactNode[] = [];

		if (!this.state.current_hypermedia) {
			elements.push(<p key="main">Loading...</p>)
		}
		else {
			const hypermedia = this.state.current_hypermedia
			elements.push(to_react(hypermedia))

			const actions = RichText.renderⵧto_actions(hypermedia)
			const actionsⵧreducers = getꓽactionsⵧreducers(actions)
			const actionsⵧlinks = getꓽactionsⵧlinks(actions, {
				excluding_relꘌself: true,
				excluding_pathꘌ: normalizeꓽuri‿SSP(this.state.current_route).path,
			})
			const actionsⵧbrowser: Array<RichText.HyperlinkAction> = [
				// TODO one day "back" (history)
				// TODO one day "home" (/)
			]

			if((actionsⵧreducers.length + actionsⵧlinks.length) === 0) {
				// nothing special
			}
			else {
				elements.push(<p key="input">What do you want to do? TODO input</p>)
				/*const step_input: SelectStep<ContentType, RichText.Action> = {
					type: StepType.select,
					prompt: 'What do you want to do?',
					options: Object.fromEntries([
						...actionsⵧreducers,
						...actionsⵧlinks,
						...actionsⵧbrowser,
					].map((v, i) => [
						String(i).padStart(2, '0'),
						{
							cta: getꓽCTA(v),
							value: v,
						} ])),
					callback(value) {
						//console.log('Callback!', prettifyꓽjson(value))
						reset_infinite_loop_prevention()

						switch (value.type) {
							case 'action': {
								dispatch(value.payload)
								if (value.href)
									navigate_to(value.href)
								break
							}
							case 'hyperlink': {
								navigate_to(value.link.href)
								break
							}
							default:
								throw new Error(`NIMP action type "${(value as any)?.type}"!`)
						}
					},
					msg_as_user: (action: RichText.Action) => `I select: ${getꓽCTA(action)}`,
					//msg_acknowledge: (action: RichText.Action) => `You selected: ${getꓽCTA(action)}`,
				}
				this.pending_steps.unshift(step_input)*/
			}
		}

		return (<table className="o⋄usable-viewport">
				<thead>
					<tr>
						<th>
							<code key="route">{this.state.current_route}</code>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							{elements}
						</td>
					</tr>
				</tbody>
			</table>
		)
	}
}
