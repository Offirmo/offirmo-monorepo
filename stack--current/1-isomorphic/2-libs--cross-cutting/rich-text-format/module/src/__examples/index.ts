import * as RichText from '../index.ts'

/////// Units ///////

import { $EXAMPLE_COMPLETE_NODE } from '../l1-types/guards.ts'

/////// parts ///////

const _SUB_OL_ITEMS: RichText.Document['$refs'] = {
	'002': {$type: 'fragmentⵧinline', $content: 'ol #2'},
	'001': {$type: 'fragmentⵧinline', $content: 'ol #1'},
	'003': {$type: 'fragmentⵧinline', $content: 'ol #3'},
}

const _SUB_UL_ITEMS: RichText.Document['$refs'] = {
	'002': {$type: 'fragmentⵧinline', $content: 'ul #2'},
	'001': {$type: 'fragmentⵧinline', $content: 'ul #1'},
	'003': {$type: 'fragmentⵧinline', $content: 'ul #3'},
}

const _SUB_UL_KEY_VALUE_PAIRS: RichText.Document['$refs'] = {
	'001': {
		$type: 'fragmentⵧinline',
		$content: '⎨⎨key⎬⎬: ⎨⎨value⎬⎬',
		$refs: {
			key: {
				$content: 'level',
			},
			value: {
				$content: '12',
			},
		},
	},
	'002': {
		$type: 'fragmentⵧinline',
		$content: '⎨⎨key⎬⎬: ⎨⎨value⎬⎬',
		$refs: {
			key: {
				$content: 'health',
			},
			value: {
				$content: '87',
			},
		},
	},
	'003': {
		$type: 'fragmentⵧinline',
		$content: '⎨⎨key⎬⎬: ⎨⎨value⎬⎬',
		$refs: {
			key: {
				$content: 'mana',
			},
			value: {
				$content: '118',
			},
		},
	},
}

/////// COMPLETE DOCS ///////

