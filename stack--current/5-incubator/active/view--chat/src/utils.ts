import { PProgress as PromiseWithProgress } from 'p-progress'
import assert from 'tiny-invariant'

/////////////////////////////////////////////////

function create_dummy_progress_promise({DURATION_MS = 2000, PERIOD_MS = 100} = {}): PromiseWithProgress<void> {
	assert(PERIOD_MS < DURATION_MS, 'PERIOD_MS should be < DURATION_MS!')

	return new PromiseWithProgress<void>((resolve, reject, progress) => {
		let count = 0
		let pulse = setInterval(() => {
			count++
			const completion_rate = 1. * (count * PERIOD_MS) / DURATION_MS
			progress(completion_rate)

			if (completion_rate >= 1) {
				clearInterval(pulse)
				pulse = null
				resolve()
			}
		}, PERIOD_MS)
	})
}

/////////////////////////////////////////////////

export {
	create_dummy_progress_promise
}
