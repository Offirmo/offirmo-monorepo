/* ChatGPT 4 2024/01/29
 * tweaked by Offirmo
 */

/////////////////////////////////////////////////

/*
interface SpriteSheetDefinition {
	// asset
	url‿str: string
	width: number
	height: number
	padding: [number, number, number, number]

	// spritesheet
	rows: number
	cols: number
	frameRate: number
	row_spacing: number
	col_spacing: number
}*/

const BASELINE_RATIO = 0.9

function getꓽspriteCount(def) {
	return def.rows * def.cols
}

function getꓽframeSize(def) {
	const usedWidth = def.width - def.padding[1] - def.padding[3] - def.col_spacing * (def.cols - 1)
	const usedHeight = def.height - def.padding[0] - def.padding[2] - def.row_spacing * (def.rows - 1)
	return {
		width: Math.floor(usedWidth / def.cols),
		height: Math.floor(usedHeight / def.rows),
	}
}

function getꓽBgPositionCoordinatesForSprite(def, frameIndex) {
	const currentColumn = frameIndex % def.cols
	const currentRow = Math.trunc(frameIndex / def.cols)
	//console.log(`${frameIndex} -> ${currentColumn}, ${currentRow}`)
	const frameSize = getꓽframeSize(def)

	return {
		x:
			+ def.padding[3]
			+ currentColumn * frameSize.width
			+ currentColumn * def.col_spacing
			+ (def.adjustments.col[currentColumn]?.d ?? 0),
		y:
			+ def.padding[0]
			+ currentRow * frameSize.height
			+ currentRow * def.row_spacing
			+ (def.adjustments.row[currentRow]?.d ?? 0)
		,
		...frameSize,
	}
}

function setꓽBgPositionForSprite(element, def, frameIndex) {
	const coords = getꓽBgPositionCoordinatesForSprite(def, frameIndex)

	element.style.backgroundPosition = `-${coords.x}px -${coords.y}px`
}

function setꓽcontainer_style(element, def) {
	const frameSize = getꓽframeSize(def)

	element.style.display = 'inline-block'
	element.style.width = `${frameSize.width}px`
	element.style.height = `${frameSize.height}px`
	//element.style.backgroundAttachment = 'fixed'
	element.backgroundOrigin= 'border-box'
	element.style.backgroundImage = `url(${def.url‿str})`
	element.style.backgroundSize = `${def.width}px ${def.height}px`
}


/////////////////////////////////////////////////

class AnimatedSpriteSheet extends HTMLElement {

