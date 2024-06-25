import { useEffect, useState, useRef } from 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

import Immersion from './immersion'
import BG from '../../../to-export-to-own-package/assets--background/licensed/Albert_Weand/adventurers/index.tsx'

/////////////////////////////////////////////////

function HUD() {
	// TODO dynamic / as needed?
	// TODO player frame
	// TODO mini map
	// TODO health / stamina / magic / armour
	// TODO equipped equipment ex. pickaxe etc
	// TODO Context-sensitive information
	// TODO current goal / quest
	// TODO timer
	// TODO progression: experience
	return (
		<div debug-id="<HUD>" key="HUD" style={{}}>
			TODO HUD
		</div>
	)
}

function Navigation() {
	return (
		<div debug-id="<Navigation>" key="nav" style={{}}>
			TODO Mode Navigation
		</div>
	)
}

function Main() {
	return (
		<div debug-id="<Main>" key="main" style={{}}>
			<h1>Main</h1>
			<p>TODO elements depending on current mode, ex. HUD, minimap...</p>
			<form>
				<input type="text"/>
			</form>
			<a href={'https://www.google.com'}>External URL</a>
		</div>
	)
}

function App() {
	const NAME = '<App>'
	const [ref, setRef] = useState<ReturnType<typeof useRef>>()

	const { width, height } = (ref?.getBoundingClientRect() || {})

	return (
		<div debug-id={NAME} key="content-container" style={{ isolation: 'isolate' }}
		     ref={new_ref => setRef(new_ref)}>

			<Immersion bg={BG} alt_alignment={false} width={width} height={height} />

			<div id="<App>__usable_viewport" key="usable_viewport" className={'o⋄usable-viewport'} style={{
				border: 'dashed 1px lightgreen',
			}}>
				<HUD/>
				<Navigation/>
				<Main/>
			</div>
		</div>
	)
}

/////////////////////////////////////////////////