/*
const $DEMOⵧSIMPLE = (() => {
	const builder = RichText.fragmentⵧinline()
		.addClass('achievement')

	builder
		.pushEmoji('🏆')
		.pushText('  ')

	builder.pushStrong('Finish the game')
	// builder.pushWeak(legend)

	builder.addHints({ uuid: '1234' })

	return builder.done()
})()

const $DEMOⵧKV = (() => {
	const builder = RichText.fragmentⵧblock()
		.addClass('character_sheet')

	builder.pushStrong('Your character:')

	builder.pushSubNode(
		RichText.listⵧordered()
			// various width to test the alignment
			.pushKeyValue('Max health', 123)
			.pushKeyValue('Intelligence', 45)
			.pushKeyValue('Strength', 6)
			.done(),
		{ id: 'stats'}
	)

	return builder.done()
})()
*/
/*
const _DOC_WEAPON_01_NAME: RichText.Document = {
	$classes: ['item--name', 'item--weapon--name'],
	$content: '⎨⎨qualifier2|Capitalize⎬⎬ ⎨⎨qualifier1|Capitalize⎬⎬ ⎨⎨base|Capitalize⎬⎬',
	$refs: {
		qualifier2: {
			$type: 'fragmentⵧinline',
			$content: 'warfield king’s',
		},
		qualifier1: {
			$type: 'fragmentⵧinline',
			$content: 'onyx',
		},
		base: {
			$type: 'fragmentⵧinline',
			$content: 'longsword',
		},
	},
}

const DOC_WEAPON_01: RichText.Document = {
	$type: 'fragmentⵧinline',
	$classes: ['item', 'item--weapon', 'item--quality--legendary'],
	$content: '⎨⎨weapon_name⎬⎬ ⎨⎨enhancement⎬⎬',
	$refs: {
		weapon_name: _DOC_WEAPON_01_NAME,
		enhancement: {
			$type: 'fragmentⵧinline',
			$classes: ['item--enhancement'],
			$content: '+3',
		},
	},
	$hints: {
		uuid: '1234',
	},
}

const _SUB_UL_ACTIONABLE_ITEMS: RichText.Document['$refs'] = {
	'001': DOC_WEAPON_01,
	'002': render_item(DEMO_WEAPON_1),
	'003': render_item(DEMO_ARMOR_1),
	'004': render_item(DEMO_WEAPON_2),
	'005': render_item(DEMO_ARMOR_2),
}

const DOC_PLACE_01: RichText.Document = {
	$type: 'fragmentⵧinline',
	$classes: ['place'],
	$content: 'the country of ⎨⎨name⎬⎬',
	$refs: {
		name: {
			$classes: ['place--name'],
			$content: 'Foo',
		},
	},
	$hints: {
		uuid: '2345',
	},
}

const DOC_NPC_01: RichText.Document = {
	$type: 'fragmentⵧinline',
	$classes: ['person', 'npc', 'monster--rank--boss'],
	$content: 'John Smith',
	$hints: {
		uuid: '3456',
	},
}

const DOC_DEMO_LIST_ORDERED: RichText.Document = {
	$type: 'ol',
	$refs: _SUB_OL_ITEMS,
}
const DOC_DEMO_LIST_UNORDERED: RichText.Document = {
	$type: 'ul',
	$refs: _SUB_UL_ITEMS,
}

const DOC_DEMO_BASE_TYPES: RichText.Document = {
	$type: 'fragmentⵧblock',
	$content: ['⎨⎨fragment1⎬⎬⎨⎨fragment2⎬⎬'],
	$refs: {
		fragment1: {
			$type: 'fragmentⵧblock',
			$classes: [],
			$content: 'horizontal rule:⎨⎨hr⎬⎬Heading:⎨⎨heading⎬⎬Another heading:⎨⎨heading⎬⎬Some text (before br)⎨⎨br⎬⎬(after br) ⎨⎨text⎬⎬⎨⎨br⎬⎬⎨⎨strong⎬⎬⎨⎨br⎬⎬⎨⎨em⎬⎬⎨⎨br⎬⎬normal⎨⎨br⎬⎬⎨⎨weak⎬⎬⎨⎨br⎬⎬emoji:⎨⎨emoji⎬⎬⎨⎨br⎬⎬Unordered list:⎨⎨ul⎬⎬Ordered list:⎨⎨ol⎬⎬More text.',
			$refs: {
				heading: {
					$type: 'heading',
					$content: 'heading',
				},
				text: {
					$type: 'fragmentⵧinline',
					$content: 'completely normal and ordinary.',
				},
				strong: {
					$type: 'strong',
					$content: 'strong',
				},
				weak: {
					$type: 'weak',
					$content: 'weak',
				},
				em: {
					$type: 'em',
					$content: 'em(phasis)',
				},
				emoji: {
					$type: 'emoji',
					$content: '👍🏽', // thumbs up medium skin tone
					$hints: {
						// TODO when emoji type is better specified
					}
				},
				ul: DOC_DEMO_LIST_UNORDERED,
				ol: DOC_DEMO_LIST_ORDERED,
			},
		},
		fragment2: {
			$type: 'fragmentⵧblock',
			$classes: [],
			$content: 'Some text in a block fragment',
		},
	},
}

const DOC_DEMO_LIST_NESTED: RichText.Document = {
	$type: 'ul',
	$refs: {
		'ol': {
			$type: 'fragmentⵧblock',
			$content: 'immediately nested ol: ⎨⎨sublist⎬⎬',
			$refs: {
				sublist: DOC_DEMO_LIST_ORDERED,
			},
		},
		'txt': {
			$type: 'fragmentⵧinline',
			$content: 'simple text',
			$refs: {
			},
		},
		'ul': {
			$type: 'fragmentⵧblock',
			$content: 'immediately nested ul: ⎨⎨sublist⎬⎬',
			$refs: {
				sublist: DOC_DEMO_LIST_UNORDERED,
			},
		},
		'xdeep': {
			$type: 'fragmentⵧblock',
			$content: 'deep nesting: ⎨⎨sublist⎬⎬',
			$refs: {
				sublist: {
					$type: 'ul',
					$refs: {
						'ol': {
							$type: 'fragmentⵧblock',
							$content: 'immediately nested ol: ⎨⎨sublist⎬⎬',
							$refs: {
								sublist: DOC_DEMO_LIST_ORDERED,
							},
						},
						'txt': {
							$type: 'fragmentⵧinline',
							$content: 'another simple text',
							$refs: {},
						},
						'ul': {
							$type: 'fragmentⵧblock',
							$content: 'immediately nested ul: ⎨⎨sublist⎬⎬',
							$refs: {
								sublist: DOC_DEMO_LIST_UNORDERED,
							},
						},
					},
				},
			},
		},
	},
}

const DOC_DEMO_ADVANCED_TYPES: RichText.Document = {
	$type: 'fragmentⵧinline',
	$classes: [],
	$content: '⎨⎨heading⎬⎬Key-value pairs:⎨⎨kvdefault⎬⎬Nested list:⎨⎨nested_list⎬⎬Actionable items:⎨⎨uuid_list⎬⎬Done.',
	$refs: {
		heading: {
			$type: 'heading',
			$content: 'Advanced types',
		},
		kvdefault: {
			$type: 'ul',
			$refs: _SUB_UL_KEY_VALUE_PAIRS,
			$hints: {
				//key_align: left,
			},
		},
		nested_list: DOC_DEMO_LIST_NESTED,
		uuid_list: {
			$type: 'ol',
			$refs: _SUB_UL_ACTIONABLE_ITEMS,
			$hints: {
				//key_align: left,
			},
		},
	},
}

const DOC_DEMO_HINTS: RichText.Document = {
	$type: 'fragmentⵧinline',
	$classes: [],
	$content: '⎨⎨heading⎬⎬link: ⎨⎨link⎬⎬⎨⎨br⎬⎬List with no bullets:⎨⎨list⎬⎬Done.',
	$refs: {
		heading: {
			$type: 'heading',
			$content: 'Hints',
		},
		link: {
			$type: 'fragmentⵧinline',
			$content: 'offirmo’s website',
			$hints: {
				href: 'https://www.offirmo.net',
			},
		},
		list: {
			$type: 'ul',
			$refs: _SUB_UL_ITEMS,
			$hints: {
				list__style__type: '',
			},
		},
	},
}

const DOC_DEMO_RPG_01: RichText.Document = {
	$v: 1,
	$type: 'fragmentⵧblock',
	$content: 'You are in ⎨⎨place⎬⎬. You meet ⎨⎨npc⎬⎬.⎨⎨br⎬⎬He gives you a ⎨⎨item⎬⎬.',
	$refs: {
		place: DOC_PLACE_01,
		npc: DOC_NPC_01,
		item: DOC_WEAPON_01,
	},
}

const DOC_DEMO_RPG_02: RichText.Document = {
	$v: 1,
	$type: 'ol',
	$refs: {
		'001': DOC_WEAPON_01,
		'002': DOC_PLACE_01,
		'003': DOC_NPC_01,
	},
}

const DOC_DEMO_RPG_03 = RichText.fragmentⵧblock()
	.pushText(''
		+ 'Great sages prophetized your coming,⎨⎨br⎬⎬'
		+ 'commoners are waiting for their hero⎨⎨br⎬⎬'
		+ 'and kings are trembling from fear of change…⎨⎨br⎬⎬'
		+ '…undoubtly, you’ll make a name in this world and fulfill your destiny!⎨⎨br⎬⎬',
	)
	.pushStrong('A great saga just started.')
	.pushLineBreak()
	.pushSubNode(DOC_DEMO_RPG_01, { id: 'adventure' })
	.done()

const DOC_DEMO_INVENTORY: RichText.Document = {
	'$v': 1,
	'$type': 'fragmentⵧblock',
	'$classes': [],
	'$content': '⎨⎨equipped⎬⎬⎨⎨wallet⎬⎬⎨⎨backpack⎬⎬',
	'$refs': {
		'equipped': {
			'$v': 1,
			'$type': 'fragmentⵧblock',
			'$classes': [],
			'$content': '⎨⎨header⎬⎬⎨⎨list⎬⎬',
			'$refs': {
				'header': {
					'$v': 1,
					'$type': 'heading',
					'$classes': [],
					'$content': 'Active equipment:',
					'$refs': {},
					'$hints': {},
				},
				'list': {
					'$v': 1,
					'$type': 'ol',
					'$classes': [
						'inventory--equipment',
					],
					'$content': '',
					'$refs': {
						'001': {
							'$v': 1,
							'$type': 'fragmentⵧinline',
							'$classes': [],
							'$content': 'weapon: ⎨⎨s1⎬⎬',
							'$refs': {
								's1': {
									'$v': 1,
									'$type': 'fragmentⵧinline',
									'$classes': [
										'item--weapon',
										'item--quality--common',
										'item',
									],
									'$content': '⎨⎨quality⎬⎬ ⎨⎨name⎬⎬ ⎨⎨values⎬⎬',
									'$refs': {
										'quality': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [],
											'$content': 'common',
											'$refs': {},
											'$hints': {},
										},
										'name': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [
												'item__name',
											],
											'$content': '⎨⎨q2|Capitalize⎬⎬ ⎨⎨q1|Capitalize⎬⎬ ⎨⎨base|Capitalize⎬⎬',
											'$refs': {
												'base': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'spear',
													'$refs': {},
													'$hints': {},
												},
												'q1': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'heavy',
													'$refs': {},
													'$hints': {},
												},
												'q2': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'woodsman’s',
													'$refs': {},
													'$hints': {},
												},
											},
											'$hints': {},
										},
										'values': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [
												'weapon--values',
											],
											'$content': '[deals 9 to 20 damage]',
											'$refs': {},
											'$hints': {},
										},
									},
									'$hints': {
										'uuid': 'uu1JemeGpESJh8tGT3kfVqdm',
									},
								},
							},
							'$hints': {},
						},
						'002': {
							'$v': 1,
							'$type': 'fragmentⵧinline',
							'$classes': [],
							'$content': 'armor: ⎨⎨s1⎬⎬',
							'$refs': {
								's1': {
									'$v': 1,
									'$type': 'fragmentⵧinline',
									'$classes': [
										'item--armor',
										'item--quality--common',
										'item',
									],
									'$content': '⎨⎨quality⎬⎬ ⎨⎨name⎬⎬ ⎨⎨values⎬⎬',
									'$refs': {
										'quality': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [],
											'$content': 'common',
											'$refs': {},
											'$hints': {},
										},
										'name': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [
												'item__name',
											],
											'$content': '⎨⎨q1|Capitalize⎬⎬ ⎨⎨base|Capitalize⎬⎬ ⎨⎨q2|Capitalize⎬⎬',
											'$refs': {
												'base': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'socks',
													'$refs': {},
													'$hints': {},
												},
												'q1': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'used',
													'$refs': {},
													'$hints': {},
												},
												'q2': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'of the noob',
													'$refs': {},
													'$hints': {},
												},
											},
											'$hints': {},
										},
										'values': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [
												'armor--values',
											],
											'$content': '[absorbs 1 to 4 damage]',
											'$refs': {},
											'$hints': {},
										},
									},
									'$hints': {
										'uuid': 'uu18tX6IviEJpYNTWdCl7nxL',
									},
								},
							},
							'$hints': {},
						},
					},
					'$hints': {},
				},
			},
			'$hints': {},
		},
		'wallet': {
			'$v': 1,
			'$type': 'fragmentⵧblock',
			'$classes': [],
			'$content': '⎨⎨header⎬⎬⎨⎨list⎬⎬',
			'$refs': {
				'header': {
					'$v': 1,
					'$type': 'heading',
					'$classes': [],
					'$content': 'Wallet:',
					'$refs': {},
					'$hints': {},
				},
				'list': {
					'$v': 1,
					'$type': 'ul',
					'$classes': [
						'inventory--wallet',
					],
					'$content': '',
					'$refs': {
						'coin': {
							'$v': 1,
							'$type': 'fragmentⵧinline',
							'$classes': [
								'currency--coin',
							],
							'$content': '⎨⎨amount⎬⎬ coins',
							'$refs': {
								'amount': {
									'$v': 1,
									'$type': 'fragmentⵧinline',
									'$classes': [],
									'$content': '17',
									'$refs': {},
									'$hints': {},
								},
							},
							'$hints': {},
						},
						'token': {
							'$v': 1,
							'$type': 'fragmentⵧinline',
							'$classes': [
								'currency--token',
							],
							'$content': '⎨⎨amount⎬⎬ tokens',
							'$refs': {
								'amount': {
									'$v': 1,
									'$type': 'fragmentⵧinline',
									'$classes': [],
									'$content': '0',
									'$refs': {},
									'$hints': {},
								},
							},
							'$hints': {},
						},
					},
					'$hints': {},
				},
			},
			'$hints': {},
		},
		'backpack': {
			'$v': 1,
			'$type': 'fragmentⵧblock',
			'$classes': [],
			'$content': '⎨⎨header⎬⎬⎨⎨list⎬⎬',
			'$refs': {
				'header': {
					'$v': 1,
					'$type': 'heading',
					'$classes': [],
					'$content': 'Backpack:',
					'$refs': {},
					'$hints': {},
				},
				'list': {
					'$v': 1,
					'$type': 'ul',
					'$classes': [
						'inventory--backpack',
					],
					'$content': '',
					'$refs': {
						'-': {
							'$v': 1,
							'$type': 'fragmentⵧinline',
							'$classes': [],
							'$content': '(empty)',
							'$refs': {},
							'$hints': {},
						},
					},
					'$hints': {},
				},
			},
			'$hints': {},
		},
	},
	'$hints': {},
}
*/

////////////

export {
	$EXAMPLE_COMPLETE_NODE,
/*
	$DEMOⵧSIMPLE,
	$DEMOⵧKV,

	DOC_DEMO_BASE_TYPES,
	DOC_DEMO_LIST_ORDERED,
	DOC_DEMO_LIST_UNORDERED,
	DOC_DEMO_LIST_NESTED,
	DOC_DEMO_ADVANCED_TYPES,
	DOC_DEMO_HINTS,

	DOC_DEMO_RPG_01,
	DOC_DEMO_RPG_02,
	DOC_DEMO_RPG_03,
	DOC_DEMO_INVENTORY,*/
}
