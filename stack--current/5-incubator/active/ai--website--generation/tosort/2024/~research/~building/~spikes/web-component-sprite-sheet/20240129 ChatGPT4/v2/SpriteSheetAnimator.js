
/**
 * Simple Sprite Sheet Animator Web Component
 *
 * Usage Example:
 * <sprite-sheet-animator 
 *     sprite-sheet-url="url_to_sprite_sheet.png"
 *     sheet-width="1024"
 *     sheet-height="1024"
 *     rows="4"
 *     columns="4"
 *     fps="4">
 * </sprite-sheet-animator>
 */

class SpriteSheetAnimator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create canvas element
        const canvas = document.createElement('canvas');
        this.shadowRoot.appendChild(canvas);
        this.ctx = canvas.getContext('2d');

        // Set up animation state
        this.frameIndex = 0;
        this.totalFrames = 0;
        this.frameWidth = 0;
        this.frameHeight = 0;
    }

    static get observedAttributes() {
        return ['sprite-sheet-url', 'sheet-width', 'sheet-height', 'rows', 'columns', 'fps'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'sprite-sheet-url':
                this.loadSpriteSheet(newValue);
                break;
            case 'sheet-width':
            case 'sheet-height':
            case 'rows':
            case 'columns':
                this.updateDimensions();
                break;
            case 'fps':
                this.updateAnimationSpeed();
                break;
        }
    }

    connectedCallback() {
        this.updateDimensions();
        this.updateAnimationSpeed();
        this.startAnimation();
    }

    loadSpriteSheet(url) {
        this.spriteSheet = new Image();
        this.spriteSheet.onload = () => this.updateDimensions();
        this.spriteSheet.src = url;
    }

    updateDimensions() {
        const sheetWidth = parseInt(this.getAttribute('sheet-width')) || 0;
        const sheetHeight = parseInt(this.getAttribute('sheet-height')) || 0;
        const rows = parseInt(this.getAttribute('rows')) || 1;
        const columns = parseInt(this.getAttribute('columns')) || 1;

        this.totalFrames = rows * columns;
        this.frameWidth = sheetWidth / columns;
        this.frameHeight = sheetHeight / rows;

        const canvas = this.shadowRoot.querySelector('canvas');
        if (canvas) {
            canvas.width = this.frameWidth;
            canvas.height = this.frameHeight;
        }
    }

    updateAnimationSpeed() {
        const fps = parseInt(this.getAttribute('fps')) || 4;
        this.frameDuration = 1000 / fps;
    }

    startAnimation() {
        const animate = () => {
            setTimeout(() => {
                this.drawFrame();
                requestAnimationFrame(animate);
            }, this.frameDuration);
        };
        animate();
    }

    drawFrame() {
        this.ctx.clearRect(0, 0, this.frameWidth, this.frameHeight);
        const column = this.frameIndex % parseInt(this.getAttribute('columns'));
        const row = Math.floor(this.frameIndex / parseInt(this.getAttribute('columns')));
        this.ctx.drawImage(
            this.spriteSheet,
            column * this.frameWidth,
            row * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            0,
            0,
            this.frameWidth,
            this.frameHeight
        );

        this.frameIndex = (this.frameIndex + 1) % this.totalFrames;
    }
}

// Define the custom element
customElements.define('sprite-sheet-animator', SpriteSheetAnimator);
