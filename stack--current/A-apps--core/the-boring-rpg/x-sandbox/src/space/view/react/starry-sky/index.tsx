import React, { useId, useEffect } from 'react'

// https://particles.js.org/
import {
	tsParticles,
	MoveDirection,
	OutMode
} from "@tsparticles/engine"
// https://www.npmjs.com/package/@tsparticles/basic
import { loadBasic as loadTSPlugins } from "@tsparticles/basic"


// stars preset https://github.com/tsparticles/presets/blob/main/presets/stars/src/options.ts
function getStarsPreset() {
	return {
		autoPlay: true,
		background: {
			// we provide the background outside of tsParticles
		},
		particles: {
			number: {
				value: 1000
			},
			move: {
				direction: MoveDirection.topRight,
				enable: true,
				/*outModes: {
					default: OutMode.out
				},*/
				//random: true,
				speed: 0.3,
				straight: true
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
				value: {min: 0.1, max: 1}
			}
		}
	}
}

// this should be run only once per application lifetime
// TODO memoize and make it lazy?
const LIB_INIT = loadTSPlugins(tsParticles)

export default function StarrySky() {
	const id = useId()

	useEffect(() => {
		const options = getStarsPreset()

		console.log(`XXX in UseEffect`, {
			tsParticles,
			id,
			options,
		})

		const ೱloaded = LIB_INIT.then((...args) => {
				console.log(`XXX starting load...`)
				return tsParticles.load({
					id,
					options
				})
			})

		ೱloaded.then((...args) => {
				console.log(`XXX loaded`, args)
			})

		return () => {
			console.log(`XXX cleanup scheduled...`)
			ೱloaded.then(container => {
				container.stop() // needed?
				container.destroy(true)
			})
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

		</div>
	)
}
