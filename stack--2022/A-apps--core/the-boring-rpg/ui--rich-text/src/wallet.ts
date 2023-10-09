import { Immutable } from '@offirmo-private/ts-types'
import { State as WalletState, ALL_CURRENCIES, Currency, get_currency_amount } from '@tbrpg/state-wallet'

import * as RichText from '@offirmo-private/rich-text-format'


function render_currency_amount(currency: Currency, amount: number, { render_unit }: { render_unit: boolean} = { render_unit: true }): RichText.Document {
	const doc = RichText.fragmentⵧinline()
		.addClass('currency--' + currency)
		.pushInlineFragment('' + amount, {id: 'amount'}) // TODO format according to locale?

	if (render_unit)
		doc.pushText(' ' + currency + (amount === 1 ? '' : 's')) // TODO localize properly ;)

	return doc.done()
}

function render_wallet(wallet: Immutable<WalletState>): RichText.Document {
	const $doc_list = RichText.listⵧunordered()
		.addClass('inventory--wallet')
		.done()

	ALL_CURRENCIES.forEach((currency: Currency) => {
		const amount = get_currency_amount(wallet, currency)
		$doc_list.$sub[currency] = render_currency_amount(currency, amount)
	})

	const $doc = RichText.fragmentⵧblock()
		.pushHeading('Wallet:', {id: 'header'})
		.pushNode($doc_list, {id: 'list'})
		.done()

	return $doc
}


export {
	render_currency_amount,
	render_wallet,
}
