
customElements.define('hello-world', class Component extends HTMLElement {
	static _DEBUG = true
	_DEBUG = Component._DEBUG

	static _id_generator = 0
	_id = Component._id_generator++
	get_debug_id() {
		let html = this.localName
		let is = this.getAttribute('is')
		if (is) html += `--${is}`

		return `⟨${html}⟩#${this._id}`
	}

	err = null

	static get observedAttributes() { return [ 'target' ] }

	constructor() {
		super()
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].constructor()]:`, {
			'this': this
		})
		// The constructor for a custom element is not supposed to read or write its DOM
		// also NOT supposed to read attributes, since createElement(...) may be in progress
		// In general, work should be deferred to connectedCallback as much as possible
		// https://stackoverflow.com/a/43837330
	}

	_hasRenderPending = false
	_scheduleRender() {
		if (this._hasRenderPending) return
		if (!this._isConnected) return

		setTimeout(() => {
			this._hasRenderPending = false
			if (!this._isConnected) return

			if (this._DEBUG) console.log(`[${this.get_debug_id()}] render!]:`, {
				'this': this
			})

			if (this.err) {
				this.replaceChildren(new Text(`[ERROR! ${this.err.message}]`))
				return
			}

			this.replaceChildren(
				new Text(`Hello, ${this.getAttribute('target')?.normalize('NFC')?.trim()}!`),
			)
		})
		this._hasRenderPending = true
	}

	// called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
	// WARNING https://dev.to/dannyengelman/web-component-developers-do-not-connect-with-the-connectedcallback-yet-4jo7
	_isConnected = false
	connectedCallback() {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].connectedCallback()]:`, {
			'this': this
		})
		this._isConnected = true
		this._scheduleRender()
	}
	// called each time the element is removed from the document.
	disconnectedCallback() {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].disconnectedCallback()]:`, {
			'this': this
		})
		this._isConnected = false
	}
	// called each time the element is moved to a new document.
	adoptedCallback() {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].adoptedCallback()]:`, {
			'this': this
		})
	}
	attributeChangedCallback(name, old_value, new_value) {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].attributeChangedCallback():`, {
			'this': this,
			name, old_value, new_value,
		})
		this._scheduleRender()
	}
})
