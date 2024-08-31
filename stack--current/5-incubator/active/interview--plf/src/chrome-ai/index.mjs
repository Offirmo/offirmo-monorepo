

async function demo__assistant() {
	const session = await ai.assistant.create({
			monitor(m) {
				m.addEventListener("downloadprogress", e => {
					console.log(`ai.assistant: Downloaded ${e.loaded} of ${e.total} bytes.`);
				});
			}
		}
	)
	const result = await session.prompt("Write me a poem");
	console.log(result);
	return result
}


export default async function main() {
	let innerHTML = ''

	try {
		console.group('AI detection')
		if (!globalThis.ai) {
			const err = new Error(`AI feature not available! Please follow https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit#heading=h.witohboigk0o`)
		}
		innerHTML += `<ol><li><code><small>[globalThis.]</small>ai</code> API detected ✅</li>`
		console.log({ai})

		innerHTML += `<li>Detected AI sub-APIs:<ul>`
		for (let sub_api in ai) {
			console.group(`ai.${sub_api}`)

			innerHTML += `<li>`
			innerHTML += `<code>.${sub_api}</code> ✅<ul>`


			if ('capabilities' in ai[sub_api]) {
				const capabilities = await ai[sub_api].capabilities()
				console.log(`ai.${sub_api}.capabilities()`, capabilities)
				innerHTML += `<li>capabilities = <ul>`
				for (let capa in capabilities) {
					const val = capabilities[capa]
					innerHTML += `<li><code>${capa}</code> = <code>${val}</code> ${(capa === 'available' && val !== 'readily') ? '❌' : '✅'}</li>`
				}
				innerHTML += `</ul></li>`
			}

			innerHTML += `<li>demo:`
			switch (sub_api) {
				case 'assistant':
					innerHTML += `<div id="demo__${sub_api}"><marquee>…</marquee></div>`
					demo__assistant()
						.then(result => {
							const elt = document.getElementById(`demo__${sub_api}`)
							elt.innerHTML = result
						})
						.catch(err => {
							console.error(err)
							const elt = document.getElementById(`demo__${sub_api}`)
							elt.innerHTML = `<strong>Error: ${err?.message}</strong>`
						})
					break
				default:
					innerHTML += ` (no demo for this API)`
					break
			}
			innerHTML += `</li>`

			innerHTML += `</ul></li>`
			console.groupEnd()
		}
		innerHTML += `</ul></li>`
	}
	catch (err) {
		console.error(err, {err})
		innerHTML = `<strong>Error: ${err?.message}</strong>`
	}
	finally {
		const div = document.createElement('div')
		div.innerHTML = innerHTML
		document.body.appendChild(div)
	}
}
