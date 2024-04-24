import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { StarRating } from "star-ratings-react";
import { MdOutlineCallMade } from "react-icons/md";

const Product = (props) => {
    return (
        <>
            <Link to={`/products/${props.id}`}>
                <div className="max-w-72 mx-auto my-2">
                    <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 p-3 sm:ml-2">

                        <img
                            className="rounded-t-lg p-4 h-64 aspect-square m-auto"
                            src={props.productimg}
                            alt="product image"
                        />
                        <div className="px-3 pb-3">
                            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                                {props.producttitle.length > 22 ? `${props.producttitle.substring(0, 22)}...` : props.producttitle}
                            </h3>
                            <div className="flex items-center mt-2.5 mb-5">
                                <StarRating rating={props.rating} size={20} maxRating={5} textColor={"white"} edit={false} />

                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                                    {props.ratingsby}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white ">
                                    ${props.price}
                                </span>
                                <MdOutlineCallMade className='text-3xl bg-slate-300 p-1 rounded-full hover:bg-slate-50 transition-colors duration-1000' />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default Product
