import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {
    return (
        <>
            <Link to={`/cart/${props.id}`}>
                <div className="max-w-md mx-auto my-2">
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
                                {Array(Number(props.rating)).fill().map((_, index) => (
                                    <svg
                                        key={index}
                                        className="w-5 h-5 text-yellow-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}

                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                                    {props.ratingsby}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                    ${props.price}
                                </span>
                                <Link
                                    to={`/cart/${props.id}`}
                                    className="text-slate-100 bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-100 dark:focus:ring-slate-900"
                                >
                                    Add to cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default Product
