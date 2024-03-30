import React, { useEffect } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../Store/Product Reducers/productSlice';
import Loader from '../Extras/Loader';

const ProductViewPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.productDetails);

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, []);

    if (!product) {
        return <Loader />
    }

    const integralPart = Math.floor(product.price);
    const fractionalPart = (product.price - integralPart).toFixed(2).slice(2);

    return (
        <div className="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
            <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                <div className="flex justify-between item-center w-11/12 m-auto">
                    <p className="flex text-gray-500 font-medium gap-3">Category
                        <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 block ">
                            {product.category}
                        </div>


                    </p>
                    <p className="flex text-gray-500 font-medium gap-3">Stock
                        <div className={`${product.Stock > 0 ? "bg-green-200" : "bg-red-300"}  px-3 py-1 rounded-full text-xs font-medium text-gray-800 block `}>
                            {product.Stock > 0 ? product.Stock : "Out of Stock"}
                        </div>
                    </p>
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="text-gray-600 font-bold text-sm ml-1">
                            {product.ratings}
                            <span className="text-gray-500 font-normal">({product.ratings} reviews)</span>
                        </p>
                    </div>
                </div>
                <div className="md:flex items-center -mx-10">
                    <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={50}
                                slidesPerView={1}
                                autoplay
                                className='w-11/12 m-auto py-3'>
                                {
                                    product.productImages && product.productImages.map((img, index) => (
                                        <SwiperSlide><img
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
                        <div>
                            <div className="inline-block align-bottom mr-5">
                                <span className="text-2xl leading-none align-baseline">$</span>
                                <span className="font-bold text-5xl leading-none align-baseline">
                                    {integralPart}
                                </span>
                                <span className="text-2xl leading-none align-baseline">.{fractionalPart}</span>
                            </div>
                            <div className="inline-block align-bottom">
                                <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold flex align-middle justify-center">
                                    <FaShoppingCart className="-ml-2 mr-2" /> <span>BUY NOW</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductViewPage