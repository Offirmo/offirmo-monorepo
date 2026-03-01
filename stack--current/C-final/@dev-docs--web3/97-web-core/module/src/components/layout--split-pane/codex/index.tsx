import React from 'react'

/*
SPECIFICATIONS
- Take the full size of its container.
- Take 2x child components: Sidebar and Content.
- Sidebar goes on the left, full height, own scrollbar if too big.
- Content goes on the right, full height, own scrollbar if too big.
- The sidebar can be resized horizontally by dragging its right edge.
- The sidebar size should be stored in local storage and restored on page reload.
- The sidebar size should be stored indexed by the screen size.
- If the screen size changes, the sidebar size should be restored to the last size
  for that screen size, or to a good default size if there is no stored size for that screen size.
*/

/////////////////////////////////////////////////

type ScreenBucket = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface Main2Props {
	Sidebar: React.ReactNode
	Content: React.ReactNode
	storageKey?: string
}

const DEFAULT_STORAGE_KEY = '@dev-docs--web3/web-core/main2/sidebar-widths/v1'
const DEFAULT_MIN_SIDEBAR_WIDTH_PX = 180
const DEFAULT_MAX_SIDEBAR_WIDTH_PX = 680
const DRAG_HANDLE_WIDTH_PX = 8

/////////////////////////////////////////////////

export default function Main2({
	Sidebar,
	Content,
	storageKey = DEFAULT_STORAGE_KEY,
}: Main2Props): React.JSX.Element {
	const rootRef = React.useRef<HTMLDivElement>(null)
	const [containerWidthPx, setContainerWidthPx] = React.useState(1200)
	const [screenBucket, setScreenBucket] = React.useState<ScreenBucket>(() =>
		getScreenBucket(getWindowWidthOr(1200)),
	)
	const [sidebarWidthPx, setSidebarWidthPx] = React.useState(() =>
		clampSidebarWidth(
			getPersistedWidth(storageKey, getScreenBucket(getWindowWidthOr(1200))) ??
				getDefaultSidebarWidth(getScreenBucket(getWindowWidthOr(1200)), 1200),
			1200,
		),
	)
	const dragStateRef = React.useRef<{ startX: number; startWidthPx: number } | null>(null)

	const minSidebarWidthPx = DEFAULT_MIN_SIDEBAR_WIDTH_PX
	const maxSidebarWidthPx = Math.min(DEFAULT_MAX_SIDEBAR_WIDTH_PX, Math.round(containerWidthPx * 0.75))

	React.useLayoutEffect(() => {
		const element = rootRef.current
		if (!element || typeof ResizeObserver === 'undefined') return

		const observer = new ResizeObserver((entries) => {
			const nextWidth = entries[0]?.contentRect.width
			if (!nextWidth || nextWidth <= 0) return
			setContainerWidthPx(nextWidth)
		})
		observer.observe(element)

		return () => observer.disconnect()
	}, [])

	React.useEffect(() => {
		if (typeof window === 'undefined') return

		const onWindowResize = () => {
			setScreenBucket(getScreenBucket(window.innerWidth))
		}

		window.addEventListener('resize', onWindowResize)
		return () => window.removeEventListener('resize', onWindowResize)
	}, [])

	React.useEffect(() => {
		const restored =
			getPersistedWidth(storageKey, screenBucket) ??
			getDefaultSidebarWidth(screenBucket, containerWidthPx)

		setSidebarWidthPx(clampSidebarWidth(restored, containerWidthPx))
	}, [containerWidthPx, screenBucket, storageKey])

	React.useEffect(() => {
		persistWidth(storageKey, screenBucket, sidebarWidthPx)
	}, [screenBucket, sidebarWidthPx, storageKey])

	const onPointerDown = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
		if (event.button !== 0) return
		dragStateRef.current = {
			startX: event.clientX,
			startWidthPx: sidebarWidthPx,
		}
		event.currentTarget.setPointerCapture(event.pointerId)
		window.document.body.style.cursor = 'col-resize'
		window.document.body.style.userSelect = 'none'
	}, [sidebarWidthPx])

	const onPointerMove = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
		const dragState = dragStateRef.current
		if (!dragState) return

		const delta = event.clientX - dragState.startX
		const next = clampSidebarWidth(dragState.startWidthPx + delta, containerWidthPx)
		setSidebarWidthPx(next)
	}, [containerWidthPx])

	const endDrag = React.useCallback(() => {
		dragStateRef.current = null
		window.document.body.style.cursor = ''
		window.document.body.style.userSelect = ''
	}, [])

	const onPointerUp = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
		if (dragStateRef.current) {
			event.currentTarget.releasePointerCapture(event.pointerId)
		}
		endDrag()
	}, [endDrag])

	const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
		let delta = 0
		if (event.key === 'ArrowLeft') delta = -16
		if (event.key === 'ArrowRight') delta = +16
		if (!delta) return

		event.preventDefault()
		setSidebarWidthPx((current) => clampSidebarWidth(current + delta, containerWidthPx))
	}, [containerWidthPx])

	const safeSidebarWidthPx = clampSidebarWidth(sidebarWidthPx, containerWidthPx)

	return (
		<div
			ref={rootRef}
			style={{
				width: '100%',
				height: '100%',
				minWidth: 0,
				minHeight: 0,
				display: 'flex',
				overflow: 'hidden',
				position: 'relative',
			}}
			data-o-component='main2'
			data-o-screen-bucket={screenBucket}
		>
			<div
				style={{
					flex: `0 0 ${safeSidebarWidthPx}px`,
					width: `${safeSidebarWidthPx}px`,
					height: '100%',
					minWidth: `${minSidebarWidthPx}px`,
					maxWidth: `${maxSidebarWidthPx}px`,
					minHeight: 0,
					overflow: 'auto',
					position: 'relative',
					borderRight: '1px solid color-mix(in srgb, currentColor 16%, transparent)',
					background: 'color-mix(in srgb, canvas 95%, currentColor 5%)',
				}}
			>
				{Sidebar}
				<div
					role='separator'
					aria-orientation='vertical'
					aria-label='Resize sidebar'
					aria-valuemin={minSidebarWidthPx}
					aria-valuemax={maxSidebarWidthPx}
					aria-valuenow={Math.round(safeSidebarWidthPx)}
					tabIndex={0}
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					onPointerUp={onPointerUp}
					onPointerCancel={endDrag}
					onKeyDown={onKeyDown}
					style={{
						position: 'absolute',
						top: 0,
						right: -Math.round(DRAG_HANDLE_WIDTH_PX / 2),
						width: `${DRAG_HANDLE_WIDTH_PX}px`,
						height: '100%',
						cursor: 'col-resize',
						touchAction: 'none',
						background: 'transparent',
					}}
				/>
			</div>

			<div
				style={{
					flex: '1 1 auto',
					height: '100%',
					minWidth: 0,
					minHeight: 0,
					overflow: 'auto',
				}}
			>
				{Content}
			</div>
		</div>
	)
}

