
export class BaseWebComponent extends HTMLElement {
	static _DEBUG = true
	_DEBUG = BaseWebComponent._DEBUG

	static _id_generator = 0
	_id = BaseWebComponent._id_generator++
	getDebugId() {
		return `⟨${this.getComponentBaseClass()}⟩#${this._id}`
	}
	getComponentBaseClass() {
		let html = this.localName
		let is = this.getAttribute('is')
		if (is) html += `--${is}`

		return html
	}
	getComponentClass() {
		let html = this.localName
		let is = this.getAttribute('is')
		if (is) html += `--${is}`

		return `wc--${this.getComponentBaseClass()}`
	}
	getUniqueComponentClass() {
		let html = this.localName
		let is = this.getAttribute('is')
		if (is) html += `--${is}`

		return `${this.getComponentClass()}--#${this._id}`
	}

	err = null

	constructor() {
		super()
		if (this._DEBUG) console.log(`[${this.getDebugId()}].constructor()]:`, {
			'this': this
		})
		// The constructor for a custom element is not supposed to read or write its DOM
		// also NOT supposed to read attributes, since createElement(...) may be in progress
		// In general, work should be deferred to connectedCallback as much as possible
		// https://stackoverflow.com/a/43837330
	}

	static _sharedStyleElt = null
	_unigueStyleElt = null
	_baseRender() {
		//if (this._DEBUG) console.log(`[${this.getDebugId()}]._baseRender()]:`, { 'this': this })

		if (this.SHARED_CSS && !BaseWebComponent._sharedStyleElt) {
			const elt = BaseWebComponent._sharedStyleElt = document.createElement('style')
			elt.textContent = `.${this.getComponentClass()} { ${this.SHARED_CSS} }`
			document.head.appendChild(elt)
			this._DEBUG && console.log(`[${this.getDebugId()}] appended shared style`, elt)
		}
		this.classList.add(this.getComponentClass())
	}
	render() {
		throw new Error('Not Implemented!')
	}

	_hasRenderPending = false
	_scheduleRender() {
		if (this._hasRenderPending) return
		if (!this._isConnected) return

		setTimeout(() => {
			this._hasRenderPending = false
			if (!this._isConnected) return

			if (this.err) {
				this.replaceChildren(new Text(`[ERROR! ${this.err.message}]`))
				return
			}

			if (this._DEBUG) console.log(`[${this.getDebugId()}] about to render!]:`, {
				'this': this
			})

			this._baseRender()
			this.render()
		})
		this._hasRenderPending = true
	}

	// called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
	// WARNING https://dev.to/dannyengelman/web-component-developers-do-not-connect-with-the-connectedcallback-yet-4jo7
	_isConnected = false
	connectedCallback() {
		if (this._DEBUG) console.log(`[${this.getDebugId()}].connectedCallback()]:`, {
			'this': this
		})
		this._isConnected = true
		this._scheduleRender()
	}
	// called each time the element is removed from the document.
	disconnectedCallback() {
		if (this._DEBUG) console.log(`[${this.getDebugId()}].disconnectedCallback()]:`, {
			'this': this
		})
		this._isConnected = false
	}
	// called each time the element is moved to a new document.
	adoptedCallback() {
		if (this._DEBUG) console.log(`[${this.getDebugId()}].adoptedCallback()]:`, {
			'this': this
		})
	}
	attributeChangedCallback(name, old_value, new_value) {
		if (this._DEBUG) console.log(`[${this.getDebugId()}].attributeChangedCallback():`, {
			'this': this,
			name, old_value, new_value,
		})
		this._scheduleRender()
	}
}
