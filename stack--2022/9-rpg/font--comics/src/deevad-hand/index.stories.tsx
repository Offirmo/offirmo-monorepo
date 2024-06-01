
import './index.css'

import { Normalization as _Norm, DemoꓽAll } from '@offirmo-private/storypad/src/__shared/stories/css/typography/index.stories.ts'

export function Demoⵧraw() {
	return `
<div class="omr⋄font⁚DeevadHand--raw">
${DemoꓽAll()}
</div>
	`
}
export function DemoⵧCalibrated() {
	return `
<div class="omr⋄font⁚DeevadHand">
${DemoꓽAll()}
</div>
	`
}

export function Normalization() {
	return `
<div class="omr⋄font⁚DeevadHand">
${_Norm()}
</div>
	`
}


export function Calibration() {
	return `
<div class="omr⋄font⁚DeevadHand">
TODO
</div>
	`
}
