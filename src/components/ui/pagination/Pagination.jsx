'use client';

import { cn } from '@/libs/utils/cn';

const MAX_VISIBLE = 10;

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const half = Math.floor(MAX_VISIBLE / 2);

  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, startPage + MAX_VISIBLE - 1);

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_VISIBLE + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-center items-center mt-11 mb-32.5 gap-1">
      <button
        className="flex items-center justify-center w-10 h-10border border-gray-200 text-gray-500 cursor-pointer rounded-4xl transition-all hover:border-primary-100 active:bg-primary-100"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-0.000782197 4.2L4.19922 0L4.19922 8.4L-0.000782197 4.2Z" fill="#5A5A5A" />
        </svg>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={cn(
            'flex items-center justify-center w-10 h-10 border text-white font-bold cursor-pointer rounded-[2px] hover:bg-gray-500/80 active:bg-gray-500/30 ',
            page === currentPage ? 'bg-black text-white border border-gray-200' : 'border-none',
          )}
        >
          {page}
        </button>
      ))}

      <button
        className="flex items-center justify-center w-10 h-10 cursor-pointer"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.2 4.19844L0 8.39844L-3.67176e-07 -0.00156212L4.2 4.19844Z" fill="white" />
        </svg>
      </button>
    </div>
  );
}
