//import { getLogger } from '@offirmo/practical-logger-core'
import { _request_install_better_console_groups_if_not_already } from '@offirmo-private/better-console-groups'

/////////////////////////////////////////////////

_request_install_better_console_groups_if_not_already()

/////////////////////////////////////////////////

let _logger = console // safe default

function getꓽlogger() {
	return _logger
}

function _setꓽlogger(new_logger: any): void {
	_logger = new_logger
}

/////////////////////////////////////////////////

export {
	getꓽlogger,
	_setꓽlogger,
}
