import React, { useEffect, useState } from 'react'
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Store/Product Reducers/productSlice';
import SectionHeading from '../Extras/SectionHeading';
import SearchProduct from '../Extras/SearchProduct';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';

import Nodata from '../../assets/nodata.svg';
import PageTitle from '../Extras/PageTitle';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { products, resultperPage, productCount } = useSelector((state) => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const [Allproducts, setAllproducts] = useState(products);
    const [keyword, setKeyword] = useState('');
    const [filters, setShowFilter] = useState(false);

    useEffect(() => {
        dispatch(getProducts({ keyword: keyword, page: currentPage, category: '', ratings: 1 }));
    }, [dispatch, currentPage, keyword]);

    useEffect(() => {
        setAllproducts(products);
    }, [products]);

    return (
        <>
            <PageTitle pagetitle={"GNES - Products"} />
            <SectionHeading heading={"Products"} />
            <SearchProduct keyword={keyword} setKeyword={setKeyword} setShowFilter={setShowFilter} filters={filters} />
            {
                filters && <Filters />
            }
            <div tabIndex={0} className="focus:outline-none w-11/12 m-auto">
                <div className="mx-auto container">
                    <div className="flex flex-wrap items-center lg:justify-between justify-center">

                        {
                            Allproducts && Allproducts[0] !== undefined ? Allproducts.map((product) => (
                                <Product key={product._id} producttitle={product.name} productimg={product.productImages[0].url} rating={product.ratings} price={product.price} id={product._id} ratingsby={product.numberOfReviews} />
                            )) : <div className='w-2/4 m-auto h-fit text-center p-9'>
                                <img src={Nodata} alt="no data found" className='h-56 aspect-square m-auto filter drop-shadow-lg' />
                                Search not found
                            </div>
                        }

                    </div>
                    <Pagination keyword={keyword} resultperPage={resultperPage} productCount={productCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                </div>
            </div>
        </>

    )
}

export default ProductsPage;