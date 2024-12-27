import React, { use, useId, useEffect } from 'react'

// https://particles.js.org/
import {
	tsParticles, // https://particles.js.org/docs/classes/tsParticles_Engine.Core_Engine.Engine.html
	MoveDirection,
	type Container,
} from "@tsparticles/engine"
// https://www.npmjs.com/package/@tsparticles/basic
import { loadBasic as loadPlugins } from "@tsparticles/basic"


// inspired from the stars preset https://github.com/tsparticles/presets/blob/main/presets/stars/src/options.ts
function getOptions() {
	return {
		// https://particles.js.org/docs/interfaces/tsParticles_Engine.Options_Interfaces_IOptions.IOptions.html

		// no-brainer options
		detectRetina: true,
		pauseOnBlur: true,
		pauseOnOutsideViewport: true,
		//fpsLimit: TODO according to perf

		autoPlay: true,
		background: {
			// we provide the background outside tsParticles
		},
		// TODO try to make responsive

		particles: {
			// https://particles.js.org/docs/interfaces/tsParticles_Engine.Options_Interfaces_Particles_IParticlesOptions.IParticlesOptions.html

			number: {
				value: 1000,
				density: {
					// obviously we want the value to be relative to screen size
					enable: true,
					width: 1024,
					height: 1024,
				},
			},
			move: {
				enable: true,
				speed: 0.20,

				straight: true,
				direction: MoveDirection.topRight,

				//random: true,
				/*spin: {
					enable: true,
					direction: 'foo',
				}*/
			},
			opacity: {
				animation: {
					enable: true,
					speed: 0.1,
					sync: false
				},
				value: {min: 0, max: 1}
			},
			size: {
				value: {min: .5, max: 2}
			}
		}
	}
}

// this should be run only once per application lifetime
const LIB_INIT = loadPlugins(tsParticles)
LIB_INIT.then((...args) => {
	console.log(`XXX @tsparticles/basic loaded`, args)
})

const LIB = "StarrySky"

export default function StarrySky() {
	use(LIB_INIT)
	const id = useId()

	useEffect(() => {
		const options = getOptions()

		const tempState = {
			active: true,
			ೱcontainer: undefined as (Promise<Container | undefined> | undefined),
		}

		console.log(`XXX [${LIB}] in UseEffect`, {
			tsParticles,
			id,
			options,
			tempState,
		})

		LIB_INIT.then((...args) => {
			if (!tempState.active) return // the component was unmounted in the meantime, no need to proceed further

			tempState.ೱcontainer = tsParticles.load({
				id,
				options
			})
			tempState.ೱcontainer.then(() => {
				console.log(`XXX [${LIB}] tsParticles Container loaded`)
			})
		})

		return () => {
			console.log(`XXX [${LIB}] cleanup scheduled...`)
			tempState.active = false

			if (tempState.ೱcontainer) {
				console.log(`XXX [${LIB}] found a container, cleaning...`)
				tempState.ೱcontainer.then(container => {
					if (!container) return

					container.stop() // needed?
					container.destroy(true)
					console.log(`XXX [${LIB}] cleaned`)
				})
			}
		}
	}, [id]);

	const background__gradient__direction = 75
	const background__gradient__begin = 'darkblue'
	const background__gradient__end = 'black'
	const background__color = 'black' // TODO = mid from above

	return (
		<div id={id} className="o⋄fill-parent" style={{
			backgroundColor: background__color,
			background: `linear-gradient(${background__gradient__direction}deg, ${background__gradient__begin} 0%, ${background__gradient__end} 100%)`,
		}}>
			tsParticles canva will be here
		</div>
	)
}
