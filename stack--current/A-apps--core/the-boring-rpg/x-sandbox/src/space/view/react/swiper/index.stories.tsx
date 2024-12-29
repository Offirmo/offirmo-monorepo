import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import {
	Autoplay,
	EffectFade,
	Mousewheel,
} from 'swiper/modules'
import 'swiper/css/effect-fade'
import 'swiper/css/mousewheel'
import 'swiper/css/autoplay'


import './index.stories.css'
export default {
	//component: Component,
	title: 'swiper',
	//tags: ['autodocs'],
	//👇 Our exports that end in "Data" are not stories.
	//excludeStories: /.*Data$/,
	/*args: {
		...ActionsData,
	},*/
	decorators: [
		(Story) => {
			import('@offirmo-private/css--framework')
			return Story
		},
		(Story) => (
			<div className="o⋄full-viewport">
				<Story />
			</div>
		),
	]
}

// https://swiperjs.com/react#usage
// https://codesandbox.io/p/devbox/swiper-react-default-dnfw9v
export const Default = {
	render: () => {
		return (
			<Swiper
				spaceBetween={50}
				slidesPerView={3}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
				<SwiperSlide>Slide 5</SwiperSlide>
				<SwiperSlide>Slide 6</SwiperSlide>
				<SwiperSlide>Slide 7</SwiperSlide>
				<SwiperSlide>Slide 8</SwiperSlide>
				<SwiperSlide>Slide 9</SwiperSlide>
			</Swiper>
		);
	}
}

// https://swiperjs.com/swiper-api#fade-effect
export const FullFade = {
	render: () => {
		return (
			<Swiper modules={[EffectFade]} effect="fade">
				{[1, 2, 3].map((i, el) => {
					return <SwiperSlide>Slide {el}</SwiperSlide>;
				})}
			</Swiper>
		);
	}
}

export const Immersion1 = {
	render: () => {
		return (
			<Swiper
				speed={6000 /* there is an ease-in-out so need good combo with autoplay delay */}
				grabCursor={true}
				loop={true}
				centeredSlides={true}
				modules={[
					Autoplay,
					EffectFade,
					Mousewheel,
				]}
				autoplay={{
					// https://swiperjs.com/swiper-api#autoplay
					delay: 3000,
					waitForTransition: true,
					disableOnInteraction: false,
				}}
				effect="fade"
				fadeEffect={{
					crossFade: true,
				}}
				mousewheel={true}
				onSlideChange={(...args) => {
					console.log('slide change', args)
					// autoplay doesn't always start or get stuck
					args[0].autoplay.start()
					args[0].autoplay.resume()
				}}
				onSwiper={(...args) => {
					console.log('onSwiper', args)
				}}
			>
				{Array.from({length: 3},
					(_, index) => <SwiperSlide key={index}>
						<div style={{position: 'relative'}}>
							<div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
							<img src={'https://picsum.photos/1200/600?random=' + index}/>
							<span style={{position: 'absolute', top: 0, left: 0, color: 'white', backgroundColor: 'black'}}>Slide {index}</span>
						</div>
					</SwiperSlide>)}
			</Swiper>
		);
	}
}
