import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Hero from '../src/components/Hero Section/Hero';
import ProductViewPage from '../src/components/Products/ProductViewPage';
import ErrorPage from '../src/components/Extras/ErrorPage';
import ProductsPage from '../src/components/Products/ProductsPage';
const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/home" element={<Hero />} />
                <Route path="/products/:id" element={<ProductViewPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    )
}

export default AllRoutes