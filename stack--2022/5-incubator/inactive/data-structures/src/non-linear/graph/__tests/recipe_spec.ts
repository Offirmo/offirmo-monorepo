import { expect } from 'chai'

import { LIB } from '../consts.js'

import {
  ...
} from './index.js'

/////////////////////////////////////////////////


interface Rsrc {
	type: 'material' | 'tool' | 'intermediateᝍstep'
	descr: string
	process?: string
	quantity?: {
		value: number
		unit: string
	}
}


function expectㆍrecipe_to_work(create, insertꓽnode, insertꓽlink): void {

	const graph = (() => {
		const graph = create()

		const oven = insertꓽnode(graph, {
			type: 'tool',
			descr: 'oven',
		})
		const pan = insertꓽnode(graph, {
			type: 'tool',
			descr: 'pan',
		})

		const sesame_sugar = (() => {
			const black_sesame_powder = insertꓽnode(graph, {
				type: 'material',
				descr: 'black sesame powder',
				quantity: {
					value: 80,
					unit: 'g'
				}
			})
			const sugar = insertꓽnode(graph, {
				type: 'material',
				descr: 'sugar',
				quantity: {
					value: 150,
					unit: 'g'
				}
			})
			const mixture = insertꓽnode(graph, {
				type: 'intermediateᝍstep',
				descr: 'sesame sugar',
				process: 'pulse-mix until sugar is a uniform gray and no lumps of sesame remain',
			})
			insertꓽlink(graph, black_sesame_powder, mixture)
			insertꓽlink(graph, sugar, mixture)
			return mixture
		})()

		const greased_and_crusted_pan = (() => {

			const butter = insertꓽnode(graph, {
				type: 'material',
				descr: 'butter',
				quantity: {
					value: 20,
					unit: 'g'
				}
			})
			const greased_pan = insertꓽnode(graph, {
				type: 'intermediateᝍstep',
				descr: 'greased pan',
				process: 'grease with butter',
			})
			insertꓽlink(graph, pan, greased_pan)
			insertꓽlink(graph, butter, greased_pan)

			const crusted_pan = insertꓽnode(graph, {
				type: 'intermediateᝍstep',
				descr: 'pan crusted with sesame sugar',
				process: 'put sesame sugar inside the buttered pan and shake to coat',
			})
			insertꓽlink(graph, sesame_sugar, crusted_pan)
			insertꓽlink(graph, greased_pan, crusted_pan)
			return crusted_pan
		})()

		const batter = (() => {

			const dry_batter = (() => {
				const glutinous_rice_flour = insertꓽnode(graph, {
					type: 'material',
					name: 'glutinous rice flour',
					quantity: {
						value: 250,
						unit: 'g'
					}
				})
				const baking_powder = insertꓽnode(graph, {
					type: 'material',
					name: 'baking powder',
					quantity: {
						value: 1,
						unit: 'tsp'
					}
				})
				const salt = insertꓽnode(graph, {
					type: 'material',
					name: 'salt',
					quantity: {
						value: 0.5,
						unit: 'tsp'
					}
				})
				const mixture = insertꓽnode(graph, {
					type: 'intermediateᝍstep',
					descr: 'dry batter',
					process: 'whisk to combine',
				})
				insertꓽlink(graph, sesame_sugar, mixture)
				insertꓽlink(graph, glutinous_rice_flour, mixture)
				insertꓽlink(graph, baking_powder, mixture)
				insertꓽlink(graph, salt, mixture)
				return mixture
			})()

			const egg_mixture = (() => {
				const emulsion = (() => {
					const butter = insertꓽnode(graph, {
						type: 'material',
						name: 'butter',
						quantity: {
							value: 115,
							unit: 'g'
						}
					})
					// TODO melted butter
					const eggs = insertꓽnode(graph, {
						type: 'material',
						name: 'large egg',
						quantity: {
							value: 2,
						}
					})
					const mixture = insertꓽnode(graph, {
						type: 'intermediateᝍstep',
						descr: 'emulsion',
						process: 'Whisk together in a medium bowl until creamy and emulsified, about 30 seconds',
					})
					insertꓽlink(graph, butter, mixture)
					insertꓽlink(graph, eggs, mixture)
					return mixture
				})()

				const milk = insertꓽnode(graph, {
					type: 'material',
					name: 'whole milk',
					quantity: {
						value: 1,
						unit: 'cup' // ~245g
					}
				})
				const vanilla = insertꓽnode(graph, {
					type: 'material',
					name: 'concentrated vanilla extract',
					quantity: {
						value: 0.5,
						unit: 'tsp'
					}
				})
				const cream = insertꓽnode(graph, {
					type: 'material',
					name: 'heavy cream',
					quantity: {
						value: 130,
						unit: 'g'
					}
				})
				const mixture = insertꓽnode(graph, {
					type: 'intermediateᝍstep',
					descr: 'egg mixture',
					process: 'stir to combine',
				})
				insertꓽlink(graph, emulsion, mixture)
				insertꓽlink(graph, milk, mixture)
				insertꓽlink(graph, vanilla, mixture)
				insertꓽlink(graph, cream, mixture)
				return mixture
			})()

			const mixture = insertꓽnode(graph, {
				type: 'intermediateᝍstep',
				descr: 'batter',
				process: 'stir to combine',
			})
			insertꓽlink(graph, dry_batter, mixture)
			insertꓽlink(graph, egg_mixture, mixture)
			return mixture
		})()

		const cooked_batter = insertꓽnode(graph, {
			type: 'intermediateᝍstep',
			descr: 'cooled cake',
			process: 'Bake cake until a tester inserted into the center comes out clean and cake is risen and springy with a firm golden brown crust, 45–55 minutes (the smaller your pan, the longer it will take).',
		})
		insertꓽlink(graph, oven, cooked_batter)
		insertꓽlink(graph, greased_and_crusted_pan, cooked_batter)
		insertꓽlink(graph, batter, cooked_batter)

		const cooled_cooked_batter = insertꓽnode(graph, {
			type: 'intermediateᝍstep',
			descr: 'cooled cake',
			process: 'Let cool in pan on a wire rack',
		})
		insertꓽlink(graph, cooked_batter, cooled_cooked_batter)

		const sauce = (() => {

			const cream_mixture = (() => {
				const black_sesame_powder_40g = insertꓽnode(graph, {
					type: 'material',
					name: 'black sesame powder',
					quantity: {
						value: 40,
						unit: 'g'
					}
				})
				const heavy_cream_5tbsp = insertꓽnode(graph, {
					type: 'material',
					name: 'heavy cream',
					quantity: {
						value: 5,
						unit: 'tbsp'
					}
				})
				const salt = insertꓽnode(graph, {
					type: 'material',
					name: 'salt',
					quantity: {
						value: 0.5,
						unit: 'tsp'
					}
				})
				const mixture = insertꓽnode(graph, {
					type: 'intermediateᝍstep',
					descr: 'cream mixture',
					process: 'Vigorously whisk until smooth',
				})
				insertꓽlink(graph, black_sesame_powder_40g, mixture)
				insertꓽlink(graph, heavy_cream_5tbsp, mixture)
				insertꓽlink(graph, salt, mixture)

				return mixture
			})()

			const caramel = (() => {
				const cream_of_tartar = insertꓽnode(graph, {
					type: 'material',
					name: 'cream of tartar',
					quantity: {
						value: 1,
						unit: 'pinch' // 1/8tsp
					}
				})
				const sugar_115g = insertꓽnode(graph, {
					type: 'material',
					name: 'sugar',
					quantity: {
						value: 115,
						unit: 'g'
					}
				})
				const water = insertꓽnode(graph, {
					type: 'material',
					name: 'water',
					quantity: {
						value: 3,
						unit: 'tbsp'
					}
				})
				const mixture = insertꓽnode(graph, {
					type: 'intermediateᝍstep',
					descr: 'caramel',
					process: 'Mix and bring to a boil in large skillet over medium-high heat, stirring to dissolve sugar. Cook, stirring frequently, until mixture is the color of light honey, 3–4 minutes. Immediately remove caramel from heat.',
				})
				insertꓽlink(graph, cream_of_tartar, mixture)
				insertꓽlink(graph, sugar_115g, mixture)
				insertꓽlink(graph, water, mixture)
				return mixture
			})()

			const sauce = insertꓽnode(graph, {
				type: 'intermediateᝍstep',
				process: 'Immediately vigorously whisk the caramel in the cream mixture until combined',
			})
			insertꓽlink(graph, cream_mixture, sauce)
			insertꓽlink(graph, caramel, sauce)
			return sauce
		})()

		const cake = insertꓽnode(graph, {
			type: 'intermediateᝍstep', // TODO review
			descr: 'black sesame mochi cake',
			process: 'Pour sauce over cake',
		})
		insertꓽlink(graph, cooled_cooked_batter, cake)
		insertꓽlink(graph, sauce, cake)












	// get list of ingredients
	// get list of tools
}

describe(`${LIB} -- example: recipe`, function() {

	it('should work', () => {

	})
})
