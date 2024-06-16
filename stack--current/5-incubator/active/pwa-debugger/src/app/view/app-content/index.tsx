import { useEffect, useState, useRef } from 'react'
import actual from 'actual'

import ErrorBoundary from '@offirmo-private/react-error-boundary'
import { schedule_when_idle_but_not_too_far } from '@offirmo-private/async-utils'

import './index.css'

/////////////////////////////////////////////////

const { format } = new Intl.NumberFormat('en', {
	style: 'decimal',
	maximumFractionDigits: 2,
	minimumFractionDigits: 0,
})

const CSS_ENV_VARS = [
	// PREREQUISITE those vars are defined from env() in @offirmo-private/css--framework
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

// https://drafts.csswg.org/mediaqueries-4/#media-descriptor-table
const CSS_RANGE_FEATURES = [


	//{ feature: 'device-width',        unit: 'px', unit‿h: '', default: undefined},
	//{ feature: 'device-height',       unit: 'px', unit‿h: '', default: undefined},
	{ feature: 'device-aspect-ratio', unit: undefined, unit‿h: '', default: undefined},

	{ feature: 'color',        unit: undefined, unit‿h: 'bits', default: undefined},
	{ feature: 'color-gamut',  unit: undefined, unit‿h: '', default: undefined},
	{ feature: 'color-index',  unit: undefined, unit‿h: '', default: undefined},
	{ feature: 'monochrome', unit: undefined, unit‿h: '', default: undefined},

	//{ feature: 'width', unit: 'px', unit‿h: '', default: undefined},
	//{ feature: 'height', unit: 'px', unit‿h: '', default: undefined},
	{ feature: 'aspect-ratio', unit: undefined, unit‿h: '', default: undefined},

	{ feature: 'orientation', unit: undefined, unit‿h: '', default: undefined},
	{ feature: 'overflow-block', unit: undefined, unit‿h: '', default: undefined},
	{ feature: 'overflow-inline', unit: undefined, unit‿h: '', default: undefined},

	{ feature: 'resolution', unit: 'dpi', unit‿h: '', default: undefined},
	{ feature: 'grid', unit: undefined, unit‿h: '', default: undefined},
	{ feature: 'scan', unit: undefined, unit‿h: '', default: undefined},
	{ feature: 'update', unit: undefined, unit‿h: '', default: undefined},
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
			< h3>Viewport Debug Infos</h3>
			<pre key="refresh">Refresh #{r}</pre>

			{
				CSS_ENV_VARS.map(name => {
					const value = getComputedStyle(document.documentElement).getPropertyValue(name)
					return (value || '0px').trim() === '0px'
						? null
						: <pre key={'getComputedStyle-' + name}>{name} = "{value}"</pre>
				})
			}

			{
				CSS_RANGE_FEATURES.map(spec => {
					const value = actual(spec.feature, spec.unit)
					return value === 0
						? null
						: <pre key={'actual-' + spec.feature}>{spec.feature} = {value}{spec.unit‿h || spec.unit}</pre>
				})
			}

			{Boolean(window.scrollY) && <pre key="scrollY">scrollY = {window.scrollY}</pre>}
			{Boolean(window.scrollX) && <pre key="scrollX">scrollX = {window.scrollX}</pre>}
			{navigator.windowControlsOverlay?.visible && <pre key="wcov">windowControlsOverlay.visible = {String(navigator.windowControlsOverlay?.visible)}</pre>}
			{debug_msgs.map((msg, i) => <pre key={`msg#${i}`}>- #{i+1}: {msg}</pre>)}
		</div>)
}


function App() {
	const [ tick, setꓽtick ] = useState(0)
	console.log('<App> render…', tick)
	const full_vp‿ref = useRef(null);

	useEffect(() => {
		const t = setTimeout(() => {
			setꓽtick(tick + 1)
		}, 1000)
		return () => {
			clearTimeout(t)
		}
	}, [tick]);

	return (
		<div ref={full_vp‿ref} id="content" key="FVPcontainer" className={'o⋄full-viewport with-clear-borders'} style={{ isolation: 'isolate' }}>
			<h2>
				<span className="key">[@media/device]</span>
				<span className="value">{actual('device-width', 'px')}x{actual('device-height', 'px')}</span>
			</h2>
			<h2>
				<span className="key">[outer]</span>
				<span className="value">{window.outerWidth}x{window.outerHeight}</span>
			</h2>
			<h2>
				<span className="key">[inner]</span>
				<span className="value">{window.innerWidth}x{window.innerHeight}</span>
			</h2>
			<h2>
				<span className="key">[@media]</span>
				<span className="value">{actual('width', 'px')}x{actual('height', 'px')}</span>
			</h2>
			<h2>
				<span className="key">[measured]</span>
				<span className="value">{format(full_vp‿ref?.current?.getBoundingClientRect()?.width || 0)}x{format(full_vp‿ref?.current?.getBoundingClientRect()?.height || 0)}</span>
			</h2>
			{window?.fullScreen && <h3>Full screen?</h3>}
			{null & <DebugViewportReport/>}
		</div>
	)
}

//			<DebugViewportReport />

/////////////////////////////////////////////////

export default App