	connectedCallback() {
		const def/*: SpriteSheetDefinition*/ = {
			url‿str: this.getAttribute('asset-url'),
			width: -1,
			height: -1,
			rows: parseInt(this.getAttribute('rows'), 10),
			cols: parseInt(this.getAttribute('columns'), 10),
			frameRate: 7,

			// adjust this first
			padding: [ 15, 25, 28, 15 ], /*[
				parseInt(this.getAttribute('padding-top'), 10),
				parseInt(this.getAttribute('padding-right'), 10),
				parseInt(this.getAttribute('padding-bottom'), 10),
				parseInt(this.getAttribute('padding-left'), 10),
			],*/
			// then this
			row_spacing: 20,
			col_spacing: 15,
			// then this
			adjustments: {
				row: {
					0: {
						d: -2,
					},
					1: {
						d: -10,
					},
					2: {
						d: -18,
					},
					3: {
						d: -12,
					},
					4: {
						d: -4,
					},
					5: {
						d: -2,
					},
				},
				col: {
					0: {
						d: -7,
					},
					1: {
						d: -6,
					},
					2: {
						d: -7,
					},
					3: {
						d: -7,
					},
					4: {
						d: 0,
					},
					5: {
						d: 2,
					},
					6: {
						d: 0,
					},
				},
			}
		}
		this.debug = Boolean(this.getAttribute('debug'))

		new Promise(resolve => {
			const img = new Image()
			img.src = def.url‿str
			img.onload = function () {
				resolve({
					width: img.naturalWidth,
					height: img.naturalHeight,
				})
			}
		}).then(({ width, height }) => {
			//console.log('Image loaded!', { width, height })
			def.width = width
			def.height = height


			if (this.debug) {
				const frameCount = getꓽspriteCount(def)
				const frameSize = getꓽframeSize(def)
				console.log('Hi!', {
					def,
					'getꓽspriteCount': frameCount,
					'getꓽframeSize': frameSize,
				})

				const body‿elt = document.getElementsByTagName('body')[0]
				body‿elt.style.backgroundColor = 'antiquewhite'

				const margin = 50
				const sw = def.width + frameSize.width + margin * 3
				const sh = def.height + frameSize.height + margin * 3
				const debug_area‿html = `
<svg width="${sw}" height="${sh}" viewBox="${-margin} ${-margin} ${sw} ${sh}">

	<rect x="${-margin}" y="${-margin}" width="${sw}" height="${sh}" stroke="chocolate" fill="bisque" />

	<image x="0" y="0" width="${def.width}" height="${def.height}" href="${def.url‿str}" />

	<rect x="0" y="0" width="${def.width}" height="${def.height}" stroke="red" fill="transparent" />

	${Array.from(new Array(getꓽspriteCount(def)), (_, i) => {
						let result = ''
						const coords = getꓽBgPositionCoordinatesForSprite(def, i)

						//console.log(i, { coords, })

						result += `
						<svg x="${coords.x}" y="${def.height + margin}" width="${coords.width}" height="${coords.height}" viewBox="${coords.x} ${coords.y} ${coords.width} ${coords.height}" opacity="${1./def.rows}">
							<image x="0" y="0" width="${def.width}" height="${def.height}" href="${def.url‿str}" />
						</svg>
						<svg x="${def.width+margin}" y="${coords.y}" width="${coords.width}" height="${coords.height}" viewBox="${coords.x} ${coords.y} ${coords.width} ${coords.height}" opacity="${1./def.rows}">
							<image x="0" y="0" width="${def.width}" height="${def.height}" href="${def.url‿str}" />
						</svg>
`
						result += `<rect x="${coords.x}" y="${coords.y}" width="${coords.width}" height="${coords.height}" stroke="red" fill="transparent" />`

						return result
					})
					.join('')
				}

	${Array.from(new Array(def.cols), (_, i) => {
						// for each colum...
						let result = ''

						const coords = getꓽBgPositionCoordinatesForSprite(def, i)

						// sprite contour
						result += `<rect x="${coords.x}" y="${def.height + margin}" width="${frameSize.width}" height="${frameSize.height}" stroke="red" fill="transparent" />`

						// colums guide
						result += `<line x1="${coords.x + frameSize.width/2}" y1="${-margin/2}" x2="${coords.x + frameSize.width/2}" y2="${sh - margin/2}" stroke="black" stroke-dasharray="10,10" />`

						return result
					})
					.join('')
				}

		${Array.from(new Array(def.rows), (_, i) => {
					// for each row...
					let result = ''

					const coords = getꓽBgPositionCoordinatesForSprite(def, i * def.cols)

					// row guide
					result += `<line x1="${-margin/2}" y1="${coords.y + frameSize.height*BASELINE_RATIO}" x2="${sw - margin/2}" y2="${coords.y + frameSize.height*BASELINE_RATIO}" stroke="black" stroke-dasharray="10,10" />`

					// accumulated sprite contour
					result += `<rect x="${def.width + margin}" y="${coords.y}" width="${frameSize.width}" height="${frameSize.height}" stroke="red" fill="transparent" />`

					return result
				}).join('')}
</svg>
			`

				this.insertAdjacentHTML('beforeend', debug_area‿html)
			} else {

				setꓽcontainer_style(this, def);
				this.animateSprite(def);
			}
		})
	}

	animateSprite(def) {
		const frameCount = getꓽspriteCount(def)
		let frameIndex = 0
		/*
		frameIndex = 41
		console.log({
			frameIndex,
			bgpos: getꓽBgPositionCoordinatesForSprite(def, frameIndex),
		})
		setꓽBgPositionForSprite(this, def, frameIndex);*/

		setInterval(() => {
			setꓽBgPositionForSprite(this, def, frameIndex);

			frameIndex = (frameIndex + 1) % frameCount;
		}, 1000. / def.frameRate)
	}
}

/*
class AnimatedSpriteSheet extends HTMLElement {
	connectedCallback() {
		const spriteUrl = this.getAttribute('asset-url');
		const sheetWidth = parseInt(this.getAttribute('asset-width'), 10);
		const sheetHeight = parseInt(this.getAttribute('asset-height'), 10);
		const rows = parseInt(this.getAttribute('rows'), 10);
		const columns = parseInt(this.getAttribute('columns'), 10);
		const frameRate = this.getAttribute('frame-rate-fps') ? parseInt(this.getAttribute('frame-rate-fps'), 10) : 3;
		this.debug = Boolean(this.getAttribute('debug'))

		const frameWidth = sheetWidth / columns;
		const frameHeight = sheetHeight / rows;

		setStyle(this, frameWidth, frameHeight, spriteUrl, sheetWidth, sheetHeight);

		if (this.debug) {
			const frameCount = rows * columns;

			this.style.position = 'relative'
		}
		else {
			this.animateSprite(rows, columns, frameWidth, frameHeight, frameRate);
		}
	}


}*/

/////////////////////////////////////////////////

window.customElements.define('animated-sprite-sheet', AnimatedSpriteSheet)
