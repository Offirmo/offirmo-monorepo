import { render_any_children, render_any_m } from './index.tsx'

function Component(props: React.PropsWithChildren) {
	return <div>
		My children:<br/>
		${render_any_children(props)}
	</div>
}

export function String() {
	return <Component>string</Component>
}
