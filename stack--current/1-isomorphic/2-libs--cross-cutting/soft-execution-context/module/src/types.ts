import Emittery from 'emittery'
import { type TimestampUTCMs } from '@offirmo-private/timestamps'
import { type XXError } from '@offirmo/error-utils'

/////////////////////////////////////////////////

export interface BaseInjections {
	logger: any // TODO improve

	// detected env
	ENV: string
	NODE_ENV: string
	IS_DEV_MODE: boolean
	IS_VERBOSE: boolean
	CHANNEL: string
	SESSION_START_TIME_MS: TimestampUTCMs
}

export interface BaseAnalyticsDetails {
	ENV: string
	CHANNEL: string
}

export interface BaseErrorDetails {
	ENV: string
	CHANNEL: string
}

export interface WithSXC<Injections, AnalyticsDetails, ErrorDetails> {
	SXC: SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails>
}

export interface EventDataMap<Injections, AnalyticsDetails, ErrorDetails> {
	'analytics':
		Injections
		& BaseInjections
		& WithSXC<Injections, AnalyticsDetails, ErrorDetails>
		& { eventId: string, details: any }
	'final-error':
		Injections
		& BaseInjections
		& WithSXC<Injections, AnalyticsDetails, ErrorDetails>
		& { err: XXError }
}

export type OperationParams<Injections, AnalyticsDetails, ErrorDetails> =
	Injections
		& BaseInjections
		& WithSXC<Injections, AnalyticsDetails, ErrorDetails>

export type Operation<T, Injections, AnalyticsDetails, ErrorDetails> =
	(params: OperationParams<Injections, AnalyticsDetails, ErrorDetails>) => T

export interface SoftExecutionContext<
	Injections = {},
	AnalyticsDetails = {},
	ErrorDetails = {}
> {

	/////////////////////
	// core
	createChild: ()
		=> SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails>

	emitter: Emittery<EventDataMap<Injections, AnalyticsDetails, ErrorDetails>>

	/////////////////////
	// plugin: dependency injection
	injectDependencies: (p: Partial<
		Injections
		& BaseInjections
		& WithSXC<Injections, AnalyticsDetails, ErrorDetails>
	>)
		=> SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails>
	getInjectedDependencies: () =>
		Injections
		& BaseInjections
		& WithSXC<Injections, AnalyticsDetails, ErrorDetails>

	/////////////////////
	// plugin: logical stack
	setLogicalStack: (p: { module?: string, operation?: string})
		=> SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails>
	getLogicalStack: () => string
	getShortLogicalStack: () => string

	/////////////////////
	// convenience analytics + error
	setAnalyticsAndErrorDetails: (p: Partial<AnalyticsDetails & ErrorDetails>)
		=> SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails>

	/////////////////////
	// plugin: analytics
	setAnalyticsDetails: (p: Partial<AnalyticsDetails>)
		=> SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails>
	getAnalyticsDetails: () => AnalyticsDetails & BaseAnalyticsDetails
	fireAnalyticsEvent: (id: string, extraDetails?: any)
		=> SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails>

	/////////////////////
	// plugin: error handling
	setErrorDetails: (p: Partial<ErrorDetails>)
		=> SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails>
	getErrorDetails: () => ErrorDetails & BaseErrorDetails

	createError: (message: string, details: XXError['details']) => XXError
	handleError: (err: XXError, debugId: string) => void

	xTry: <T>(operation: string, fn: Operation<T, Injections, AnalyticsDetails, ErrorDetails>) => T
	xTryCatch: <T>(operation: string, fn: Operation<T, Injections, AnalyticsDetails, ErrorDetails>) => T | undefined

	xPromiseTry: <T>(operation: string, fn: Operation<Promise<T>, Injections, AnalyticsDetails, ErrorDetails>) => Promise<T>
	xNewPromise: <T>(operation: string, fn: (
		p: Injections
			& BaseInjections
			& WithSXC<Injections, AnalyticsDetails, ErrorDetails>,
		_resolve: (value?: T | PromiseLike<T>) => void,
		_reject: (reason?: any) => void,
	) => void) => Promise<T>
}
