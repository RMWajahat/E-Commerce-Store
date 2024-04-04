import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../Store/Product Reducers/productSlice';

const CategorySelector = () => {
    const categories = ['Fruits', 'Fashion', 'Books', 'Cars', 'Sports', 'Toys'];
    const [selectedCategory, setSelectedCategory] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts({ category: selectedCategory }));

    }, [selectedCategory]);

    return (
        <select
            value={selectedCategory}
            onChange={(e) => {
                setSelectedCategory(e.target.value)
            }
            }
            className={`cursor-pointer w-72 mx-auto mt-10 shadow-lg h-fit block outline-none border-none appearance-none bg-slate-800 border text-slate-100 py-3 px-4 pr-8 rounded leading-tight focus:outline-none `}
            id="grid-state"
        >
            <option className='bg-slate-700 text-slate-100' value=''>Select a category...</option>
            {
                categories.map((category, index) => (
                    <option className='bg-slate-700 text-slate-100' key={index} value={category}>{category}</option>
                ))
            }
        </select >
    );
};

export default CategorySelector;