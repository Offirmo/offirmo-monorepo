// https://swiperjs.com/
// found through https://www.bacancytechnology.com/blog/react-carousel

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

/////////////////////////////////////////////////
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
			import('@monorepo-private/css--framework')
			return Story
		},
		(Story) => (
			<div className="o⋄full-viewport">
				<Story/>
			</div>
		),
	],
}

/////////////////////////////////////////////////

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
		)
	},
}

// https://swiperjs.com/swiper-api#fade-effect
export const FullFade = {
	render: () => {
		return (
			<Swiper modules={[EffectFade]} effect="fade">
				{[1, 2, 3].map((i, el) => {
					return <SwiperSlide>Slide {el}</SwiperSlide>
				})}
			</Swiper>
		)
	},
}

// BUG when loop + mousewheel, "active" index doesn't loop
// BUG wheel direction is opposite
// BUG autoplay doesn't start (mb due to images loading)
// BUG autoplay interferes with the rest
function _onSlideChange(...args) {
	// a small timeout gives time to react to handle destroy, esp. with <StrictMode>
	setTimeout(() => {
		const instance = args[0]
		const {destroyed, autoplay} = instance
		if (destroyed) {
			//ignore
			return
		}
		if (!autoplay) {
			// should never happen unless destroyed
			console.log(`(no autoplay yet???)`)
			return
		}




		console.group(`swiper ⚡️slideChange ${args?.[0]?.activeIndex}`)
		console.log(`args`, args)
		console.log(`checking…`, {
			instance, autoplay, snap: {
				animating: instance.animating,
				active: instance.activeIndex,
				_seen_running: autoplay._seen_running,
				running: autoplay.running,
				paused: autoplay.paused,
				timeLeft: autoplay.timeLeft,
				_wakeup: autoplay._wakeup,
			},
		})
		if (autoplay._wakeup) {
			// if we're here, we're alive!
			clearTimeout(autoplay._wakeup)
			autoplay._wakeup = null
		}

		// autoplay doesn't always start or get stuck
		const first_invoc = (autoplay._seen_running == null)
		autoplay._seen_running ||= (autoplay.running && !autoplay.paused)
		if (first_invoc) {
			console.log(`1st invoc`, autoplay._seen_running)
			//autoplay.start()
			//autoplay.resume()
		}

		if (!autoplay.running) {
			console.log(`autoplay not running!`)

			if (!autoplay._seen_running) {
				console.log(`…and never seen running!`)
				autoplay.start()
			}
			else {
				// must have stopped due to disableOnInteraction
				console.log(`…rescheduling it in a while…`)
				autoplay._wakeup = setTimeout(() => {
					console.log(`…checking resume after interaction`)
					autoplay.start() // could have been destroyed in the meantime
					autoplay.resume()
					autoplay._wakeup = null
				}, 10_000)
			}
		} else if (autoplay.paused) {
			console.log(`autoplay paused!`)

			if (instance.animating) {
				console.log(`(transitioning)`)
			}
			else if (!autoplay._seen_running) {
				console.log(`...and never seen running!`)
				autoplay.resume()
			} else  {
				// we've seen it running once, it must have paused on user interaction?
				// NO seen spontaneous pauses, esp. start "paused" maybe due to wait img loading
				console.log(`...force resuming`)
				autoplay.resume()
			}
		}
		console.groupEnd()
	}, 5)
}



// speed={1000 /* there is an ease-in-out so need good combo with autoplay delay */}
// default = 300ms, better not change it, issues when manual changes
// grabcursor not needed, easy to style it ourselves
export const ImmersionSpacePlanetScapes = {
	render: () => {
		console.log(`🌀 <ImmersionSpacePlanetScapes /> render()`, {
			mods: {
				Autoplay,
				EffectFade,
				Mousewheel,
			},
		})

		return (
			<Swiper className="o⋄fill-parent"
				loop={true}
				modules={[
				  Autoplay,
				  EffectFade,
				  Mousewheel,
				]}
				autoplay={{
				  // https://swiperjs.com/swiper-api#autoplay
				  delay: 3000,
				  waitForTransition: true,
				  disableOnInteraction: true,
				}}
				effect="fade"
				fadeEffect={{
				  crossFade: true,
				}}
				mousewheel={{
					enabled: true,
					invert: true,
				}}

				onAfterInit={(...args) => {
					console.log('swiper ⚡️onAfterInit', args)
				}}
			  onDestroy={(...args) => {
				  console.log('swiper ⚡️onDestroy', args)
			  }}
				onSlideChange={_onSlideChange}
			>
				{Array.from({length: 3},
					(_, index) => <SwiperSlide key={index} className="o⋄fill-parent">
						<div className="o⋄fill-parent" style={{position: 'relative'}}>
							<div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
							<img className="o⋄fill-parent" src={'https://picsum.photos/600/600?random=' + index} style={{cursor: 'col-resize'}}/>
							<span style={{position: 'absolute', top: 0, left: 0, color: 'white', backgroundColor: 'black'}}>Slide {index}</span>
						</div>
					</SwiperSlide>)}
			</Swiper>
		)
	},
}
