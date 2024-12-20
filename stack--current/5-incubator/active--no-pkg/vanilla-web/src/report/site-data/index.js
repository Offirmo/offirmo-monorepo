
import reportꓽstorage from "./storage/index.js"

// TODO https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API

export default function report(parent, LIB) {
	const node = LIB.create_node('Site Data')

	node.references.push('https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data')

	reportꓽstorage(node, LIB)

	LIB.add_child(parent, node)
}
