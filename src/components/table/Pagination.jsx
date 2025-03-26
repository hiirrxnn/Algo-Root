import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Logic to determine which page numbers to display
  let startPage, endPage;
  if (totalPages <= 5) {
    // Less than 5 total pages, show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // More than 5 total pages, calculate start and end pages
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }
  
  // Generate page numbers to display
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  // Return if no pages
  if (totalPages === 0) return null;
  
  return (
    <div className="flex items-center justify-between border-t border-secondary-200 px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-secondary-700">
            Showing 
            <span className="font-medium mx-1">
              {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>
            to
            <span className="font-medium mx-1">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>
            of
            <span className="font-medium mx-1">{totalItems}</span>
            results
          </p>
        </div>
        
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Previous button */}
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-sm ${
                currentPage === 1
                  ? 'text-secondary-300 cursor-not-allowed'
                  : 'text-secondary-500 hover:bg-secondary-50'
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
            
            {/* Page numbers */}
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative inline-flex items-center px-4 py-2 text-sm ${
                  currentPage === number
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600 focus:z-20'
                    : 'text-secondary-500 hover:bg-secondary-50 focus:z-20'
                }`}
              >
                {number}
              </button>
            ))}
            
            {/* Next button */}
            <button
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-sm ${
                currentPage === totalPages
                  ? 'text-secondary-300 cursor-not-allowed'
                  : 'text-secondary-500 hover:bg-secondary-50'
              }`}
            >
              <span className="sr-only">Next</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Mobile pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm ${
            currentPage === 1
              ? 'text-secondary-300 cursor-not-allowed'
              : 'text-secondary-700 bg-white hover:bg-secondary-50'
          }`}
        >
          Previous
        </button>
        <p className="text-sm text-secondary-700 self-center">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm ${
            currentPage === totalPages
              ? 'text-secondary-300 cursor-not-allowed'
              : 'text-secondary-700 bg-white hover:bg-secondary-50'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;