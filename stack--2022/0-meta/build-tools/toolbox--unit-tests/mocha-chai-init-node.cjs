"use strict";

// Wire all mocha+chai+plugins together

const path = require('path')

const Mocha = require('mocha')
const sinon = require('sinon')
const chai = require('chai')
const chai_as_promised = require('chai-as-promised')
const sinon_chai = require('sinon-chai')
const chai_subset = require('chai-subset')
const chai_moment = require('chai-moment')


// expose some global variables as convenience
global.expect = chai.expect
global.sinon = sinon

// activate chai extensions
chai.use(chai_as_promised) // order is important: https://github.com/prodatakey/dirty-chai#use-with-chai-as-promised
chai.use(sinon_chai)
chai.use(chai_subset)
chai.use(chai_moment)

try {
	const chai_fetch_mock = require('chai-fetch-mock')
	chai.use(chai_fetch_mock) // order is important https://github.com/gakimball/chai-fetch-mock/issues/3#issuecomment-696493670
}
catch (e) { /* ignore */ }

try {
	import('./offirmo-advanced-init--node.mjs')
} catch(err) {
	// this is rare stuff, silently ignore
}

// convenience
console.log(`* Starting tests for "${path.basename(process.cwd())}"... [powered by @offirmo/unit-test-toolbox]`)
