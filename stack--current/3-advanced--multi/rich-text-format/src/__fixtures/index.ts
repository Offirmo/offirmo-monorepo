import * as RichText from '../index.ts'

/////// parts ///////

const SUB_UL_ITEMS: RichText.Document['$sub'] = {
	'002': {$type: 'fragmentⵧinline', $content: 'ul #2'},
	'001': {$type: 'fragmentⵧinline', $content: 'ul #1'},
	'003': {$type: 'fragmentⵧinline', $content: 'ul #3'},
}

const SUB_UL_KEY_VALUE_PAIRS: RichText.Document['$sub'] = {
	'001': {
		$type: 'fragmentⵧinline',
		$content: '⎨⎨key⎬⎬: ⎨⎨value⎬⎬',
		$sub: {
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
		$sub: {
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
		$sub: {
			key: {
				$content: 'mana',
			},
			value: {
				$content: '118',
			},
		},
	},
}

const DOC_WEAPON_01_NAME: RichText.Document = {
	$classes: ['item--name', 'item--weapon--name'],
	$content: '⎨⎨qualifier2|Capitalize⎬⎬ ⎨⎨qualifier1|Capitalize⎬⎬ ⎨⎨base|Capitalize⎬⎬',
	$sub: {
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
	$sub: {
		weapon_name: DOC_WEAPON_01_NAME,
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

const DOC_PLACE_01: RichText.Document = {
	$type: 'fragmentⵧinline',
	$classes: ['place'],
	$content: 'the country of ⎨⎨name⎬⎬',
	$sub: {
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

/*
function render_item(i) {
	return render_item_short(i)
}*/
const SUB_UL_ACTIONABLE_ITEMS: RichText.Document['$sub'] = {
	'001': DOC_WEAPON_01,
	/*'002': render_item(DEMO_WEAPON_1),
	'003': render_item(DEMO_ARMOR_1),
	'004': render_item(DEMO_WEAPON_2),
	'005': render_item(DEMO_ARMOR_2),*/
}

/////// COMPLETE DOCS ///////

const DOC_DEMO_BASE_TYPES: RichText.Document = {
	$type: 'fragmentⵧblock',
	$content: '⎨⎨fragment1⎬⎬⎨⎨fragment2⎬⎬',
	$sub: {
		fragment1: {
			$type: 'fragmentⵧblock',
			$classes: [],
			$content: 'horizontal rule:⎨⎨hr⎬⎬Heading:⎨⎨heading⎬⎬Another heading:⎨⎨heading⎬⎬Some text:⎨⎨br⎬⎬⎨⎨text⎬⎬⎨⎨br⎬⎬⎨⎨strong⎬⎬⎨⎨br⎬⎬⎨⎨weak⎬⎬⎨⎨br⎬⎬⎨⎨em⎬⎬⎨⎨br⎬⎬emoji:⎨⎨emoji⎬⎬⎨⎨br⎬⎬Unordered list:⎨⎨ul⎬⎬Ordered list:⎨⎨ol⎬⎬More text.',
			$sub: {
				heading: {
					$type: 'heading',
					$content: 'heading',
				},
				text: {
					$type: 'fragmentⵧinline',
					$content: 'normal',
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
				ul: {
					$type: 'ul',
					$sub: SUB_UL_ITEMS,
				},
				ol: {
					$type: 'ol',
					$sub: {
						'002': {$type: 'fragmentⵧinline', $content: 'ol #2'},
						'001': {$type: 'fragmentⵧinline', $content: 'ol #1'},
						'003': {$type: 'fragmentⵧinline', $content: 'ol #3'},
					},
				},
			},
		},
		fragment2: {
			$type: 'fragmentⵧblock',
			$classes: [],
			$content: 'Some text in a block fragment',
		},
	},
}

const DOC_DEMO_ADVANCED_TYPES: RichText.Document = {
	$type: 'fragmentⵧinline',
	$classes: [],
	$content: '⎨⎨heading⎬⎬Key-value pairs:⎨⎨kvdefault⎬⎬Nested list:⎨⎨nested_list⎬⎬Actionable items:⎨⎨uuid_list⎬⎬Done.',
	$sub: {
		heading: {
			$type: 'heading',
			$content: 'Advanced types',
		},
		kvdefault: {
			$type: 'ul',
			$sub: SUB_UL_KEY_VALUE_PAIRS,
			$hints: {
				//key_align: left,
			},
		},
		nested_list: {
			$type: 'ul',
			$sub: {
				'foo': {
					$type: 'fragmentⵧinline',
					$content: 'fooc: ⎨⎨sublist⎬⎬',
					$sub: {
						sublist: {
							$type: 'ul',
							$sub: {
								'foo': {
									$type: 'fragmentⵧinline',
									$content: 'fooc',
									$sub: {},
								},
								'bar': {
									$type: 'fragmentⵧinline',
									$content: 'barc',
									$sub: {},
								},
								'baz': {
									$type: 'fragmentⵧinline',
									$content: 'bazc',
									$sub: {},
								},
							},
						},
					},
				},
				'bar': {
					$type: 'fragmentⵧinline',
					$content: 'barc',
					$sub: {
					},
				},
				'baz': {
					$type: 'fragmentⵧinline',
					$content: 'bazc',
					$sub: {
					},
				},
			},
			$hints: {},
		},
		uuid_list: {
			$type: 'ol',
			$sub: SUB_UL_ACTIONABLE_ITEMS,
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
	$sub: {
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
			$sub: SUB_UL_ITEMS,
			$hints: {
				bullets_style: 'none',
			},
		},
	},
}

const DOC_DEMO_RPG_01: RichText.Document = {
	$v: 1,
	$type: 'fragmentⵧblock',
	$content: 'You are in ⎨⎨place⎬⎬. You meet ⎨⎨npc⎬⎬.⎨⎨br⎬⎬He gives you a ⎨⎨item⎬⎬.⎨⎨hr⎬⎬',
	$sub: {
		place: DOC_PLACE_01,
		npc: DOC_NPC_01,
		item: DOC_WEAPON_01,
	},
}

const DOC_DEMO_RPG_02: RichText.Document = {
	$v: 1,
	$type: 'ol',
	$sub: {
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
	.pushText('⎨⎨br⎬⎬loot:')
	.pushRawNode(DOC_DEMO_RPG_02, { id: 'loot' })
	.done()

const DOC_DEMO_INVENTORY: RichText.Document = {
	'$v': 1,
	'$type': 'fragmentⵧblock',
	'$classes': [],
	'$content': '⎨⎨equipped⎬⎬⎨⎨wallet⎬⎬⎨⎨backpack⎬⎬',
	'$sub': {
		'equipped': {
			'$v': 1,
			'$type': 'fragmentⵧblock',
			'$classes': [],
			'$content': '⎨⎨header⎬⎬⎨⎨list⎬⎬',
			'$sub': {
				'header': {
					'$v': 1,
					'$type': 'heading',
					'$classes': [],
					'$content': 'Active equipment:',
					'$sub': {},
					'$hints': {},
				},
				'list': {
					'$v': 1,
					'$type': 'ol',
					'$classes': [
						'inventory--equipment',
					],
					'$content': '',
					'$sub': {
						'001': {
							'$v': 1,
							'$type': 'fragmentⵧinline',
							'$classes': [],
							'$content': 'weapon: ⎨⎨s1⎬⎬',
							'$sub': {
								's1': {
									'$v': 1,
									'$type': 'fragmentⵧinline',
									'$classes': [
										'item--weapon',
										'item--quality--common',
										'item',
									],
									'$content': '⎨⎨quality⎬⎬ ⎨⎨name⎬⎬ ⎨⎨values⎬⎬',
									'$sub': {
										'quality': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [],
											'$content': 'common',
											'$sub': {},
											'$hints': {},
										},
										'name': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [
												'item__name',
											],
											'$content': '⎨⎨q2|Capitalize⎬⎬ ⎨⎨q1|Capitalize⎬⎬ ⎨⎨base|Capitalize⎬⎬',
											'$sub': {
												'base': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'spear',
													'$sub': {},
													'$hints': {},
												},
												'q1': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'heavy',
													'$sub': {},
													'$hints': {},
												},
												'q2': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'woodsman’s',
													'$sub': {},
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
											'$sub': {},
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
							'$content': 'armor : ⎨⎨s1⎬⎬',
							'$sub': {
								's1': {
									'$v': 1,
									'$type': 'fragmentⵧinline',
									'$classes': [
										'item--armor',
										'item--quality--common',
										'item',
									],
									'$content': '⎨⎨quality⎬⎬ ⎨⎨name⎬⎬ ⎨⎨values⎬⎬',
									'$sub': {
										'quality': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [],
											'$content': 'common',
											'$sub': {},
											'$hints': {},
										},
										'name': {
											'$v': 1,
											'$type': 'fragmentⵧinline',
											'$classes': [
												'item__name',
											],
											'$content': '⎨⎨q1|Capitalize⎬⎬ ⎨⎨base|Capitalize⎬⎬ ⎨⎨q2|Capitalize⎬⎬',
											'$sub': {
												'base': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'socks',
													'$sub': {},
													'$hints': {},
												},
												'q1': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'used',
													'$sub': {},
													'$hints': {},
												},
												'q2': {
													'$v': 1,
													'$type': 'fragmentⵧinline',
													'$classes': [],
													'$content': 'of the noob',
													'$sub': {},
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
											'$sub': {},
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
			'$sub': {
				'header': {
					'$v': 1,
					'$type': 'heading',
					'$classes': [],
					'$content': 'Wallet:',
					'$sub': {},
					'$hints': {},
				},
				'list': {
					'$v': 1,
					'$type': 'ul',
					'$classes': [
						'inventory--wallet',
					],
					'$content': '',
					'$sub': {
						'coin': {
							'$v': 1,
							'$type': 'fragmentⵧinline',
							'$classes': [
								'currency--coin',
							],
							'$content': '⎨⎨amount⎬⎬ coins',
							'$sub': {
								'amount': {
									'$v': 1,
									'$type': 'fragmentⵧinline',
									'$classes': [],
									'$content': '17',
									'$sub': {},
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
							'$sub': {
								'amount': {
									'$v': 1,
									'$type': 'fragmentⵧinline',
									'$classes': [],
									'$content': '0',
									'$sub': {},
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
			'$sub': {
				'header': {
					'$v': 1,
					'$type': 'heading',
					'$classes': [],
					'$content': 'Backpack:',
					'$sub': {},
					'$hints': {},
				},
				'list': {
					'$v': 1,
					'$type': 'ul',
					'$classes': [
						'inventory--backpack',
					],
					'$content': '',
					'$sub': {
						'-': {
							'$v': 1,
							'$type': 'fragmentⵧinline',
							'$classes': [],
							'$content': '(empty)',
							'$sub': {},
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

////////////

export {
	DOC_DEMO_BASE_TYPES,
	DOC_DEMO_ADVANCED_TYPES,
	DOC_DEMO_HINTS,
	DOC_DEMO_RPG_01,
	DOC_DEMO_RPG_02,
	DOC_DEMO_RPG_03,
	DOC_DEMO_INVENTORY,
}
