'use client';
import Image from 'next/image';
import { useState } from 'react';

import SearchIcon from '@/assets/icons/Ic_search.svg';
import X_Icon from '@/assets/icons/Ic_x.svg';
import { CardTitle } from '@/components/common/card-title/CardTitle';
import { cn } from '@/libs/utils/cn';
import { useFilter } from '@/providers/FilterProvider';

import PhotoCardList from '../card/PhotoCardList';
import DefaultDropDown from '../filter/DefaultDropDown';

export function SellPhotoCardModal({ onClose, title, subTitle, modal }) {
  const { searchKeyword, setSearchKeyword } = useFilter();
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setSearchKeyword(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const onCloseBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isExchange = modal === 'exchange'
  const isSell = modal === 'sell';

  return (
    <section
      className="fixed inset-0 bg-black/70 flex items-end justify-center z-10 md:items-center"
      onClick={onCloseBackdrop}
    >
      <div
        className={cn(
          'flex flex-col w-full bg-gray-500 overflow-hidden overflow-y-scroll rounded-[2px]',
          'h-[90%] transition-all duration-300 ease-in-out px-3.75',
          'sm:max-w-screen-md sm:h-[90%] sm:min-h-0 sm:px-5 sm:transform-none sm:opacity-100', // tablet (md: 768px 이상) 애니메이션 적용
          'md:max-w-290 md:py-15 md:px-30', // pc(1280px 이상)
        )}
      >
        {/* tablet/mobile bottom-sheet 구분선 */}
        <div className="flex justify-center md:hidden pt-2 pb-4 mt-3.75">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <header className="py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-300 font-br tracking-[-0.72px] text-sm sm:text-base md:text-2xl">
              {subTitle}
            </h1>
            <button
              className="hidden md:block text-gray-400 hover:text-white text-3xl transition"
              onClick={() => onClose()}
            >
              <Image src={X_Icon} alt="닫기 버튼" />
            </button>
          </div>
        </header>

        <div className="overflow-y-auto space-y-6">
          <CardTitle
            size="L"
            titleMessage={title}
            className="hidden no-underline sm:block font-br font-bold tracking-[-1.38px] text-[1.625rem] sm:text-[2.5rem] md:text-[2.875rem]"
          />
          <h2 className="sm:hidden font-br text-white text-[1.625rem]">{title}</h2>
          <div className="flex gap-2.5 sm:gap-7.5 md:gap-14.5">
            <div className="relative flex">
              <input
                value={keyword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="검색"
                className="px-5 py-2.75 max-w-72.25 h-11.25 border border-gray-200 rounded-[2px] text-gray-200 text-4 font-light"
              />
              <Image
                src={SearchIcon}
                alt="검색"
                width={24}
                height={24}
                className="absolute top-1/2 -translate-y-3 right-[12%]"
              />
            </div>
            <div className="hidden sm:flex items-center">
              <p className="text-gray-200 text-sm font-bold md:text-base">등급</p>
              <DefaultDropDown
                items={['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY']}
                filterKey="grade"
              />
              <p className="text-gray-200 text-sm font-bold md:text-base">장르</p>
              <DefaultDropDown items={['풍경', '인물', '동물']} filterKey="genre" />
            </div>
          </div>
          <PhotoCardList
            isGalleryPage={true}
            isSellModal={isSell}
            isExchangeModal={isExchange}
          />
          <section>
            <div className="flex w-full gap-4 mt-4"></div>
          </section>
        </div>
      </div>
    </section>
  );
}
