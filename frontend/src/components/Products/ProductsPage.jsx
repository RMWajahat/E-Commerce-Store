import React, { useEffect, useState } from 'react'
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Store/Product Reducers/productSlice';
import Loader from '../Extras/Loader';
import SectionHeading from '../Extras/SectionHeading';
import SearchProduct from '../Extras/SearchProduct';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const AllProducts = useSelector((state) => state.product.products);
    const [products, setProducts] = useState(AllProducts);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        dispatch(getProducts(keyword));
    }, [keyword, dispatch]);

    useEffect(() => {
        setProducts(AllProducts);
    }, [AllProducts]);

    return (
        <>
            <SectionHeading heading={"Products"} />
            <SearchProduct keyword={keyword} setKeyword={setKeyword} />
            <div tabIndex={0} className="focus:outline-none w-11/12 m-auto">
                <div className="mx-auto container">
                    <div className="flex flex-wrap items-center lg:justify-between justify-center">

                        {
                            products && products[0] !== undefined ? products.map((product) => (
                                <Product key={product._id} producttitle={product.name} productimg={product.productImages[0].url} rating={product.ratings} price={product.price} id={product._id} ratingsby={product.numberOfReviews} />
                            )) : <div className='w-2/4 m-auto h-36 text-center'>
                                <h1 >Product Match not Found  ☹ </h1>
                            </div>
                        }

                    </div>

                </div>
            </div>
        </>

    )
}

export default ProductsPage;