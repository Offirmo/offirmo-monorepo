import { PProgress as PromiseWithProgress } from 'p-progress'
import assert from 'tiny-invariant'

/////////////////////////////////////////////////

function create_dummy_progress_promise({ duration_ms = 2000, period_ms = 100 } = {}): PromiseWithProgress<void> {
	assert(period_ms < duration_ms, 'PERIOD_MS should be < DURATION_MS!')

	return new PromiseWithProgress<void>((resolve, reject, progress) => {
		let count = 0
		const pulse = setInterval(() => {
			count++
			const completion_rate = 1. * (count * period_ms) / duration_ms
			progress(completion_rate)

			if (completion_rate >= 1) {
				clearInterval(pulse)
				resolve()
			}
		}, period_ms)
	})
}

/////////////////////////////////////////////////

export {
	create_dummy_progress_promise,
}
