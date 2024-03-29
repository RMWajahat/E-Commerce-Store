import React, { useEffect } from 'react'
import { FaShoppingCart } from "react-icons/fa";

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../Store/Product Reducers/productSlice';

const ProductViewPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.products);
    console.log(product);

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    const integralPart = Math.floor(product.price);
    const fractionalPart = (product.price - integralPart).toFixed(2).slice(2);

    return (
        <div className="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
            <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                <div className="md:flex items-center -mx-10">
                    <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <img
                                src={product.productImages && product.productImages[0]}
                                className="w-full relative z-10"
                                alt=""
                            />
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