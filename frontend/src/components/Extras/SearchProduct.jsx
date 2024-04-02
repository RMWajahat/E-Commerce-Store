import React from 'react';
import { IoFilterSharp } from "react-icons/io5";

const SearchProduct = ({ keyword, setKeyword, setShowFilter, filters }) => {

    return (
        <div className="flex items-center justify-center py-4 w-full ">
            <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl cursor-pointer" >
                <div className="max-w-md mx-auto space-y-2">
                    {/* Component starts here */}
                    <div className="flex flex-row flex-nowrap items-center gap-1" >
                        <input value={keyword} onChange={(e) => {
                            setKeyword(e.target.value);
                        }} className="flex w-full px-4 py-2.5 text-xs leading-none font-medium uppercase bg-slate-200 text-black outline-none" placeholder='Search product ...' title='Product Search' />
                        <button className="flex gap-1 bg-black hover:bg-slate-900 text-white p-3 text-xs leading-none font-medium uppercase text-nowrap rounded-sm"
                            onClick={() => {
                                setShowFilter(!filters);
                            }} title='Filters'><IoFilterSharp /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchProduct
