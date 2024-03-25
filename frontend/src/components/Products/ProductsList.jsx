import React from 'react'
import Product from './Product'

const ProductsList = () => {
    return (
        <div tabIndex={0} className="focus:outline-none w-11/12 m-auto">
            <div className="mx-auto container">
                <div className="flex flex-wrap items-center lg:justify-between justify-center">

                    {
                        Array(5).fill().map((_, key) => (
                            <Product producttitle="MENS'S RAGGED
                            WATERPROOF JACKET" productimg={["https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp"]} rating="4" price="125" id={key} ratingsby={32} />
                        ))
                    }

                </div>
            </div>
        </div>

    )
}

export default ProductsList
