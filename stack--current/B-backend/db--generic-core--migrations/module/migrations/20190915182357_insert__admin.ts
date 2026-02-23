import { type Knex } from 'knex'

import { normalizeꓽemailⵧreasonable, normalizeꓽemailⵧfull } from '@monorepo-private/normalize-string'

import { NAME as USERS_TABLE } from './20190915112614_create__users.ts'

/////////////////////////////////////////////////

const ADMIN_EMAIL = 'offirmo.net@gmail.com'

/////////////////////////////////////////////////

export async function up(knex: Knex): Promise<any> {
	await knex(USERS_TABLE).insert(
		{
			id: 0,
			called: 'Admin',
			raw_email: normalizeꓽemailⵧreasonable(ADMIN_EMAIL),
			normalized_email: normalizeꓽemailⵧfull(ADMIN_EMAIL),
			roles: [ 'admin', 'tbrpg:admin']
		},
	)
}

/////////////////////////////////////////////////

export async function down(knex: Knex): Promise<any> {
	return knex(USERS_TABLE).where({ 'id': 0 }).del()
}
