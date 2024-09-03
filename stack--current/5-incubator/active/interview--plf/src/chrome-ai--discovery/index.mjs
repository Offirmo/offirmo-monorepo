
export const title = 'Chrome AI discovery'

export const html = `TODO`


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


async function demo__8ball() {
	const session = await ai.assistant.create({
			systemPrompt: "You're a magic 8 ball. You reply to questions by an affirmative, a negative or a non-committal.",
		}
	)

	const stream = session.promptStreaming("Should I do it?");
	/*
	for await (const chunk of stream) {
		console.log(chunk);
	}*/
	let result = '';
	let previousLength = 0;
	for await (const chunk of stream) {
		const newContent = chunk.slice(previousLength);
		console.log(newContent);
		previousLength = chunk.length;
		result += newContent;
	}
	//console.log(result);

}


export async function main() {
	let innerHTML = ''

	try {
		console.group('AI detection')
		if (!globalThis.ai) {
			const err = new Error(`AI feature not available! Please follow https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit#heading=h.witohboigk0o`)
			throw err
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
					innerHTML += ` <a target="_blank" href="https://chrome.dev/web-ai-demos/prompt-api-playground/">chrome.dev↗</a>`
					break
				/*case 'assistant':
					innerHTML += `<div id="demo__${sub_api}"><marquee>…</marquee></div>`
					/*demo__assistant()
						.then(result => {
							const elt = document.getElementById(`demo__${sub_api}`)
							elt.innerHTML = result
						})
						.catch(err => {
							console.error(err)
							const elt = document.getElementById(`demo__${sub_api}`)
							elt.innerHTML = `<strong>Error: ${err?.message}</strong>`
						})
					*/
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
		demo__8ball()
	}
	catch (err) {
		console.error(err, {err})
		innerHTML = `<strong>Error: ${err?.message}</strong>`
	}
	finally {
		const div = document.createElement('div')
		div.innerHTML = innerHTML
		document.body.appendChild(div)
		console.groupEnd()
	}
}
