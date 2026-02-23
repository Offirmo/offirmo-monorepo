/** Help button
 */
import 'react'

import ErrorBoundary from '@monorepo-private/react--error-boundary'

import HelpIconUrl from './noun-question-1157126.svg'

/////////////////////////////////////////////////

function on_click() {
	alert('TODO help')
}

function Help() {
	const NAME = '<Help>'

	return (
		<button debug-id={NAME} key={NAME} onClick={on_click} className={'o⋄unstyled'} style={{
			minHeight: 'var(--o⋄min-target-size)',
			minWidth: 'var(--o⋄min-target-size)',
		}}>
			<img src={HelpIconUrl} className='black-icon-to-color--fg o⋄img-visible-on-any-background' alt="" style={{
				backgroundColor: 'transparent',
				width: 'calc(var(--o⋄icon-size--chrome) - 2px)',
				height: 'calc(var(--o⋄icon-size--chrome) - 2px)',
				margin: 'auto',
				filter: 'var(--o⋄filter⁚black-icon-to-color--fg) var(--o⋄filter⁚img-visible-on-any-background)',
			}}/>
		</button>
	)
}

/////////////////////////////////////////////////

export default Help
