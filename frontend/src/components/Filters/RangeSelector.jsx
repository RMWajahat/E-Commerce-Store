import React, { useEffect, useState } from 'react';
import './MultiRangeSlider.css';
import { getProducts } from '../../Store/Product Reducers/productSlice';
import { useDispatch } from 'react-redux';

const MultiRangeSlider = () => {
    const [lowerValue, setLowerValue] = useState(0);
    const [upperValue, setUpperValue] = useState(10000);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts({ loweramount: lowerValue, highamount: upperValue }));
    }, [lowerValue, upperValue, dispatch])

    return (
        <div className="space-y-4 w-72 m-auto">
            <div>
                <label htmlFor="lower" className="block text-sm font-medium text-gray-700">Lower value</label>
                <input
                    id="lower"
                    type="range"
                    min="0"
                    max={upperValue}
                    value={lowerValue}
                    onChange={event => setLowerValue(event.target.value)}
                    className="slider mt-1 block w-full h-1 rounded-full"
                />
                <p>${lowerValue}</p>
            </div>
            <div>
                <label htmlFor="upper" className="block text-sm font-medium text-gray-700">Upper value</label>
                <input
                    id="upper"
                    type="range"
                    min={lowerValue}
                    max="10000"
                    value={upperValue}
                    onChange={event => setUpperValue(event.target.value)}
                    className="slider mt-1 block w-full h-1 rounded-full"
                />
                <p>${upperValue}</p>
            </div>
        </div>
    );
};

export default MultiRangeSlider;