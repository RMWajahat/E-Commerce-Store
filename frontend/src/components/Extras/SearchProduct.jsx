import React from 'react';

const SearchProduct = ({ keyword, setKeyword }) => {

    return (
        <div className="flex items-center justify-center py-4 w-full ">
            <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl cursor-pointer" title='Product Search'>
                <div className="max-w-md mx-auto space-y-2">
                    {/* Component starts here */}
                    <div className="flex flex-row flex-nowrap items-center">
                        <input value={keyword} onChange={(e) => {
                            setKeyword(e.target.value);
                        }} className="flex-none w-full block  px-4 py-2.5 text-xs leading-none font-medium uppercase bg-slate-200 text-black outline-none" placeholder='Search product ...' />
                        {/* <button className="flex gap-1 bg-black hover:bg-slate-900 text-white px-4 py-2.5 text-xs leading-none font-medium uppercase text-nowrap" >Live Search</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchProduct
