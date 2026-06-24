import React from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';


const Pagination = ({
  currentPage,
  onPageChange,
  nextPageText = <ChevronRight size ={20} />,
  prevPageText = <ChevronLeft size ={20} />,
  firstPageText = <ChevronsLeft size ={20} />,
  lastPageText = <ChevronsRight size ={20} />,
}

) => {
    const { totalPages ,products} = useSelector((state) => state.product);
    if(!products || products.length === 0 || totalPages <= 1) return null;
    const getPageNumbers = () => {
        const pageNumbers = [];
        const pageWindow = 1; // Number of pages to show on either side of the current page
        for (let i = Math.max(1, currentPage - pageWindow); i <= Math.min(totalPages, currentPage + pageWindow); i++) {
          pageNumbers.push(i);
        }
        return pageNumbers;
      };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
        <div className ="flex items-center justify-center gap-1">
          {/* First and Previous Buttons */}
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(1)}
              className="px-2 py-1 mx-1 rounded bg-white cursor-pointer text-gray-700 disabled:opacity-50 disabled:hover:scale-100"
              title= "First Page"
            >
              {firstPageText}
            </button>
            <button
              disabled={currentPage === 1}
              onClick={() =>  onPageChange(currentPage - 1)}
              className="px-2 py-1 mx-1 rounded bg-white cursor-pointer text-gray-700 disabled:opacity-50 disabled:hover:scale-100"
            >
              {prevPageText}
            </button>
          </div>
          {/* Page Numbers */}
          <div>
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`px-2 py-1 mx-1 cursor-pointer rounded ${currentPage === pageNumber ? 'bg-[#97b03a] text-white' : 'bg-white text-gray-700'}`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          {/* next and last buttons */}
          <div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="px-2 py-1 mx-1 rounded bg-white cursor-pointer text-gray-700 disabled:opacity-50 disabled:hover:scale-100"
            >
              {nextPageText}
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(totalPages)}
              className="px-2 py-1 mx-1 rounded bg-white cursor-pointer text-gray-700 disabled:opacity-50 disabled:hover:scale-100"
            >
              {lastPageText}
            </button>
          </div>
         
        </div>
         <p className="text-sm text-gray-600 " >Page {currentPage} of {totalPages}</p>
    </div>
  )
}

export default Pagination