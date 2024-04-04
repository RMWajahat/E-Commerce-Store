import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../Store/Product Reducers/productSlice';


const RatingsSelector = () => {
    const [ratings, setRatings] = useState(Number(localStorage.getItem('ratings')) || 5);
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.setItem('ratings', ratings);
        dispatch(getProducts({ ratings }));
    }, [dispatch, ratings]);
    return (
        <div className='space-y-4 w-72 m-auto flex flex-col gap-0'>
            <label htmlFor="upper" className="block text-sm font-medium text-gray-700">Ratings</label>
            <input
                id="ratings_selector"
                type="range"
                min="1"
                max="5"
                value={ratings}
                onChange={event => setRatings(Number(event.target.value))}
                className="slider yellow mt-1 block w-full h-1 rounded-full"
            />
            <p className='text-nowrap flex items-center'><svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>{ratings}</p>
        </div>
    )
}

export default RatingsSelector
