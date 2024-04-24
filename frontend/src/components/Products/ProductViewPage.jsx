import React, { useEffect, useState } from 'react'
import { MdFeedback } from "react-icons/md";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';

import './products.css';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../Store/Product Reducers/productSlice';
import Loader from '../Extras/Loader';
import SectionHeading from '../Extras/SectionHeading';
import ReviewCard from '../Extras/ReviewCard';
import PageTitle from '../Extras/PageTitle';




const ProductViewPage = () => {

    const { id } = useParams();
    const [cartCount, setCartCount] = useState(1);
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.productDetails);

    const addToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingProduct = cartItems.find((item) => item._id === product._id);
        if (!existingProduct) {
            cartItems.push({ ...product, qty: cartCount });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }


    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, []);

    if (!product) {
        return <Loader />
    }

    const integralPart = Math.floor(product.price);
    const fractionalPart = (product.price - integralPart).toFixed(2).slice(2);

    return (

        <div className="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative flex-col gap-3">
            <PageTitle pagetitle={`GNES - ${product.name}`} />
            <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                <div className="flex justify-between item-center w-full md:w-11/12 m-auto">
                    <p className="flex text-gray-500 font-medium gap-1 md:gap-3">Category
                        <div className="bg-gray-200  px-2 py-1  md:px-3 md:py-1 rounded-full text-xs font-medium text-gray-800 block ">
                            {product.category}
                        </div>


                    </p>
                    <p className="flex text-gray-500 font-medium gap-1 md:gap-3 ">Stock
                        <div className={`${product.Stock > 0 ? "bg-green-200" : "bg-red-300"} px-2 py-1  md:px-3 md:py-1 rounded-full text-xs font-medium text-gray-800 block `}>
                            {product.Stock > 0 ? product.Stock : "Out of Stock"}
                        </div>
                    </p>
                    <div className="flex items-center ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="text-gray-600 font-bold text-xs md:text-sm ml-1 flex gap-1 items-center">
                            {product.ratings}
                            <span className="text-gray-500 font-normal">({product.ratings}-reviews)</span>
                            <MdFeedback className='animateicon text-xl cursor-pointer hover:text-slate-950' title='Add Review' />
                        </p>
                    </div>
                </div>
                <div className="md:flex items-center -mx-10">
                    <div className="w-full md:w-1/2 px-4 md:px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={50}
                                slidesPerView={1}
                                autoplay
                                className='w-11/12 m-auto py-3'>
                                {
                                    product.productImages && product.productImages.map((img, index) => (
                                        <SwiperSlide key={index}><img
                                            src={img.url}
                                            key={index}
                                            className="h-80 aspect-video object-cover relative z-10"
                                            alt="product image"
                                        /></SwiperSlide>
                                    ))
                                }

                            </Swiper>
                            <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-10">
                        <div className="mb-10">
                            <h1 className="font-bold uppercase text-2xl mb-5">
                                {product.name}
                            </h1>
                            <p className="text-sm">
                                {product.description}...{" "}

                            </p>
                        </div>
                        <div className='flex md:items-center gap-1 md:flex-row flex-col'>
                            <div className="inline-block align-bottom mr-3">
                                <span className=" text-5xl md:text-2xl leading-none align-baseline">$</span>
                                <span className="font-bold text-5xl leading-none align-baseline">
                                    {integralPart}
                                </span>
                                <span className="text-2xl leading-none align-baseline">.{fractionalPart}</span>
                            </div>
                            <button className='bg-gray-900 m-auto w-11/12 opacity-80 hover:opacity-100  text-slate-200 rounded-full px-6 py-2 font-semibold flex flex-row gap-4 cursor-pointer items-center md:justify-self-auto justify-center'>
                                <span className="md:px-4 mr-3" onClick={() => {
                                    if (cartCount > 1) {
                                        setCartCount(cartCount - 1)
                                    }
                                }}>-
                                </span>
                                <span className='font-bold text-base text-slate-100'>{cartCount}</span>
                                <span className="md:px-4  ml-3" onClick={() => {
                                    if (cartCount < product.Stock) {
                                        setCartCount(cartCount + 1)
                                    }
                                }}>
                                    +
                                </span>
                            </button>
                            <div className="inline-block align-bottom">
                                <button className="bg-yellow-300  w-11/12 m-auto text-nowrap opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold flex align-middle justify-center md:text-base text-sm" onClick={() => addToCart(product)}>
                                    <span>Add to Cart</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* reviews  */}
            <SectionHeading heading='Product Reviews' />
            <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto flex gap-5">
                {
                    product.reviews && product.reviews[0] === undefined ? <h1 className='text-center text-sm md:text-2xl font-semibold w-full'>No Reviews Yet</h1> :
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={50}
                            slidesPerView={3}
                            autoplay
                            className='w-11/12 m-auto py-3 cursor-pointer'>

                            {
                                product.reviews?.map((review, index) => (
                                    <SwiperSlide key={index}><ReviewCard review={review} key={index} /></SwiperSlide>
                                ))
                            }

                        </Swiper>
                }

            </div>
        </div>

    )
}

export default ProductViewPage