'use client';

import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  // 카드명 검색
  const [searchKeyword, setSearchKeyword] = useState('');

  // 선택된 필터
  const [filter, setFilter] = useState({
    grade: [],
    genre: [],
    status: [],
    price: [],
    sale: [],
  });

  // 필터 옵션(UI)
  const filters = {
    grade: [
      { label: 'COMMON', value: 'COMMON' },
      { label: 'RARE', value: 'RARE' },
      { label: 'SUPER RARE', value: 'SUPER_RARE' },
      { label: 'LEGENDARY', value: 'LEGENDARY' },
    ],
    genre: [
      { label: '여행', value: 'TRAVEL' },
      { label: '풍경', value: 'LANDSCAPE' },
      { label: '인물', value: 'PORTRAIT' },
      { label: '사물', value: 'OBJECT' },
    ],
    status: ['판매 중', '판매 완료'],
    price: ['낮은 가격순', '높은 가격순', '최신순'],
    sale: ['판매', '교환 제시'],
  };

  return (
    <FilterContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,

        filter,
        setFilter,
        filters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