/////////////////////////////////////////////////

function getWindowWidthOr(fallback: number): number {
	if (typeof window === 'undefined') return fallback
	return window.innerWidth || fallback
}

function getScreenBucket(viewportWidthPx: number): ScreenBucket {
	if (viewportWidthPx < 640) return 'xs'
	if (viewportWidthPx < 960) return 'sm'
	if (viewportWidthPx < 1280) return 'md'
	if (viewportWidthPx < 1600) return 'lg'
	return 'xl'
}

function getDefaultSidebarWidth(bucket: ScreenBucket, containerWidthPx: number): number {
	const idealByBucket: Record<ScreenBucket, number> = {
		xs: 220,
		sm: 240,
		md: 280,
		lg: 320,
		xl: 360,
	}

	const ideal = idealByBucket[bucket]
	return clampSidebarWidth(ideal, containerWidthPx)
}

function clampSidebarWidth(valuePx: number, containerWidthPx: number): number {
	const min = DEFAULT_MIN_SIDEBAR_WIDTH_PX
	const max = Math.min(DEFAULT_MAX_SIDEBAR_WIDTH_PX, Math.round(containerWidthPx * 0.75))
	const finiteValue = Number.isFinite(valuePx) ? valuePx : min
	return Math.max(min, Math.min(max, Math.round(finiteValue)))
}

function getPersistedWidth(storageKey: string, bucket: ScreenBucket): number | undefined {
	if (typeof window === 'undefined') return undefined

	try {
		const raw = window.localStorage.getItem(storageKey)
		if (!raw) return undefined

		const parsed = JSON.parse(raw) as Record<string, unknown>
		const candidate = parsed[bucket]
		return typeof candidate === 'number' && Number.isFinite(candidate)
			? candidate
			: undefined
	}
	catch {
		return undefined
	}
}

function persistWidth(storageKey: string, bucket: ScreenBucket, widthPx: number): void {
	if (typeof window === 'undefined') return

	try {
		const raw = window.localStorage.getItem(storageKey)
		const parsed = raw ? (JSON.parse(raw) as Record<string, unknown>) : {}
		parsed[bucket] = widthPx
		window.localStorage.setItem(storageKey, JSON.stringify(parsed))
	}
	catch {
		// localStorage may be unavailable/restricted; this component remains fully functional without persistence.
	}
}
