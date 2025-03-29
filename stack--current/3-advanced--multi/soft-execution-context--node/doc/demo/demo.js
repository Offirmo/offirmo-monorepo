#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/babel-node "$0" "$@"
'use strict'

/* eslint-disable no-unused-vars */

const { createLogger } = require('@offirmo/practical-logger-node')
const { getRootSXC } = require('@offirmo-private/soft-execution-context')

const {
	listenToUncaughtErrors,
	listenToUnhandledRejections,
	decorateWithDetectedEnv,
} = require('../..')
const good_lib  = require('./good_lib.ts')

const APP = 'SXC_NODE_DEMO'

const logger = createLogger({
	name: APP,
	suggestedLevel: 'silly',
})

logger.notice(`Hello from ${APP}...`)


const SXC = getRootSXC()
	.setLogicalStack({
		module: APP,
	})
	.injectDependencies({
		logger,
	})

SXC.emitter.on('final-error', function onError({SXC, err}) {
	logger.log('that', {err})

	// or direct to reporter
	SXC.fireAnalyticsEvent('error', {
		...err.details,
		message: err.message,
	})
})


SXC.emitter.on('analytics', function onError({SXC, eventId, details}) {
	console.groupCollapsed(`⚡  Analytics! ⚡  ${eventId}`)
	console.log('details', details)
	console.groupEnd()
})

listenToUncaughtErrors()
listenToUnhandledRejections()
decorateWithDetectedEnv()

// Top uses tryCatch
SXC.xTryCatch('starting', ({SXC, logger}) => {
	const good_lib_inst = good_lib.create({SXC})
	SXC.xTry('calling good lib', () => good_lib_inst.foo_sync({x: 1}))

	//throw new Error('Ha ha')

	SXC.xPromiseTry('crashing in a promise', () => {
		throw new Error('Ho ho')
	})
})
