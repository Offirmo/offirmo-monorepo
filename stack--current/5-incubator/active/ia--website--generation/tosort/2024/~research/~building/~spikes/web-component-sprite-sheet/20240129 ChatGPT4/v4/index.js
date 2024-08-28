
/**
 * Usage Example:
 * <sprite-sheet-animation
 *   sheet-url="path/to/sprite-sheet.png"
 *   sheet-width="1024"
 *   sheet-height="1024"
 *   rows="4"
 *   columns="4"
 *   fps="4">
 * </sprite-sheet-animation>
 *
 * Important Notes:
 * - Ensure the sprite sheet image is hosted on the same domain or accessible via CORS.
 * - The dimensions of each sprite will be calculated based on the provided sheet width/height and rows/columns.
 */

class SpriteSheetAnimation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
            }
        `;

        this.shadowRoot.append(style);
    }

    static get observedAttributes() {
        return ['sheet-url', 'sheet-width', 'sheet-height', 'rows', 'columns', 'fps'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = newValue;
        }
    }

    connectedCallback() {
        this.updateAnimation();
    }

    updateAnimation() {
        const width = this.sheetWidth / this.columns;
        const height = this.sheetHeight / this.rows;
        const totalFrames = this.rows * this.columns;
        const frameDuration = 1000 / (this.fps || 4);

        let currentFrame = 0;

        this.style.backgroundImage = `url('${this.sheetUrl}')`;
        this.style.backgroundSize = `${this.sheetWidth}px ${this.sheetHeight}px`;

        const updateFrame = () => {
            const x = (currentFrame % this.columns) * width;
            const y = Math.floor(currentFrame / this.columns) * height;
            this.style.backgroundPosition = `-${x}px -${y}px`;

            currentFrame = (currentFrame + 1) % totalFrames;
            this.frameUpdateTimeout = setTimeout(updateFrame, frameDuration);
        };

        clearTimeout(this.frameUpdateTimeout);
        updateFrame();
    }

    disconnectedCallback() {
        clearTimeout(this.frameUpdateTimeout);
    }
}

customElements.define('sprite-sheet-animation', SpriteSheetAnimation);
