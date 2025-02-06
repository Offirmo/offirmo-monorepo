// https://github.com/dphilipson/typescript-string-enums

import { expect } from 'chai'

import { Enum } from 'typescript-string-enums'

import { Status } from './tse.demo.ts'

/////////////////////////////////////////////////

describe(`typescript-string-enums`, function() {

	it('should work', () => {
		console.log(Enum.isType(Status, 'hhh'))
	})
})
