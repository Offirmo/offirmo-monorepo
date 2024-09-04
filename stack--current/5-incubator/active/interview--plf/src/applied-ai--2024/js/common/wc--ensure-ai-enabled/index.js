
async function ೱisꓽai_webapi_available(progressCallback = () => {}) {
	const err = new Error(`AI WebAPI not available!`)
	err.url = 'https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit#heading=h.witohboigk0o'
	progressCallback(0)

	return new Promise((resolve, reject) => {
		if (!globalThis.ai) {
			reject(err)
			return
		}
		progressCallback(0.1)

		if (!'assistant' in ai) {
			reject(err)
			return
		}

		let ೱsession = ai.assistant.create({
				monitor(m) {
					m.addEventListener("downloadprogress", e => {
						console.log(`ai.assistant: Downloaded ${e.loaded} of ${e.total} bytes.`);
						progressCallback(Math.max(0.1, e.loaded / e.total))
					});
				}
			}
		)

		return ೱsession.then((session) => {
			progressCallback(1)
			session.destroy()
		})
	})
}

customElements.define('ensure-ai-enabled', class Component extends HTMLElement {
	static _DEBUG = true
	_DEBUG = Component._DEBUG

	static _id_generator = 0
	_id = Component._id_generator++

	loaded = 0.05
	err = null

	static get observedAttributes() { return [ 'apis' ] }

	get_debug_id() {
		const segments = [
			`⟨${this.localName}${this.getAttribute('is') ? `--${this.getAttribute('is')}` : ''}⟩`,
			`#${this._id}`,
		]
		return segments.join('')
	}

	constructor() {
		super()
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].constructor()]:`, { _this: this })
		// The constructor for a custom element is not supposed to read or write its DOM
		// also NOT supposed to read attributes, since createElement(...) may be in progress
		// In general, work should be deferred to connectedCallback as much as possible
		// https://stackoverflow.com/a/43837330

		ೱisꓽai_webapi_available((completion_rate) => {
				this.loaded = completion_rate
				this._render()
			})
			.then(() => {
				this.loaded = 1
			})
			.catch((err) => {
				this.err = err
			})
			.finally(() => {
				this._render()
			})
	}

	_pendingRender = false
	_render() {
		if (this._pendingRender) return

		if (this._DEBUG) console.log(`[${this.get_debug_id()}]._render()]:`, {
			progress: this.loaded,
			err: this.err,
		})

		this.progress‿elt ??= document.createElement('progress')

		setTimeout(() => {
			this._pendingRender = false

			if (this.err) {
				this.replaceChildren(
					new Text(`[ERROR] ${this.err.message}`),
					new Text(`(TODO instructions)`),
				)
				return
			}

			// can only test here!!!
			if (!this._original_children) {
				if (this.children.length === 0) {
					// DOM not loaded yet, need to wait!
					return
				}
				this._original_children = Array.from(this.children)
			}

			if (this.loaded >= 1) {
				this.replaceChildren(...this._original_children)
				return
			}

			this.progress‿elt.value = this.loaded
			this.replaceChildren(
				new Text( `Loading AI-enhanced experience: `),
				this.progress‿elt
			)
		})
		this._pendingRender = true
	}

	// called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
	// WARNING https://dev.to/dannyengelman/web-component-developers-do-not-connect-with-the-connectedcallback-yet-4jo7
	connectedCallback() {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].connectedCallback()]:`, { _this: this })

		this._render()
	}
	// called each time the element is removed from the document.
	disconnectedCallback() {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].disconnectedCallback()]:`, { _this: this })
	}
	// called each time the element is moved to a new document.
	adoptedCallback() {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].adoptedCallback()]:`, { _this: this })
	}
	attributeChangedCallback(name, old_value, new_value) {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].attributeChangedCallback():`, { name, old_value, new_value, _this: this })
		this._render()
	}
});
