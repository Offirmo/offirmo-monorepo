


/////////////////////////////////////////////////
// Type
// = recursive KV

function create_node(key) {
	return {
		key,
		references: [], // href[]
		notifications: [], // [console args][]
		results: [], // [console args][]

		children: [] // node[]
	}
}

function add_child(parent_node, new_node) {
	parent_node.children.push(new_node)
}

function try_or_report(node, details, func, default_result) {
	try {
		const result = func()

		if (result?.then) {
			result.catch(err => {
				node.notifications.push(['promise rejected!', err])
			})
		}

		return result
	}
	catch (err) {
		node.notifications.push([
			'error encountered! context:',
			details,
			{err},
		])
		return default_result
	}
}

/////////////////////////////////////////////////

function has_notification(node, { recursive = true } = {}) {
	if (node.notifications.length)
		return true

	if ((
		+ node.notifications.length
		+ node.results.length
		+ node.children.length
	) === 0)
		return true // not normal

	if (recursive)
		return node.children.some(c => has_notification(c))

	return false
}

function printReport(node) {
	const hasNotification = has_notification(node)

	if (hasNotification)
		console.group(`report: ${node.key}`)
	else
		console.groupCollapsed(`report: ${node.key}`) // Collapsed

	node.references.forEach(href => console.debug('ref:', href))

	node.notifications.forEach(args => {
		const maybe_error = args.at(-1)
		if (typeof maybe_error === 'object' && (maybe_error?.message || maybe_error?.err))
			console.error(...args)
		else
			console.warn(...args)
	})

	node.results.forEach(args => console.info(...args))

	node.children.forEach(n => printReport(n))

	if ((
		+ node.notifications.length
		+ node.results.length
		+ node.children.length
	) === 0)
		console.warn('(no data ???)')

	console.groupEnd()
}

/////////////////////////////////////////////////


import reportꓽsecurity from './security/index.js'
import reportꓽenvironment from './environment/index.js'
import reportꓽancestry from './ancestry/index.js'
import reportꓽsiteData from './site-data/index.js'
import reportꓽauxiliaries from './auxiliaries/index.js'
import reportꓽdemo from './template.js'

export default function report() {
	const node = create_node(window.origin)

	const LIB = {
		create_node,
		add_child,
		try_or_report,
	}

	reportꓽsecurity(node, LIB)
	reportꓽenvironment(node, LIB)
	reportꓽancestry(node, LIB)
	reportꓽsiteData(node, LIB)
	reportꓽauxiliaries(node, LIB)
	reportꓽdemo(node, LIB)

	// some checks need promises resolutions
	setTimeout(() => {
		printReport(node)
	}, 10)
}
