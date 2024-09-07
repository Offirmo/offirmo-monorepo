
console.log('Hi from js')



function get_angle__seconds(date = new Date()) {
	const seconds = date.getSeconds()
	//console.log({seconds})
	return `${seconds/60}turn`
}
function get_angle__minutes(date = new Date()) {
	const minutes = date.getMinutes() + date.getSeconds() / 60
	//console.log({minutes})
	return `${minutes/60}turn`
}
function get_angle__hours(date = new Date()) {
	const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
	//console.log({hours})
	return `${(hours % 12)/12}turn`
}

setInterval(() => {
	const clock_elt = document.querySelector('.clock')
	if (!clock_elt) return

	// @ts-ignore Object is possibly 'null'
	clock_elt
		.querySelector('.hand.seconds')
		.style.setProperty('--angle', get_angle__seconds())

	// @ts-ignore Object is possibly 'null'
	clock_elt
		.querySelector('.hand.minutes')
		.style.setProperty('--angle', get_angle__minutes())

	// @ts-ignore Object is possibly 'null'
	clock_elt
		.querySelector('.hand.hours')
		.style.setProperty('--angle', get_angle__hours())
}, 500)
