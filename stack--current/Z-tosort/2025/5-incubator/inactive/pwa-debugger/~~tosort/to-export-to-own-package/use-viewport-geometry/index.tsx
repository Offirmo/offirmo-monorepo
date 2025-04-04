import { useEffect, useMemo, useState, useDebugValue, useId } from 'react'

/////////////////////////////////////////////////

function useViewportGeometry(simple_log?: string[]) {
	const id = useId()
	console.log(`render: useViewportGeometry(${id})`)

	const [ hasꓽtitle_bar_area, setꓽhasꓽtitle_bar_area ] = useState(false)
	useDebugValue(hasꓽtitle_bar_area ? 'title_bar_area=true' : 'title_bar_area=false');

	function on_viewport_event(evt: any) {
		console.log(`useViewportGeometry(${id}) on_viewport_event:`, evt?.type)

		if (simple_log) {
			simple_log.push(`evt ${evt?.type}`)
		}

		const styles = getComputedStyle(document.documentElement)

		setꓽhasꓽtitle_bar_area((() => {
				try {
					const width = parseInt(styles.getPropertyValue('--titlebar-area-width'))
					const height = parseInt(styles.getPropertyValue('--titlebar-area-height'))
					return width > 0 && height > 0
				} catch (err: any) {
					console.error(err)
					return false
				}
			})())
	}

	if ('windowControlsOverlay' in navigator) {
		useEffect(() => {
			//console.log(`useViewportGeometry(${id}) aEL geometrychange`)
			navigator.windowControlsOverlay.addEventListener('geometrychange', on_viewport_event, { passive: true })
			return () => {
				//console.log(`useViewportGeometry(${id}) rEL geometrychange`)
				navigator.windowControlsOverlay.removeEventListener('geometrychange', on_viewport_event)
			};
		}, []);
	}

	useEffect(() => {
		//console.log(`useViewportGeometry(${id}) aEL load+orientationchange`)
		window.addEventListener("load", on_viewport_event, { passive: true })
		window.addEventListener("orientationchange", on_viewport_event, { passive: true })
		window.addEventListener("resize", on_viewport_event, { passive: true })

		return () => {
			//console.log(`useViewportGeometry(${id}) rEL cleanup load+orientationchange`)
			window.removeEventListener("load", on_viewport_event)
			window.removeEventListener("orientationchange", on_viewport_event)
			window.removeEventListener("resize", on_viewport_event)
		};
	}, []);

	return {
		hasꓽtitle_bar_area,
		// what else do we need?
	}
}

/////////////////////////////////////////////////

export default useViewportGeometry
