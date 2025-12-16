'use client';

import { useState } from 'react';
import { useFilter } from '@/providers/FilterProvider';
import Image from 'next/image';
import ic_arrow from '@/assets/icons/Ic_arrow.svg';

export default function BoxDropDown({ items, filterKey }) {
  const [open, setOpen] = useState(false);
  const { filter, setFilter } = useFilter();

  // 항목 선택 (단일 선택)
  const handleSelect = (item) => {
    setOpen(false);
    setFilter((prev) => ({
      ...prev,
      [filterKey]: item,
    }));
  };

  // 현재 선택된 값
  const selected = filter[filterKey] || '낮은 가격순';

  return (
    <div className="relative inline-flex flex-col gap-[5px] text-white font-normal sm:w-[130px] sm:text-[12px] md:w-[140px] md:text-[14px] lg:w-[180px] lg:text-[16px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border-[1px] cursor-pointer sm:h-[35px] sm:px-[15px] sm:py-[5px] md:h-[45px] md:px-[15px] md:py-[10px] lg:h-[50px] lg:px-[20px] lg:py-[13px]"
      >
        <span>{selected}</span>
        <Image
          src={ic_arrow}
          alt="드롭다운"
          width={24}
          height={24}
          className={`${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul className="absolute top-full mt-[5px] z-99 w-full flex flex-col justify-center items-start gap-[15px] px-[20px] py-[15px] border-[1px] border-gray-200 bg-black rounded-[2px] text-4 font-normal cursor-pointer">
          {items.map((item) => (
            <li key={item} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
