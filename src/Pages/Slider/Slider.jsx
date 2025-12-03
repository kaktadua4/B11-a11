import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const Slider = ({ bannerSlides }) => {
    return (
        <div className='w-full'>
            <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                grabCursor={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                loop={true}
                speed={1000}
                className="w-full"
            >
                {bannerSlides && bannerSlides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative bg-white">
                        <div className='flex flex-col md:flex-row items-center'>
                            
                            {/* Text Content - Left Side */}
                                <div className='w-full  md:w-1/2 px-10 flex flex-col justify-center '>
                                    <span className='text-xs sm:text-sm font-semibold text-blue-400 uppercase mb-3 sm:mb-4 block'>The Ultimate Hub</span>
                                    <h2 className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-sky-500 mb-4 sm:mb-6 leading-tight'>
                                        {slide.title}
                                        <span className='text-sky-500 block mt-2'>Next Challenge</span>
                                    </h2>
                                    <p className='text-sm sm:text-base md:text-lg text-blue-300 mb-6 sm:mb-8 leading-relaxed'>
                                        {slide.subtitle}
                                    </p>
                                    <button className='bg-sky-300 hover:bg-sky-400 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 w-fit'>
                                        Explore All Events
                                    </button>
                                </div>

                            {/* Image - Right Side */}
                            <div className='w-full  md:w-1/2 order-1 md:order-2 overflow-hidden'>
                                <img
                                    src={slide.img}
                                    alt={slide.title}
                                    className='w-full h-full object-cover'
                                />
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;