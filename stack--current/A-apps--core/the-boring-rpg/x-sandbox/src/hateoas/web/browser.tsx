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
	status: 'starting' | 'nominal' | 'stopping' = 'starting'
	current_route: Uri‿str
	current_hypermedia: HypermediaType | undefined // do we actually need it?
	stack: Array<[string, ReactNode]>
}

export class HypermediaBrowserWithWebInterface<HypermediaType, Action> extends Component<
	Props<HypermediaType, Action>,
	State<HypermediaType>
> {
	ↆpending_get: Promise<void> | undefined
	ↆpending_async: Array<Promise<void>> = []

	constructor(props: Props<HypermediaType, Action>) {
		super(props)

		this.state = {
			status: 'starting',
			current_route: DEFAULT_ROOT_URI,
			current_hypermedia: undefined,
			stack: [],
		}
	}

	componentDidMount() {
		this.navigate_to(DEFAULT_ROOT_URI)
	}

	// to be called when we guess that there may be new engagement
	// 1. when a new route is loaded
	// 2. when an action is dispatched
	dequeue_engagement() {
		console.warn('TODO dequeue_engagement')
	}

	async get_next_content(): Promise<State<HypermediaType>['stack'][number]> {
		// REMINDER: ideally we want everything in the HATEOAS
		// This is a BROWSER which should not contain app-specific behaviour

		if (this.ↆpending_async.length) {
			//console.log(`[awaiting pending...]`)
			await Promise.all(this.ↆpending_async)
			this.ↆpending_async = []
		}

		switch(this.state.status) {
			case 'starting': {
				// skip the PEF & PENF messages
				// to give a chance for some content
				// (hopefully introducing the app)
				// to be displayed first
				break
			}
			case 'nominal': {
				const pe = this.props.server.get_next_pending_engagement(this.state.current_route)
				if (pe) {
					const { $doc, uid } = pe
					// TODO improve depending on the format!
					return []
					const step: Step<ContentType> = {
						type: StepType.simple_message,
						msg: $doc,
						callback: () => dispatch(actionⵧack),
					}
					//console.log(`[gen_next_step()] ...yielding from PEF`)
					return step
				}
				break
			}
			default:
				throw new Error(`gen_next_step called in invalid status "${this.status}"!`)
		}

		console.log(`[Browsing: "${this.current_route}"]`)

		const hypermedia = await this.server.get(this.current_route)

		const actions = RichText.renderⵧto_actions(hypermedia)
		const actionsⵧreducers = actions.filter(a => a.type === 'action')
		const actionsⵧlinks = actions
			.filter(a => a && a.type === 'hyperlink')
			.filter((ha: RichText.HyperlinkAction)=> {
				return !ha.link.rel.includes('self')
					&& normalizeꓽuri‿SSP(ha.link.href).path !== this.current_route
			})
		const continue_links = actionsⵧlinks.filter(a => a.link.rel.includes('continue-to'))
		assert(continue_links.length <= 1, 'Should have 0 or 1 continue-to links.')
		const actionⵧlinkⵧcontinue = continue_links[0]
		const actionsⵧbrowser: Array<RichText.HyperlinkAction> = [
			// TODO one day "back" (history)
			// TODO one day "home" (/)
		]

		if((actionsⵧreducers.length + actionsⵧlinks.length) === 0) {
			this.status = 'stopping'
			const step: Step<ContentType> = {
				type: StepType.simple_message,
				msg: '[🖼️ No more actions available. Goodbye!]',
			}
			this.pending_steps.unshift(step)
		}
		else if (!actionⵧlinkⵧcontinue) {
			const step_input: SelectStep<ContentType, RichText.Action> = {
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
			this.pending_steps.unshift(step_input)
		}

		const step_content: Step<ContentType> = {
			type: StepType.simple_message,
			msg: hypermedia,
			callback: () => {
				if (actionⵧlinkⵧcontinue) {
					navigate_to(actionⵧlinkⵧcontinue.link.href)
				}
			},
		}
		/*console.log(`[gen_next_step()] ...yielding from hypermedia content:`,
			//prettifyꓽjson(step_content)
		)*/
		return step_content
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
			// load the new route
			console.log(`navigate_to: initiating load for route ${new_route}`, { current: this.state.current_route})
			const ↆget = this.props.server.get(new_route)
			this.ↆpending_get = ↆget.then(hypermedia => {
				console.log(`navigate_to: hypermedia loaded for route ${new_route}`)
				if (this.state.current_route !== new_route) {
					console.log('but route changed in-between! ignoring.')
					return
				}

				this.dequeue_engagement()

				const actions = RichText.renderⵧto_actions(hypermedia)
				const actionⵧlinkⵧcontinue = getꓽactionⵧcontinue_to(actions)

				if (actionⵧlinkⵧcontinue) {
					console.log('navigate_to -> preload -> found a continue link, following...')
					this.navigate_to(actionⵧlinkⵧcontinue.link.href)
					return
				}

				// TODO enqueue stack

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

		const elements: ReactNode[] = [...this.state.stack];

		if (!this.state.current_hypermedia) {
			elements.push(<p key="main">Loading "<code>{this.state.current_route}</code>"...</p>)
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
							{this.state.stack.map(([key, element]) =>
								<tr key={key}>
									<td>
										{element}
									</td>
								</tr>
							)}
				</tbody>
			</table>
		)
	}
}
