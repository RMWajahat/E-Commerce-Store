import React, { useEffect } from 'react'
import Category from './Category';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { gettodayCategories } from '../../Store/Product Reducers/productSlice';

import 'swiper/css';
import 'swiper/css/autoplay';
import { useDispatch, useSelector } from 'react-redux';

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.product.Categories);

    useEffect(() => {
        dispatch(gettodayCategories("fruits"));
    }, []);

    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay
            className='w-11/12 m-auto py-3'
        >

            {
                categories && categories.map((category, index) => (
                    <SwiperSlide><Category key={index} image={category.productImages[0].url} title={category.name} description={category.description} price={category.price} rating={category.ratings} ratings={category.numberOfReviews} category={category.category} id={category._id} /></SwiperSlide>
                ))
            }

        </Swiper>
    )
}

export default Categories;
