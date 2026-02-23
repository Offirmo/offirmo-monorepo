import * as assert from 'assert'
import { type Knex } from 'knex'

import { normalizeꓽemailⵧsafe } from '@monorepo-private/normalize-string'

import { NAME as USERS_TABLE } from './20190915112614_create__users.ts'

/////////////////////////////////////////////////

function getꓽbot__email(index: number) {
	return `offirmo.net+bot${String(index+1).padStart(2, '0')}@gmail.com`
}
function getꓽbot__called(index: number) {
	return `Bot-${String(index+1).padStart(2, '0')}`
}
function getꓽbot__avatar(index: number) {
	// https://randomuser.me/
	assert.ok(index < 10) // only 0-9 available
	return `https://randomuser.me/api/portraits/lego/${index}.jpg`
}

/////////////////////////////////////////////////

const BOT_COUNT = 10

/////////////////////////////////////////////////

export async function up(knex: Knex): Promise<any> {
	return Promise.all(
		Array.from({length: BOT_COUNT}, async (_, index) => {
			const email = getꓽbot__email(index)

			await knex(USERS_TABLE).insert(
				{
					called: getꓽbot__called(index),
					raw_email: email,
					normalized_email: normalizeꓽemailⵧsafe(email), // NOTE that we don't do a full normalization here
					avatar_url: getꓽbot__avatar(index),
				},
			)
		})
	)
}

/////////////////////////////////////////////////

export async function down(knex: Knex): Promise<any> {
	return Promise.all(
		Array.from({ length: BOT_COUNT }, async (_, index) => {
			const email = getꓽbot__email(index)

			return knex(USERS_TABLE).where({
				normalized_email: normalizeꓽemailⵧsafe(email), // NOTE that we don't do a full normalization here,
			}).del()
		})
	)
}
