
interface RawArmorEntry {
	type: 'base' | 'qualifier1' | 'qualifier2'
	hid: string
}

// TODO tests!!

const ENTRIES: Readonly<RawArmorEntry>[] = [
	{ type: 'base', hid: 'axe' },
	{ type: 'base', hid: 'bow' },
	{ type: 'base', hid: 'claw' },
	{ type: 'base', hid: 'dagger' },
	{ type: 'base', hid: 'grimoire' },
	{ type: 'base', hid: 'harp' },
	{ type: 'base', hid: 'knife' },
	{ type: 'base', hid: 'longbow' },
	{ type: 'base', hid: 'longsword' },
	{ type: 'base', hid: 'luth' },
	{ type: 'base', hid: 'mace' },
	{ type: 'base', hid: 'scythe' },
	{ type: 'base', hid: 'spear' },
	{ type: 'base', hid: 'spoon' },
	{ type: 'base', hid: 'staff' },
	{ type: 'base', hid: 'sword' },
	{ type: 'base', hid: 'wand' },

	{ type: 'qualifier1', hid: 'admirable' },
	{ type: 'qualifier1', hid: 'arcanic' },
	{ type: 'qualifier1', hid: 'bestial' },
	{ type: 'qualifier1', hid: 'bone' },
	{ type: 'qualifier1', hid: 'brass' },
	{ type: 'qualifier1', hid: 'cardboard' },
	{ type: 'qualifier1', hid: 'complex' },
	{ type: 'qualifier1', hid: 'composite' },
	{ type: 'qualifier1', hid: 'consecrated' },
	{ type: 'qualifier1', hid: 'crafted' },
	{ type: 'qualifier1', hid: 'cruel' },
	{ type: 'qualifier1', hid: 'cunning' },
	{ type: 'qualifier1', hid: 'cursed' },
	{ type: 'qualifier1', hid: 'emerald' },
	{ type: 'qualifier1', hid: 'engraved' },
	{ type: 'qualifier1', hid: 'forbidden' },
	{ type: 'qualifier1', hid: 'forgotten' },
	{ type: 'qualifier1', hid: 'ghost' },
	{ type: 'qualifier1', hid: 'golden' },
	{ type: 'qualifier1', hid: 'heavy' },
	{ type: 'qualifier1', hid: 'heroic' },
	{ type: 'qualifier1', hid: 'holy' },
	{ type: 'qualifier1', hid: 'inflexible' },
	{ type: 'qualifier1', hid: 'invincible' },
	{ type: 'qualifier1', hid: 'iron' },
	{ type: 'qualifier1', hid: 'jade' },
	{ type: 'qualifier1', hid: 'light' },
	{ type: 'qualifier1', hid: 'living' },
	{ type: 'qualifier1', hid: 'lost' },
	{ type: 'qualifier1', hid: 'mechanical' },
	{ type: 'qualifier1', hid: 'mysterious' },
	{ type: 'qualifier1', hid: 'old' },
	{ type: 'qualifier1', hid: 'onyx' },
	{ type: 'qualifier1', hid: 'overrated' },
	{ type: 'qualifier1', hid: 'powerful' },
	{ type: 'qualifier1', hid: 'practical' },
	{ type: 'qualifier1', hid: 'proven' },
	{ type: 'qualifier1', hid: 'raging' },
	{ type: 'qualifier1', hid: 'robust' },
	{ type: 'qualifier1', hid: 'sapphire' },
	{ type: 'qualifier1', hid: 'savage' },
	{ type: 'qualifier1', hid: 'silver' },
	{ type: 'qualifier1', hid: 'simple' },
	{ type: 'qualifier1', hid: 'sinister' },
	{ type: 'qualifier1', hid: 'skeleton' },
	{ type: 'qualifier1', hid: 'solid' },
	{ type: 'qualifier1', hid: 'steel' },
	{ type: 'qualifier1', hid: 'strange' },
	{ type: 'qualifier1', hid: 'subtile' },
	{ type: 'qualifier1', hid: 'swift' },
	{ type: 'qualifier1', hid: 'unwavering' },
	{ type: 'qualifier1', hid: 'used' },
	{ type: 'qualifier1', hid: 'whirling' },
	{ type: 'qualifier1', hid: 'wooden' },

	{ type: 'qualifier2', hid: 'adjudicator' },
	{ type: 'qualifier2', hid: 'ambassador' },
	{ type: 'qualifier2', hid: 'ancients' },
	{ type: 'qualifier2', hid: 'apprentice' },
	{ type: 'qualifier2', hid: 'assaulting' },
	{ type: 'qualifier2', hid: 'beginner' },
	{ type: 'qualifier2', hid: 'brave' },
	{ type: 'qualifier2', hid: 'conqueror' },
	{ type: 'qualifier2', hid: 'cruel_tyrant' },
	{ type: 'qualifier2', hid: 'defender' },
	{ type: 'qualifier2', hid: 'destructor' },
	{ type: 'qualifier2', hid: 'dwarven' },
	{ type: 'qualifier2', hid: 'elite' },
	{ type: 'qualifier2', hid: 'elven' },
	{ type: 'qualifier2', hid: 'executioner' },
	{ type: 'qualifier2', hid: 'expert' },
	{ type: 'qualifier2', hid: 'explorer' },
	{ type: 'qualifier2', hid: 'gladiator' },
	{ type: 'qualifier2', hid: 'goddess' },
	{ type: 'qualifier2', hid: 'guard' },
	{ type: 'qualifier2', hid: 'hunter' },
	{ type: 'qualifier2', hid: 'judgement' },
	{ type: 'qualifier2', hid: 'king' },
	{ type: 'qualifier2', hid: 'mediator' },
	{ type: 'qualifier2', hid: 'mercenary' },
	{ type: 'qualifier2', hid: 'militia' },
	{ type: 'qualifier2', hid: 'nightmare' },
	{ type: 'qualifier2', hid: 'noble' },
	{ type: 'qualifier2', hid: 'noob' },
	{ type: 'qualifier2', hid: 'pilgrim' },
	{ type: 'qualifier2', hid: 'pioneer' },
	{ type: 'qualifier2', hid: 'pirate' },
	{ type: 'qualifier2', hid: 'profane' },
	{ type: 'qualifier2', hid: 'ranger' },
	{ type: 'qualifier2', hid: 'sorcerer' },
	{ type: 'qualifier2', hid: 'tormentor' },
	{ type: 'qualifier2', hid: 'training' },
	{ type: 'qualifier2', hid: 'traveler' },
	{ type: 'qualifier2', hid: 'twink' },
	{ type: 'qualifier2', hid: 'tyrant' },
	{ type: 'qualifier2', hid: 'upholder' },
	{ type: 'qualifier2', hid: 'warfield_king' },
	{ type: 'qualifier2', hid: 'warfield' },
	{ type: 'qualifier2', hid: 'warrior' },
	{ type: 'qualifier2', hid: 'wise' },
	{ type: 'qualifier2', hid: 'woodsman' },
]

export {
	type RawArmorEntry,
	ENTRIES,
}
