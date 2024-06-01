import { Normalization as _Norm, DemoꓽAll } from '@offirmo-private/storypad/src/__shared/stories/css/typography/index.stories.ts'
import { All } from '../__shared/use-cases.stories'

import './index.css'


export function FontDemoⵧraw() {
	return `
<div class="omr⋄font⁚DeevadHand--raw">
${DemoꓽAll()}
</div>
	`
}

export function Calibration() {
	return `
<div class="omr⋄font⁚DeevadHand">
${_Norm()}
</div>
	`
}

export function FontDemoⵧCalibrated() {
	return `
<div class="omr⋄font⁚DeevadHand">
${DemoꓽAll()}
</div>
	`
}


export function UseCases() {
	return `
<div class="omr⋄font⁚DeevadHand">
${All()}
</div>
	`
}
