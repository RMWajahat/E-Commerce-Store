import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Hero from '../src/components/Hero Section/Hero';
import ProductViewPage from '../src/components/Products/ProductViewPage';
import ErrorPage from '../src/components/Extras/ErrorPage';
import ProductsPage from '../src/components/Products/ProductsPage';
import About from '../src/components/About Us Page/About';
import Contact from '../src/components/Contact Us Page/Contact';
const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route exact path="/home" element={<Hero />} />
                <Route path="/products/:id" element={<ProductViewPage />} />
                <Route exact path="/products" element={<ProductsPage />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    )
}

export default AllRoutes