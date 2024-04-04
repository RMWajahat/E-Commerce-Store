import React from 'react';
import MultiRangeSlider from './RangeSelector';
import CategorySelector from './CategorySelector';
import RatingsSelector from './RatingsSelector';

const Filters = () => {
    return (
        <div className='flex flex-col md:flex-row w-fit m-auto gap-1 md:gap-10  justify-start bg-white shadow-2xl rounded-lg py-3 px-6'>
            <MultiRangeSlider />
            <div className="rightsideselectors flex flex-col gap-2 w-auto">
                <CategorySelector />
                <RatingsSelector />
            </div>
        </div>
    )
}

export default Filters
