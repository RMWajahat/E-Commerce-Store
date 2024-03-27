import React, { useEffect, useState } from 'react'
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Store/Product Reducers/productSlice';

const ProductsList = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.products);
    console.log("getting data from state", productList);
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    return (
        <div tabIndex={0} className="focus:outline-none w-11/12 m-auto">
            <div className="mx-auto container">
                <div className="flex flex-wrap items-center lg:justify-between justify-center">

                    {/* {
                        productList.products.map((_, key) => (
                            <Product key={key} producttitle="MENS'S RAGGED
                            WATERPROOF JACKET" productimg={["https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp"]} rating="4" price="125" id={key} ratingsby={32} />
                        ))
                    } */}

                </div>
            </div>
        </div>

    )
}

export default ProductsList
