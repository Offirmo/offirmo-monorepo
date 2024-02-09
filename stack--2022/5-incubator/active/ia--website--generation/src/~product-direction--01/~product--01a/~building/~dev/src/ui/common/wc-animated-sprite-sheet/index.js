/* ChatGPT 4 2024/01/29
 * tweaked by Offirmo
 */

function setSprite(element, rows, columns, frameWidth, frameHeight, currentFrame, dx = 0, dy = 0) {

	const currentRow = Math.floor(currentFrame / columns);
	const currentColumn = currentFrame % columns;
	/*console.log({
		currentFrame,
		currentRow,
		currentColumn,
	})*/

	element.style.backgroundPosition = `-${dx + currentColumn * frameWidth}px -${dy + currentRow * frameHeight}px`;
}

function setStyle(element, width, height, bgUrl, bgWidth, bgHeight) {
	element.style.display = 'inline-block';
	element.style.width = `${width}px`;
	element.style.height = `${height}px`;
	element.style.backgroundImage = `url(${bgUrl})`;
	element.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
}



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

	animateSprite(rows, columns, frameWidth, frameHeight, frameRate) {
		const frameCount = rows * columns;
		let currentFrame = 0;

		setInterval(() => {
			setSprite(this, rows, columns, frameWidth, frameHeight, currentFrame);

			currentFrame = (currentFrame + 1) % frameCount;
		}, 1000. / frameRate)
	}
}

window.customElements.define('animated-sprite-sheet', AnimatedSpriteSheet);
