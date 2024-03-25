import React from 'react'
import Category from './Category';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';

const Categories = () => {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay
            className='w-11/12 m-auto py-3'
        >
            <SwiperSlide><Category image={"https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} title={"The Majestic and Wonderful Bahamas"} description={"The best kept secret of The Bahamas is the country's sheersize and diversity. With 16 major islands, The Bahamas is an unmatched destination"} price={110} rating={4} ratings={32} category={"Laptop"} id={1} /></SwiperSlide>

            <SwiperSlide><Category image={"https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} title={"The Majestic and Wonderful Bahamas"} description={"The best kept secret of The Bahamas is the country's sheersize and diversity. With 16 major islands, The Bahamas is an unmatched destination"} price={110} rating={4} ratings={32} category={"Laptop"} id={2} /></SwiperSlide>

            <SwiperSlide><Category image={"https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} title={"The Majestic and Wonderful Bahamas"} description={"The best kept secret of The Bahamas is the country's sheersize and diversity. With 16 major islands, The Bahamas is an unmatched destination"} price={110} rating={4} ratings={32} category={"Laptop"} id={3} /></SwiperSlide>
        </Swiper>
    )
}

export default Categories;
