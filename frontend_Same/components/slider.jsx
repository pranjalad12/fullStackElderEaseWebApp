import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import '/home/pranjaladwani12/next_full_stack_servicenow/app/style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Pagination } from "swiper/modules";
// import required modules
import { Navigation } from 'swiper/modules';


export default function Slider() {
    return (
        <> 
            <h6 className='px-4 blue_gradient head_texto text-sm'><strong>Engaging and Convenient Yoga Classes and tutorials<br />

<span></span></strong></h6>
            <Swiper navigation={true} modules={[Navigation, Pagination]} className="w-full" slidesPerView={3}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }} >

                <SwiperSlide>
                    <div className='cards '>
                    <figure className="card ">

                        <img src="https://media.istockphoto.com/id/1459538271/photo/yoga-exercise-and-meditation-at-the-beach-with-a-woman-in-prayer-position-for-zen-calm-and.webp?b=1&s=170667a&w=0&k=20&c=hUK2mWQqa_YdtEil4qn2JiQ1U4VlH9vL0dyxz5wZNlQ=" />

                        <figcaption>Dota 2</figcaption>

                    </figure>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className='cards '>
                    <figure className="card ">

                    <img src="https://media.istockphoto.com/id/1473265437/photo/sportswoman-stretching-body-on-quay-in-sunshine.webp?b=1&s=170667a&w=0&k=20&c=NV7ve0k_Hjgf9P4aSKVY3A2iyOJuN-U_FvM23SFQh00=" />

                        <figcaption>Dota 2</figcaption>

                    </figure>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className='cards '>
                    <figure className="card ">

                    <img src="https://media.istockphoto.com/id/1483989743/photo/an-attractive-female-with-closed-eyes-doing-a-cobra-pose-during-a-yoga-class-in-a-beautiful.webp?b=1&s=170667a&w=0&k=20&c=VSRxr5fL3guW2Pxjnev7MH639VAa259aKPtsWbL4C2s=" />

                        <figcaption>Dota 2</figcaption>

                    </figure>
                    </div>
                </SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
                <br />
                <br />
                <br />
                <br />
                

            </Swiper>
        </>
    );
}