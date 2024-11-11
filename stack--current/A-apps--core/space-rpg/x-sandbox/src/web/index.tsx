import React, { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { getRootSXC } from '@offirmo-private/soft-execution-context'
import { schedule_when_idle_but_within_human_perception } from '@offirmo-private/async-utils'
import ErrorBoundary from '@offirmo-private/react-error-boundary'

/////////////////////////////////////////////////

const StrictCheck = StrictMode
//const StrictCheck = Fragment

/////////////////////////////////////////////////
import "particles.js"

async function init(): Promise<void> {
	console.log("hello from init")

	/* ---- particles.js config ---- */
	const COLORS = {
		BG: '#000000',
		FG: '#ffffff',
	}
	particlesJS("starry-background", {
		"particles": {
			"number": {
				"value": 380,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": COLORS.FG, // TODO array
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": COLORS.BG,
				},
				/*"polygon": {
					"nb_sides": 5
				},
				/*"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}*/
			},
			"opacity": {
				"value": 1, //0.5,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 0.5,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 3,
				"random": true,
				"anim": {
					"enable": false,
				}
			},
			"line_linked": {
				"enable": false,
			},
			"move": {
				"enable": true,
				"speed": .5,
				"direction": "bottom-right",
				"random": false,
				"straight": true,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": false,
					"mode": "grab"
				},
				"onclick": {
					"enable": false,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 140,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});
}

/////////////////////////////////////////////////

export default init
