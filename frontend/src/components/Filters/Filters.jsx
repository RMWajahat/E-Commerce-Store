import React from 'react';
import MultiRangeSlider from '../Filters/RangeSelector';
import CategorySelector from '../Filters/CategorySelector';

const Filters = () => {
    return (
        <div className='flex w-3/4 m-auto gap-10  justify-start bg-white shadow-2xl rounded-lg py-3 px-5'>
            <MultiRangeSlider />
            <CategorySelector />
        </div>
    )
}

export default Filters
