// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial

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

function drawHand(ctx, {fillStyle, height, length, angle}) {
	ctx.fillStyle = fillStyle
	ctx.lineWidth = height

	/*
	ctx.shadowOffsetX = 2;
	ctx.shadowOffsetY = 2;
	ctx.shadowBlur = 2;
*/

	ctx.beginPath();
	//ctx.moveTo(25, 25);
	ctx.lineTo(105, 25);
	ctx.lineTo(25, 105);
	ctx.fill();
	//moveTo(radius, radius)
	/*
	ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.fill();
	 */
}


setInterval(() => {
	const clock_elt = document.querySelector('.clock')
	if (!clock_elt) return

	const radius = parseInt(getComputedStyle(clock_elt).getPropertyValue('--radius'), 10)
	const unit = radius/100

	const ctx = clock_elt.getContext("2d")

	ctx.clearRect(0, 0, radius*2, radius*2)

	ctx.moveTo(radius, radius)
	drawHand(ctx, {
		fillStyle: 'rgb(0 0 250)',
		height: 5 * unit,
		length: radius * 0.5,
		angle: 45,
	})

	ctx.moveTo(radius, radius)
	drawHand(ctx, {
		fillStyle: 'rgb(0 0 200)',
		height: 3 * unit,
		length: radius * 0.7,
		angle: 90,
	})

	ctx.moveTo(radius, radius)
	drawHand(ctx, {
		fillStyle: 'rgb(0 0 150)',
		height: 1 * unit,
		length: radius * 0.9,
		angle: 175,
	})

/*
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
		.style.setProperty('--angle', get_angle__hours())*/
}, 500)
