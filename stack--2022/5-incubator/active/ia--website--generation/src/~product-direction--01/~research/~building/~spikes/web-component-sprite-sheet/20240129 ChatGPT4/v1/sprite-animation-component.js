class SpriteAnimation extends HTMLElement {
	connectedCallback() {
		const spriteUrl = this.getAttribute('sprite-url');
		const sheetWidth = parseInt(this.getAttribute('sheet-width'), 10);
		const sheetHeight = parseInt(this.getAttribute('sheet-height'), 10);
		const rows = parseInt(this.getAttribute('rows'), 10);
		const columns = parseInt(this.getAttribute('columns'), 10);

		const frameWidth = sheetWidth / columns;
		const frameHeight = sheetHeight / rows;

		this.style.display = 'inline-block';
		this.style.width = `${frameWidth}px`;
		this.style.height = `${frameHeight}px`;
		this.style.backgroundImage = `url(${spriteUrl})`;
		this.style.backgroundSize = `${sheetWidth}px ${sheetHeight}px`;
		this.animateSprite(rows, columns, frameWidth, frameHeight);
	}

	animateSprite(rows, columns, frameWidth, frameHeight) {
		let currentRow = 0;
		let currentColumn = 0;

		setInterval(() => {
			currentColumn = (currentColumn + 1) % columns;
			if (currentColumn === 0) {
				currentRow = (currentRow + 1) % rows;
			}
			this.style.backgroundPosition = `-${currentColumn * frameWidth}px -${currentRow * frameHeight}px`;
		}, 333); // Adjust frame rate as needed
	}
}

window.customElements.define('sprite-animation', SpriteAnimation);
