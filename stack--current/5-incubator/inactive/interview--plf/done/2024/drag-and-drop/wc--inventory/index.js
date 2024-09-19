
import { BaseWebComponent} from '../wc--base/index.js'

class Component extends BaseWebComponent {

	static get observedAttributes() { return [ 'size' ] }

	getSize() {
		return Number(this.getAttribute('size'))
	}

	SHARED_CSS = `
--slot--size: 30px;

display: grid;
grid-template-columns: repeat(4, 1fr);
gap: calc(var(--slot--size) / 30);
place-items: center;
padding: calc(var(--slot--size) / 30);

width: fit-content;

background-color: black;

.slot {
	width: var(--slot--size);
	height: var(--slot--size);
	background-color: red;

	.item {
		width: var(--slot--size);
		height: var(--slot--size);
		background-color: yellow;
		line-height: var(--slot--size);
		text-align: center;
	}
}
`

	/*
		constructor() {
			super()
		}
	*/

	static DNDState = null

	/** @override */
	render() {
		const children = (new Array(this.getSize())).fill(undefined).map((_, i) => {
			const elt = document.createElement('div')
			elt.classList.add('slot')

			if (i % 3 === 2) {
				const item = document.createElement('div')
				item.classList.add('item')
				const text = `[${i}]`
				item.innerText = text
				item.draggable = true
				item.addEventListener("dragstart", (ev) => {
					//ev.dataTransfer.dropEffect = "move";
					ev.dataTransfer.setData("text/plain", text);
					console.log(`I'm being dragged!`, ev)
					Component.DNDState = {
						slot_source: elt,
						item,
					}
				});
				elt.appendChild(item)
			}

			elt.ondrop = (ev) => {
				console.log('Dropped!', ev)
				ev.preventDefault();
				Component.DNDState.slot_source.replaceChildren()
				elt.replaceChildren(Component.DNDState.item)
				Component.DNDState = null
			}
			elt.ondragover = (ev) => {
				console.log('drag over!')
				ev.preventDefault();
				ev.dataTransfer.dropEffect = "move";
			}

			return elt
		})
		this.replaceChildren(
			...children,
		)
	}
}

customElements.define('inventory-container', Component)
