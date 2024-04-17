import { useEffect, useState, useCallback } from 'react'

import { schedule_when_idle_but_not_too_far } from '@offirmo-private/async-utils'

/////////////////////////////////////////////////

let r = 0
let pending_refresh = false
function useViewportGeometry() {
	const [ , ask_for_refresh ] = useState(0)

	const on_viewport_event = useCallback(function on_viewport_event(evt: any) {
		if (pending_refresh) return

		schedule_when_idle_but_not_too_far(() => {
			console.log('on_viewport_event', evt)
			ask_for_refresh(r)
			pending_refresh = false
		});
		pending_refresh = true
	})

	if ('windowControlsOverlay' in navigator) {
		useEffect(() => {
			navigator.windowControlsOverlay.addEventListener('geometrychange', on_viewport_event, { passive: true });
			return () => {
				navigator.windowControlsOverlay.removeEventListener('geometrychange', on_viewport_event);
			};
		}, []);
	}

	return {
		hasꓽtitle_bar_area: false,
		// what else do we need?
	}
}

/////////////////////////////////////////////////

export default useViewportGeometry
