import React from 'react'
import Shopping from '../../assets/shopping.svg';
import PageTitle from '../Extras/PageTitle';

const About = () => {
    return (
        <>
            <PageTitle pagetitle={"GNES - About Us"} />

            <div className="py-16 bg-white">
                <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-1/3">
                            <img
                                src={Shopping}
                                alt="image"
                                loading="lazy"
                                className='object-contain  w-full h-full'
                            />
                        </div>
                        <div className="md:7/12 lg:w-6/12">
                            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                                Empowering Ecommerce: GNES Driven by Passionate Development
                            </h2>
                            <p className="sm:mt-6 text-gray-600 text-justify">
                                Welcome to GNES, where every click opens a world of possibilities! We're not just an ecommerce store; we're a gateway to your dreams, a hub of inspiration, and a platform that believes in the power of your choices. Our mission is simple: to bring you the best products, the latest trends, and the most innovative solutions, all at your fingertips.
                            </p>

                            <p className="sm:mt-4 text-gray-600 text-justify">
                                At GNES, we're more than just a shopping destination. We're a community of like-minded individuals who believe in the beauty of individuality and the joy of self-expression. Whether you're looking for the perfect outfit to express your unique style or the latest gadget to enhance your life, we've got you covered.
                            </p>

                            <p className="sm:mt-8 text-gray-600">
                                But GNES is more than just products. We're a lifestyle, a mindset, a way of life. We believe in living boldly, dreaming big, and embracing every moment with passion and purpose. Join us on this journey of discovery, exploration, and endless possibilities. Welcome to GNES, where your dreams come to life!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default About
