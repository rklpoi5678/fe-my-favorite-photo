'use client';

import { useState } from 'react';
import { useFilter } from '@/providers/FilterProvider';
import Image from 'next/image';
import ic_arrow from '@/assets/icons/Ic_arrow.svg';
import { GENRE_LABEL } from '@/libs/utils/NameLabel';

export default function DefaultDropDown({ items, placeholder, filterKey }) {
  const [open, setOpen] = useState(false);
  const { filter, setFilter } = useFilter();

  const handleSelect = (item) => {
    setOpen(false);

    setFilter((prev) => {
      const current = prev[filterKey]?.[0];

      // 이미 선택된 항목을 다시 클릭하면 필터 해제
      if (current === item) {
        return { ...prev, [filterKey]: [] };
      }

      // 새로운 항목 선택
      return { ...prev, [filterKey]: [item] };
    });
  };

  const selected = filter[filterKey]?.[0] || null;
  const displaySelected = selected
    ? filterKey === 'genre'
      ? GENRE_LABEL[selected] || selected
      : selected.replace(/_/g, ' ')
    : placeholder;

  return (
    <div className="relative inline-flex flex-col items-start gap-[18px] text-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-start gap-[10px] text-gray-200 cursor-pointer md:text-[14px] lg:text-[16px]"
      >
        <span>{displaySelected}</span>
        <Image
          src={ic_arrow}
          alt="드롭다운"
          width={24}
          height={24}
          className={`${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul className="absolute top-full mt-[18px] left-0 z-99 flex flex-col items-start gap-[15px] px-[20px] py-[15px] border-[1px] border-gray-200 bg-black rounded-[2px] font-normal cursor-pointer whitespace-nowrap md:text-[14px] lg:text-[16px]">
          {items.map((item) => (
            <li key={item} onClick={() => handleSelect(item)}>
              {filterKey === 'genre' ? GENRE_LABEL[item] || item : item.replace(/_/g, ' ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
