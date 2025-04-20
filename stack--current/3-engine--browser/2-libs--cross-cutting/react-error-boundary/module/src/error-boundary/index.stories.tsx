import { ErrorBoundary } from './index.tsx'

/*
function Component(props: React.PropsWithChildren) {
	return (
		<table>
			<thead>
			<tr>
				<th>normal</th><th>render_any</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>
					{props.children}
				</td>
				<td>
					{render_any_children(props)}
				</td>
			</tr>
			</tbody>
		</table>
	)
}*/

export default {
	//title: 'Types/CSFv3',
	//component: Component,
	args: {
		//name: 'Demo',
		//key: '1',
	}
	/*parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { onClick: fn() },*/
};

export const NoChildren = {
	render: () => <ErrorBoundary name='no'/>
}


export const String = {
	render: () => <ErrorBoundary name='str'>String</ErrorBoundary>
}

export const Strings = {
	render: () => (
		<ErrorBoundary name='strs'>
			String
			<br/>
			And another string
			<br/>
			{+Date.now()}
		</ErrorBoundary>
	)
}
