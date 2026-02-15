import logger from '../cross-cutting/logger.ts'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	console.log(
		`🗂 Logger up with level "${logger.getLevel()}". Reminder to check your dev tools log level!`,
	)
}

/////////////////////////////////////////////////

export default init
