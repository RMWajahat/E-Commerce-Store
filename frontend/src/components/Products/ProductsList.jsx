import React, { useEffect, useState } from 'react'
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Store/Product Reducers/productSlice';
import Loader from '../Extras/Loader';
import Pagination from '../Pagination/Pagination';

const ProductsList = () => {
    const dispatch = useDispatch();
    const { products, resultperPage, productCount } = useSelector((state) => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const [Allproducts, setAllproducts] = useState(products);

    useEffect(() => {
        dispatch(getProducts({ keyword: '', page: currentPage, category: '', ratings: 5 }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        setAllproducts(products);
    }, [products]);

    return (
        <div tabIndex={0} className="focus:outline-none w-11/12 m-auto">
            <div className="mx-auto container">
                <div className="flex flex-wrap items-center lg:justify-between justify-center">

                    {
                        Allproducts ? Allproducts.map((product, key) => (
                            <Product key={key} producttitle={product.name} productimg={product.productImages[0].url} rating={product.ratings} price={product.price} id={product._id} ratingsby={product.numberOfReviews} />
                        )) : <Loader />
                    }

                </div>
                <Pagination resultperPage={resultperPage} productCount={productCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            </div>
        </div>

    )
}

export default ProductsList