export default App


		/*
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin hendrerit sed nibh vel pharetra. Vestibulum cursus, risus eu vulputate varius, orci libero maximus dui, sed eleifend justo urna at ex. Integer facilisis lorem enim, nec semper metus tempor quis. Praesent et dui quis nulla convallis lacinia ac at odio. Nulla congue, massa in ultrices iaculis, velit neque faucibus lectus, et eleifend diam lacus sed leo. Aliquam volutpat ante dui, aliquet sollicitudin metus elementum sit amet. Phasellus blandit gravida tortor quis ultricies. Ut scelerisque odio nunc, vel luctus diam posuere eget. Sed quis lectus mattis, volutpat elit vitae, pellentesque ipsum.
		</p><p>
		Phasellus placerat arcu leo, vestibulum dignissim libero convallis non. Vivamus vel tincidunt ex. Proin elementum ac nisi ac rhoncus. Nulla ultricies erat eget dolor mollis, id congue massa sollicitudin. Suspendisse orci eros, tincidunt in interdum sit amet, auctor quis dui. Aliquam in quam tempus, iaculis velit eu, congue est. Morbi in arcu eleifend, vehicula sapien eu, vestibulum leo.
	</p><p>
		Donec condimentum consectetur orci vitae rhoncus. Sed ullamcorper, nisl vel luctus blandit, eros mi tempus ipsum, et egestas nulla justo et massa. Pellentesque sagittis ipsum vel venenatis consectetur. Proin in viverra tellus. Aliquam id aliquet enim, nec finibus massa. Maecenas porta diam non pretium convallis. Curabitur ligula lectus, sagittis nec tempus ut, semper vestibulum sem. Duis quis egestas orci, eu consequat quam. Quisque gravida orci massa, eget pulvinar dui venenatis sed.
	</p><p>
		Fusce interdum justo ut lectus interdum, mollis finibus dui vehicula. In dapibus nulla sit amet erat dapibus suscipit. Nulla pellentesque viverra ligula sed dignissim. Praesent mollis sem nec nisl consequat vulputate. Duis et metus et elit vulputate posuere id sit amet nunc. Etiam ornare nisl a ex pretium consequat. Aenean aliquet vestibulum enim, id rutrum enim fermentum vitae. Integer eget elementum eros. Praesent porttitor ac mauris et pharetra. Proin ac fringilla velit, vel mattis magna. Vestibulum ac risus nec dolor interdum tristique. Quisque eget porta nulla. Etiam sit amet imperdiet diam.
	</p><p>
		Pellentesque finibus nec tellus vel sagittis. Aenean nec lacinia felis. Pellentesque posuere dictum tincidunt. Suspendisse aliquam massa non imperdiet viverra. Donec vel tellus lectus. Integer finibus at massa eget tempor. Fusce semper felis eget lobortis elementum. Etiam laoreet sem sit amet urna mattis, aliquam dictum lectus interdum. Ut sed massa quis ante faucibus aliquet. Nulla blandit lorem in fringilla sollicitudin. Nam ornare magna lacus, non tempor lacus molestie nec. Donec facilisis, diam vitae blandit iaculis, nisl ligula tempor leo, sit amet vestibulum orci justo eu tellus. Suspendisse purus dui, lobortis vel tortor at, tincidunt faucibus felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis vel est id lectus tincidunt malesuada. Proin sagittis libero metus, at aliquam magna elementum quis.
	</p><p>
		Duis tempor faucibus eros quis fringilla. Nunc dignissim nisl eu ornare imperdiet. Nam cursus arcu eget egestas consequat. Phasellus eu turpis nec erat tincidunt facilisis. Maecenas ac leo vel sapien pretium euismod quis a enim. Sed gravida felis quis nisl mattis, in lobortis velit imperdiet. Sed mattis egestas dui quis imperdiet. Vivamus tincidunt, odio id elementum placerat, tortor dui tempor purus, eu sagittis erat turpis non leo. Nullam tristique blandit magna vitae congue.
	</p><p>
		Nam sit amet sem a mauris ornare consectetur. Maecenas eleifend dignissim risus. Phasellus orci enim, consectetur ac nunc nec, molestie molestie tellus. Donec consectetur eros vel est rutrum, vel congue justo mollis. Suspendisse nec arcu ut quam eleifend ullamcorper nec ac elit. Praesent posuere purus a magna imperdiet suscipit. In facilisis tincidunt augue, ut maximus nibh pharetra et. Pellentesque laoreet tortor at porta cursus. Sed eu arcu et sem finibus semper. Donec vel dictum mauris, sed placerat nisl. Duis at viverra enim.
	</p><p>
		Sed sit amet mauris et urna accumsan dictum imperdiet a nisl. Donec quam neque, vestibulum ut suscipit at, elementum sed est. Vivamus arcu nulla, pharetra at risus a, lacinia molestie nulla. Curabitur tincidunt arcu vitae mauris porta, non tempus enim condimentum. Suspendisse a risus maximus, malesuada magna ac, porta quam. Donec a volutpat tellus. Curabitur consectetur feugiat scelerisque. Integer non sollicitudin nulla. Aliquam eu ipsum eu velit consectetur consequat. Nunc imperdiet lectus a nisi dapibus, a porttitor libero ornare. Integer luctus porta tellus ut ultrices. Etiam vehicula sodales dolor eget condimentum.
	</p><p>
		Nunc ut mattis velit. Fusce risus ex, fringilla a nulla ac, accumsan dictum lectus. Aenean interdum, sapien ut sodales dignissim, dui risus pretium lectus, in cursus lacus nisi vitae orci. Sed id commodo est, id posuere erat. Nunc nibh arcu, scelerisque a urna placerat, ullamcorper mattis sapien. Proin a lacus metus. Fusce vel leo aliquam urna viverra laoreet sed nec eros. Integer eget risus dapibus quam luctus elementum. Vestibulum eget est a ex tempor euismod a vitae ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti.
	</p><p>
		Sed egestas quam a blandit imperdiet. Maecenas cursus nulla vel neque faucibus porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam et imperdiet velit. Nunc ut mollis mi. Suspendisse turpis magna, luctus sit amet ex ac, commodo pellentesque eros. Morbi arcu enim, mollis eu urna ac, dignissim luctus dolor.
	</p><p>
		Sed augue erat, sollicitudin quis erat ut, hendrerit vestibulum leo. Etiam suscipit, est vitae ultricies porttitor, risus enim iaculis mi, in lobortis felis lacus eu felis. Praesent justo risus, sollicitudin nec luctus at, malesuada a erat. Sed mauris dui, sollicitudin vulputate tortor in, auctor sagittis dui. Suspendisse potenti. Donec eros tortor, aliquam at est maximus, euismod interdum neque. Nunc lacinia purus nunc, eget dapibus nulla ultricies in. Cras fringilla sagittis purus.
	</p><p>
		Curabitur a ornare enim, eu dictum ipsum. Nulla vitae sem rhoncus, accumsan arcu sed, molestie enim. Maecenas ligula velit, mollis at faucibus vitae, porta nec magna. Praesent a sollicitudin felis. In ullamcorper at velit ut tincidunt. Aliquam finibus eget dolor in placerat. Praesent eu rutrum magna, sed ornare tellus. Sed semper aliquet volutpat.
	</p>

		*/
