'use client';

import Image from 'next/image';
import ic_search from '@/assets/icons/Ic_search.svg';
import { useFilter } from '@/providers/FilterProvider';
import { useEffect } from 'react';

export default function SearchBar({ isGallery = false, isSellingPage = false }) {
  const { searchKeyword, setSearchKeyword } = useFilter();

  // 페이지 바뀌면 필터 리셋
  useEffect(() => {
    setSearchKeyword('');
  }, [isGallery, isSellingPage]);

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        value={searchKeyword}
        onChange={handleChange}
        placeholder="검색"
        className="lg:w-[320px] lg:h-[50px] lg:px-[24px] md:w-[180px] md:h-[23px] sm:w-full sm:h-[23px] px-[15px] py-[22px] border border-gray-200 rounded-[2px] text-gray-200 text-4 font-light"
      />
      <Image
        src={ic_search}
        alt="검색"
        width={24}
        height={24}
        className="absolute top-[11px] right-[20px]"
      />
    </div>
  );
}
