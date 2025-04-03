import type { XXError } from '@offirmo/error-utils'

interface Decorator {
	(err: unknown): XXError
}

export function _create_catcher(
	{
		decorators = [],
		onError,
		debugId = '?',
	}: {
		decorators?: Array<Decorator>,
		onError?: (err: unknown) => void,
		debugId?: string
	}
	= {}
): (err: unknown) => void {
	return (err: unknown) => {
		//console.info(`[catchFactory from ${debugId}]`)
		err = decorators.reduce<XXError>((err, decorator) => {
			try {
				err = decorator(err)
				if (!(err as any).message)
					throw new Error()
			}
			catch (decoratorErr: unknown) {
				/* eslint-disable no-console */
				console.error(`catchFactory exec from ${debugId}: bad decorator!`, {
					err,
					decoratorErr,
					'decorator.name': decorator.name,
				})
				/* eslint-enable no-console */
			}
			return err
		}, err as any)

		if (onError)
			return onError(err)

		throw err // or rethrow since still unhandled
	}
}
