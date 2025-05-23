import { Knex } from 'knex'
import { NORMALIZERS } from '@offirmo-private/normalize-string'

import { NAME as USERS_TABLE } from './20190915112614_create__users'

////////////////////////////////////

const ADMIN_EMAIL = 'offirmo.net@gmail.com'

////////////////////////////////////

export async function up(knex: Knex): Promise<any> {
	await knex(USERS_TABLE).insert(
		{
			id: 0,
			called: 'Admin',
			raw_email: NORMALIZERS.normalize_email_reasonable(ADMIN_EMAIL),
			normalized_email: NORMALIZERS.normalize_email_full(ADMIN_EMAIL),
			roles: [ 'admin', 'tbrpg:admin']
		},
	)
}


export async function down(knex: Knex): Promise<any> {
	return knex(USERS_TABLE).where({ 'id': 0 }).del()
}
