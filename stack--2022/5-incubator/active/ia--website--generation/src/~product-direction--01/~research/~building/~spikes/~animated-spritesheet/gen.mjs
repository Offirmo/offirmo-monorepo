
const params = {
	src: {
		width: 941,
		height: 203,
		rows: 1,
		cols: 5,
	}
}

function gen(params) {
	const num_frames = params.src.rows * params.src.cols
	const frame__width = params.src.width / params.src.cols
	const frame__height = params.src.height / params.src.rows
	const id = 'anim01'
	console.log(`
#${id} {
	width: ${frame__width.toFixed()}px; /* Width of one frame */
	height: ${frame__height.toFixed()}px; /* Height of one frame */

	background-image: url(black_skinny_hamster--row.png);
	animation-timing-function: steps(5);
	animation-duration: 2s;
	animation-iteration-count: infinite;

	animation-name: anim01__kf;

	background: url(black_skinny_hamster.png) left center;
	animation: ${id}__kf 1s steps(${num_frames}) infinite;



			background-position: top 0.0px left 0.0px;

}

@keyframes ${id}_kf {`)

	for (let r = 0; r < params.src.rows; ++r) {
		for(let c = 0; c < params.src.cols; ++c) {
			const frame_index = r * params.src.cols + c
			const percentage = ((frame_index + 1) / num_frames * 100).toFixed()


			const frame = {
				index: frame_index,
				row: r,
				col: c,
				width: params.src.width,
				height: params.src.height,
			}

			console.log(`${percentage}% { background-position: top ${(r * frame__width).toFixed()}px left ${(c * frame__height).toFixed()}px; }`)
		}
	}
}
gen(params)
