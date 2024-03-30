import React, { useEffect, useState } from 'react'
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Store/Product Reducers/productSlice';
import Loader from '../Extras/Loader';

const ProductsList = () => {
    const dispatch = useDispatch();
    const AllProducts = useSelector((state) => state.product.products);
    const [products, setProducts] = useState(AllProducts);

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        setProducts(AllProducts);
    }, [AllProducts]);

    return (
        <div tabIndex={0} className="focus:outline-none w-11/12 m-auto">
            <div className="mx-auto container">
                <div className="flex flex-wrap items-center lg:justify-between justify-center">

                    {
                        products ? products.map((product, key) => (
                            <Product key={product._id} producttitle={product.name} productimg={product.productImages[0].url} rating={product.ratings} price={product.price} id={product._id} ratingsby={product.numberOfReviews} />
                        )) : <Loader />
                    }

                </div>

            </div>
        </div>

    )
}

export default ProductsList