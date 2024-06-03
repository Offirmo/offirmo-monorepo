/*
 * SimpleSpriteSheetAnimation Web Component
 *
 * Usage:
 * <simple-sprite-sheet-animation
 *     sheet-url="path_to_sprite_sheet.png"
 *     sheet-width="1024"
 *     sheet-height="768"
 *     rows="4"
 *     columns="6"
 *     fps="4">
 * </simple-sprite-sheet-animation>
 *
 * Note:
 * - Ensure the sprite sheet url is correct and accessible.
 * - The width and height should match the actual size of the sprite sheet.
 * - Rows and columns should correspond to the layout of the sprites in the sheet.
 * - FPS can be adjusted as needed, default is 4 frames per second.
 */

class SimpleSpriteSheetAnimation extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({mode: 'open'});
	}

	connectedCallback() {
		const sheetUrl = this.getAttribute('sheet-url');
		const sheetWidth = parseInt(this.getAttribute('sheet-width'), 10);
		const sheetHeight = parseInt(this.getAttribute('sheet-height'), 10);
		const rows = parseInt(this.getAttribute('rows'), 10);
		const columns = parseInt(this.getAttribute('columns'), 10);
		const fps = parseInt(this.getAttribute('fps') || '4', 10);

		const frameWidth = sheetWidth / columns;
		const frameHeight = sheetHeight / rows;

		const style = document.createElement('style');
		style.textContent = `
            .sprite {
                width: ${frameWidth}px;
                height: ${frameHeight}px;
                background-image: url('${sheetUrl}');
                background-repeat: no-repeat;
                animation: play ${rows * columns / fps}s steps(${columns}) infinite;
            }

            @keyframes play {
                100% { background-position: -${sheetWidth}px; }
            }
        `;

		const container = document.createElement('div');
		container.classList.add('sprite');
		container.style.width = `${frameWidth}px`;
		container.style.height = `${frameHeight}px`;

		this.shadow.appendChild(style);
		this.shadow.appendChild(container);
	}
}

customElements.define('simple-sprite-sheet-animation', SimpleSpriteSheetAnimation);
