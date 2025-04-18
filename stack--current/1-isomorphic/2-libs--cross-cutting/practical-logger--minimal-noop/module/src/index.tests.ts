import type { LogPayload, LogSink } from '@offirmo/practical-logger-types'
import { ALL_LOG_LEVELS } from '@offirmo/practical-logger-core'

const LIB = '@offirmo/practical-logger-minimal-noop'

import {
	createLogger,
} from './index.ts'


describe(`${LIB} - index`, () => {

	describe('createLogger()', () => {
		it('should work with no params', () => {
			const logger = createLogger()
			logger.fatal('Hello!')
		})

		it('should work with all params', () => {
			const logger = createLogger({
				name: 'test',
				suggestedLevel: 'error',
				forcedLevel: 'silly',
				commonDetails: {
					foo: 'bar',
				},
				sinkOptions: {},
			})
			logger.fatal('Hello!')
		})

		it('should correctly display all log levels', () => {
			const logger = createLogger({
				name: 'demo',
				forcedLevel: 'silly',
			})
			;[...ALL_LOG_LEVELS].reverse().forEach(ll => {
				if (ll === 'warning') return // alias
				logger[ll]('Something happened', { foo: 42 })
			})
		})

		it('should allow passing sink options', () => {
			const logger = createLogger({
				name: 'test',
				sinkOptions: {
					displayTime: true,
				},
			})
			logger.fatal('Hello!')
		})

		it('should allow passing a custom sink', () => {
			const sink: LogSink = (payload: LogPayload) => void {
				// nothing
			}

			const logger = createLogger({
				name: 'test',
				sinkOptions: {
					sink,
				},
			})
			logger.fatal('Hello!')
		})
	})
})
