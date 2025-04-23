
import { filter_in_last_quoted_sentence_if_any } from '../../utils/ai/index.js'

export const registry = {}

customElements.define('ai-prompt-result', class Component extends HTMLElement {
	static _DEBUG = true
	_DEBUG = Component._DEBUG


	static capabilities = {}
	static _ೱcapabilities = undefined

	static _id_generator = 0
	_id = Component._id_generator++

	err = null
	session = undefined
	//signal = new AbortSignal() // TODO improve

	static get observedAttributes() { return [ 'temperature', 'topK' ] }

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
		Component._ೱcapabilities ||=
		ai.assistant.capabilities().then(capabilities => {
			Component.capabilities = capabilities
			console.log('capabilities:', capabilities)
		})
	}

	get temperature() {
		const default_value = Component.capabilities.defaultTemperature || 0.8

		const raw = (this.getAttribute('temperature') || '').trim()
		let candidate = Number(raw)
		if (isNaN(candidate)) return default_value

		if (raw === 'default') return default_value

		return candidate
	}

	get topK() {
		const default_value = Component.capabilities.defaultTopK || 3
		const max_value = Component.capabilities.maxTopK || 128

		const raw = (this.getAttribute('topK') || '').trim()
		let candidate = Number(raw)
		if (isNaN(candidate)) return default_value

		if (raw === 'default') return default_value

		if (candidate < 1) return 1
		if (candidate > max_value) return max_value
		return candidate
	}

	async prompt({systemPrompt, prompt, signal}) {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].prompt()]:`, {
			'this': this
		})

		this.response = '(thinking...)'
		this._render()

		const session = this.session = await (() => {
			if (this.session) {
				this.session.destroy()
			}

			return ai.assistant.create({
				signal,
				systemPrompt,
				topK: this.topK,
				temperature: this.temperature,
			})
		})()

		session.prompt(prompt, { signal })
			.then(response => {
				this.response = response
				this._render()
			})
			.catch(err => {
				this.err = err
				this._render()
			})
	}

	_pendingRender = false
	_render() {
		if (this._pendingRender) return

		if (this._DEBUG) console.log(`[${this.get_debug_id()}]._render()]:`, {
			'this': this
		})

		setTimeout(() => {
			this._pendingRender = false

			if (this.err) {
				this.replaceChildren(
					new Text(`[ERROR] ${this.err.message}`),
				)
				this.style.backgroundColor = 'red'
				return
			}

			const temperature = this.temperature
			const bgcolor = (() => {
				// https://en.wikipedia.org/wiki/Color_temperature

				if (temperature >= 0.9)
					return '#FF7900'

				if (temperature >= 0.8)
					return '#FFBFA1'

				if (temperature >= 0.5)
					return '#FFE4CC'

				return '#A1BFFF'
			})()
			this.style.backgroundColor = bgcolor
			this.style.padding = '.5em'

			this.innerHTML = `
				<strong>Answer:</strong>
				<ul>
					<li><small>temperature: ${temperature}</small></li>
					<li><small>topK: ${this.topK}</small></li>
					<li><small>tokens: x/max (y left)</small></li>
					<li>result:<br><pre style="position: relative; left: -1em;"><code style="display: block; text-wrap: auto; width: 40ch; max-height: 15em; overflow-y: auto;">${this.response || '(waiting for prompt...)'}</code></pre></li>
				</ul>
				`
		})
		this._pendingRender = true
	}

	// called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
	// WARNING https://dev.to/dannyengelman/web-component-developers-do-not-connect-with-the-connectedcallback-yet-4jo7
	connectedCallback() {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].connectedCallback()]:`, { _this: this })

		registry[this._id] = this
		this._render()
	}
	// called each time the element is removed from the document.
	disconnectedCallback() {
		if (this._DEBUG) console.log(`[${this.get_debug_id()}].disconnectedCallback()]:`, { _this: this })

		delete registry[this._id]
		if (this.session) {
			this.session.destroy()
			this.session = undefined
		}
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
