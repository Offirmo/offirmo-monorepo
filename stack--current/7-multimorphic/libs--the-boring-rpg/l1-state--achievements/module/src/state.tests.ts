import { expect } from 'chai'
import * as sinon from 'sinon'

import { LIB, SCHEMA_VERSION } from './consts.ts'
import {
	type State,
	AchievementStatus,
	create,
	on_played,
	on_achieved,
} from './index.ts'
import { getꓽSXC } from './sxc.ts'


describe(`${LIB} - state`, function() {

	beforeEach(function () {
		// @ts-expect-error
		this.clock = sinon.useFakeTimers() // needed to have a reproducible timestamp
	})
	afterEach(function () {
		// @ts-expect-error
		this.clock.restore()
	})

	describe('🆕  create()', function() {

		it('should have correct defaults', function() {
			const state = create(getꓽSXC())

			expect(state.statistics.creation_date_hrtday).to.have.lengthOf(8)
			expect(state.statistics.last_visited_timestamp_hrtday).to.have.lengthOf(8)

			expect(state).to.deep.equal({
				schema_version: SCHEMA_VERSION,
				revision: 0,

				wiki: null,
				flags: null,
				achievements: {},

				statistics: {
					creation_date_hrtday: '19700101',
					last_visited_timestamp_hrtday: '19700101',
					active_day_count: 1,
					good_play_count: 0,
					bad_play_count: 0,
					encountered_adventures: {},
					encountered_monsters: {},
					good_play_count_by_active_class: {},
					bad_play_count_by_active_class: {},
					fight_won_count: 0,
					fight_lost_count: 0,
					coins_gained: 0,
					tokens_gained: 0,
					items_gained: 0,
					has_account: false,
					is_registered_alpha_player: false,
				},
			} satisfies State)
		})
	})

	describe('on_played', function() {

		context('bad', function() {

			it('should correct updates relevant values', function() {
				let state = create(getꓽSXC())

				state = on_played(state, {
					good: false,
					adventure_key: 'foo_adv',
					encountered_monster_key: null,
					active_class: 'foo',
					coins_gained: 12,
					tokens_gained: 34,
					items_gained: 56,
				})

				expect(state.statistics).to.deep.equal({
					creation_date_hrtday: '19700101',
					last_visited_timestamp_hrtday: '19700101',
					active_day_count: 1,
					good_play_count: 0,
					bad_play_count: 1,
					encountered_adventures: {
						'foo_adv': true,
					},
					encountered_monsters: {},
					good_play_count_by_active_class: {},
					bad_play_count_by_active_class: {
						'foo': 1,
					},
					fight_won_count: 0,
					fight_lost_count: 0,
					coins_gained: 12,
					tokens_gained: 34,
					items_gained: 56,
					has_account: false,
					is_registered_alpha_player: false,
				} satisfies State['statistics'])
			})
		})

		context('good', function() {

			it('should correct updates relevant values', function() {
				let state = create(getꓽSXC())

				state = on_played(state, {
					good: true,
					adventure_key: 'foo_adv',
					encountered_monster_key: null,
					active_class: 'foo',
					coins_gained: 12,
					tokens_gained: 34,
					items_gained: 56,
				})

				expect(state.statistics).to.deep.equal({
					creation_date_hrtday: '19700101',
					last_visited_timestamp_hrtday: '19700101',
					active_day_count: 1,
					good_play_count: 1,
					bad_play_count: 0,
					encountered_adventures: {
						'foo_adv': true,
					},
					encountered_monsters: {},
					good_play_count_by_active_class: {
						'foo': 1,
					},
					bad_play_count_by_active_class: {
					},
					fight_won_count: 0,
					fight_lost_count: 0,
					coins_gained: 12,
					tokens_gained: 34,
					items_gained: 56,
					has_account: false,
					is_registered_alpha_player: false,
				} satisfies State['statistics'])

				state = on_played(state, {
					good: true,
					adventure_key: 'fight_won_foo',
					encountered_monster_key: 'foo_monster',
					active_class: 'foo',
					coins_gained: 12,
					tokens_gained: 34,
					items_gained: 56,
				})

				expect(state.statistics).to.deep.equal({
					creation_date_hrtday: '19700101',
					last_visited_timestamp_hrtday: '19700101',
					active_day_count: 1,
					good_play_count: 2,
					bad_play_count: 0,
					encountered_adventures: {
						'foo_adv': true,
						'fight_won_foo': true,
					},
					encountered_monsters: {
						'foo_monster': true,
					},
					good_play_count_by_active_class: {
						'foo': 2,
					},
					bad_play_count_by_active_class: {
					},
					fight_won_count: 1,
					fight_lost_count: 0,
					coins_gained: 24,
					tokens_gained: 68,
					items_gained: 112,
					has_account: false,
					is_registered_alpha_player: false,
				} satisfies State['statistics'])
			})
		})
	})

	describe('on_achieved', function() {

		it('should correct updates relevant values', function() {
			let state = create(getꓽSXC())

			state = on_achieved(state, 'foo', AchievementStatus.revealed)

			expect(state.achievements).to.deep.equal({
				foo: AchievementStatus.revealed,
			} satisfies State['achievements'])

			state = on_achieved(state, 'bar', AchievementStatus.revealed)
			state = on_achieved(state, 'foo', AchievementStatus.unlocked)

			expect(state.achievements).to.deep.equal({
				bar: AchievementStatus.revealed,
				foo: AchievementStatus.unlocked,
			} satisfies State['achievements'])
		})
	})
})
