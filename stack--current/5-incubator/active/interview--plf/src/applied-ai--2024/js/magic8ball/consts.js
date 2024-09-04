// https://en.wikipedia.org/wiki/Magic_8_Ball

const STANDARD_RESPONSES_AFFIRMATIVE = [
	'It is certain',
	'It is decidedly so',
	'Without a doubt',
	'Yes definitely',
	'You may rely on it',
	'As I see it, yes',
	'Most likely',
	'Outlook good',
	'Yes',
	'Signs point to yes',
]
const STANDARD_RESPONSES_NON_COMMITAL = [
	'Reply hazy, try again',
	'Ask again later',
	'Better not tell you now',
	'Cannot predict now',
	'Concentrate and ask again',
]
const STANDARD_RESPONSES_NEGATIVE = [
	'Don’t count on it',
	'My reply is no',
	'My sources say no',
	'Outlook not so good',
	'Very doubtful',
]

export const STANDARD_RESPONSES = [
	...STANDARD_RESPONSES_AFFIRMATIVE,
	...STANDARD_RESPONSES_NON_COMMITAL,
	...STANDARD_RESPONSES_NEGATIVE,
]
