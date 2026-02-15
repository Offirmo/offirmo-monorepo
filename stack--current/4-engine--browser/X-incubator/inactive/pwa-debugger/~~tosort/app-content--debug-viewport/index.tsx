import { useEffect, useState } from 'react'

import ErrorBoundary from '@offirmo-private/react--error-boundary'
import { schedule_when_idle_but_not_too_far } from '@offirmo-private/async-utils'

import './index.css'

/////////////////////////////////////////////////

const ENV = [
	'--safe-area-inset-top',
	'--safe-area-inset-right',
	'--safe-area-inset-bottom',
	'--safe-area-inset-left',

	'--titlebar-area-x',
	'--titlebar-area-y',
	'--titlebar-area-width',
	'--titlebar-area-height',

	'--keyboard-inset-top',
	'--keyboard-inset-right',
	'--keyboard-inset-bottom',
	'--keyboard-inset-left',
	'--keyboard-inset-width',
	'--keyboard-inset-height',

	'--fold-top',
	'--fold-right',
	'--fold-bottom',
	'--fold-left',
]

let debug_msgs: string[] = [ 'init' ]
window.addEventListener("load", function() {
	debug_msgs.push('loaded')
}, false);
window.addEventListener( "orientationchange",function() {
	debug_msgs.push('orientationchange')
});

let r = 0
let pending_refresh = false
function DebugViewportReport() {
	r++
	const [ _, ask_for_refresh ] = useState(0)

	function on_viewport_event(evt: any) {
		if (pending_refresh) return

		schedule_when_idle_but_not_too_far(() => {
			console.log('on_viewport_event', evt)
			debug_msgs.push(`evt ${evt?.type}`)

			ask_for_refresh(r)
			pending_refresh = false
		});
		pending_refresh = true
	}

	useEffect(() => {
		document.addEventListener('scroll', on_viewport_event, { passive: true });
		return () => {
			document.removeEventListener('scroll', on_viewport_event);
		};
	}, []);

	if ('windowControlsOverlay' in navigator) {
		useEffect(() => {
			navigator.windowControlsOverlay.addEventListener('geometrychange', on_viewport_event, { passive: true });
			return () => {
				navigator.windowControlsOverlay.removeEventListener('geometrychange', on_viewport_event);
			};
		}, []);
	}

	return (
		<div key="values" className={'o⋄border⁚default'}>
			< h3>Viewport Debug Infos: #{r}</h3>

			{
				ENV.map(name => {
					const value = getComputedStyle(document.documentElement).getPropertyValue(name)
					return (value || '0px').trim() === '0px'
						? null
						: <pre key={name}>{name} = "{value}"</pre>
				})
			}

			{Boolean(window.scrollY) && <pre key="scrollY">scrollY = {window.scrollY}</pre>}
			{Boolean(window.scrollX) && <pre key="scrollX">scrollX = {window.scrollX}</pre>}
			{navigator.windowControlsOverlay?.visible && <pre key="wcov">windowControlsOverlay.visible = {String(navigator.windowControlsOverlay?.visible)}</pre>}
			{debug_msgs.map((msg, i) => <pre key={`msg#${i}`}>{msg}</pre>)}
		</div>)
}

function DebugViewport() {
	return [
		<div key="100lv_bg" className={'debug'} style={{
			position: 'absolute',
			top: 0,
			left: 0,
			border: 'none',
			width: '100lvw',
			height: '100lvh',
			background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
		}}/>,

		<div key="FVPcontainer" className={'o⋄full-viewport'} style={{}}>
			<div key="usableViewport" className={'o⋄usable-viewport'} style={{
				border: 'dashed 2px lightgreen',
			}}>
				<DebugViewportReport />
				<form>
					<input type="text"/>
				</form>
				<button onClick={() => location.reload()}>reload</button>
			</div>
		</div>,

		<div key="100lv" className={'debug'} style={{
			border: 'dashed 5px red',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100lvw',
			height: '100lvh',
			pointerEvents: 'none',
			//background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
		}}/>,

		<div key="100dv" className={'debug'} style={{
			border: 'dashed 3px yellow',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100dvw',
			height: '100dvh',
			pointerEvents: 'none',
		}}/>,

		<div key="100sv" className={'debug'} style={{
			border: 'dashed 2px green',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100svw',
			height: '100svh',
			pointerEvents: 'none',
		}}/>,
	]
}


/////////////////////////////////////////////////

export default DebugViewport
export {
	DebugViewportReport,
}
