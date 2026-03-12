
//let isꓽprod = true // by default
let isꓽprod = process.env.NODE_ENV === 'production';

/////////////////////////////////////////////////
// Custom errors
// setPrototypeOf: Fix prototype chain — required when targeting ES5 or older
// name: Optional: ensure the name reflects the class name

class PracticalError extends Error {
	public readonly framesToPop: number;
	public readonly statusCode: number;

	constructor(message: string, statusCode: number = 500, framesToPop: number = 1) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = new.target.name;
		this.framesToPop = framesToPop;
		this.statusCode = statusCode;
	}
}

class AssertionFailed extends PracticalError {
	constructor(message: string, statusCode?: number) {
		super(message, statusCode);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = new.target.name;
	}
}
class PreconditionFailed extends PracticalError {
	constructor(message: string, statusCode?: number) {
		super(message, statusCode);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = new.target.name;
	}
}
class PostconditionFailed extends PracticalError {
	constructor(message: string, statusCode?: number) {
		super(message, statusCode);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = new.target.name;
	}
}

/////////////////////////////////////////////////

function assert(assertion: any, assertion_description?: string | (() => string), details: { statusCode?: number } = {}): asserts assertion {
	if (assertion) {
		return;
	}

	const message__prefix = 'Assertion failed'
	const error = new AssertionFailed(`${message__prefix}!`, details.statusCode);

	if (isꓽprod) {
		throw error
	}

	const message__body = (() => {
		if (typeof assertion_description === 'function')
			return assertion_description()

		if (!!assertion_description) return String(assertion_description)

		if (typeof assertion === 'boolean')
			return 'should be true'

		if (typeof assertion === 'undefined')
			return 'should be defined'

		if (assertion === null)
			return 'should be not null'

		return undefined
	})()
	let messageⵧfinal = message__body
		? `${message__prefix}: ${message__body}`
		: message__prefix;
	if (!messageⵧfinal.endsWith('!')) messageⵧfinal += '!'

	error.message = messageⵧfinal
	throw error
}

function require(assertion: any, assertion_description?: string | (() => string), details: { statusCode?: number } = {}): asserts assertion {
	if (assertion) {
		return;
	}

	const message__prefix = 'Pre-condition failed'
	const error = new PreconditionFailed(`${message__prefix}!`, details.statusCode);

	if (isꓽprod) {
		throw error
	}

	const messageⵧfrom_user = typeof assertion_description === 'function' ? assertion_description() : assertion_description;
	let messageⵧfinal = messageⵧfrom_user
		? `${message__prefix}: ${messageⵧfrom_user}`
		: message__prefix;
	if (!messageⵧfinal.endsWith('!')) messageⵧfinal += '!'

	error.message = messageⵧfinal
	throw error
}

function ensure(assertion: any, assertion_description?: string | (() => string), details: { statusCode?: number } = {}): asserts assertion {
	if (assertion) {
		return;
	}

	const message__prefix = 'Post-condition failed'
	const error = new PostconditionFailed(`${message__prefix}!`, details.statusCode);

	if (isꓽprod) {
		throw error
	}

	const messageⵧfrom_user = typeof assertion_description === 'function' ? assertion_description() : assertion_description;
	let messageⵧfinal = messageⵧfrom_user
		? `${message__prefix}: ${messageⵧfrom_user}`
		: message__prefix;
	if (!messageⵧfinal.endsWith('!')) messageⵧfinal += '!'

	error.message = messageⵧfinal
	throw error
}

/////////////////////////////////////////////////

export {
	assert,
	require,
	ensure,
}

/////////////////////////////////////////////////



/////////////////////////////////////////////////
