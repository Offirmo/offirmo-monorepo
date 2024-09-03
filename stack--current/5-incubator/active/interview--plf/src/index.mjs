import {
	title,
	html,
	main as _main,
//} from './chrome-ai--8ball/index.mjs';
} from './chrome-ai--discovery/index.mjs';

export default function main() {
	console.log('Hi from js')

	document.title = title
	document.body.innerHTML = html

	window.addEventListener("load", (event) => {
		//console.log("ೱpage_loaded page load event", event);
		_main()
	})
}
