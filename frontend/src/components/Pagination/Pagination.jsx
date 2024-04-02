import React, { useEffect, useState } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const Pagination = ({ resultperPage, productCount, setCurrentPage, currentPage }) => {
    const totalpages = Math.ceil(productCount / resultperPage);
    return (
        <>
            {
                totalpages > 1 ?
                    <>
                        <div className="flex items-center justify-between bg-slate-200 shadow-lg w-96 m-auto rounded-full my-5 overflow-hidden">

                            <button
                                className={`flex flex-nowrap items-center  px-8 py-2 text-white ${currentPage === 1 ? 'bg-gray-400 cursor-default' : 'bg-slate-900'}`}
                                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <GrFormPreviousLink className='text-lg' /> Prev
                            </button>

                            <span className='flex items-center justify-center gap-2 text-slate-950'>{currentPage} <span>...</span><span className='font-bold text-slate-600'>{totalpages}</span></span>
                            <button
                                className={`flex flex-nowrap items-center px-8 py-2 text-white ${currentPage === totalpages ? 'bg-gray-400 cursor-default' : 'bg-slate-900'}`}
                                onClick={() => currentPage < totalpages && setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalpages}
                            >
                                Next <GrFormNextLink className='text-lg' />
                            </button>
                        </div>
                    </> : null
            }
        </>

    )
}

export default Pagination
