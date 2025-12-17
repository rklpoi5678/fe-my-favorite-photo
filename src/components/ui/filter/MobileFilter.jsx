'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import ic_close from '@/assets/icons/Ic_close.svg';
import ic_mobileFilter from '@/assets/icons/Ic_mobileFilter.svg';
import ic_exchange from '@/assets/icons/Ic_recycle.svg';
import { useFetchMarketCards } from '@/libs/hooks/useFetchMarketCard';
import { useFetchSaleCards } from '@/libs/hooks/useFetchSaleCards';
import { useFetchUserCards } from '@/libs/hooks/userFetchUserCards';
import { GENRE_LABEL } from '@/libs/utils/NameLabel';
import { useFilter } from '@/providers/FilterProvider';

import GradeLabel from '../label/GradeLabel';

const MENU_LABELS = {
  grade: '등급',
  genre: '장르',
  status: '매진 여부',
  sale: '거래 방식',
};

export default function MobileFilter({ items, size, isGallery = false, isSellingPage = false }) {
  const { filter, setFilter, searchKeyword } = useFilter();
  const { marketCards, isMarketCardSoldOut } = useFetchMarketCards();
  const { myCards, isUserCardSoldOut } = useFetchUserCards();
  const { myLocalSellingCards, isCardSoldOut } = useFetchSaleCards();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('grade');

  // 페이지 바뀌면 필터 리셋
  useEffect(() => {
    setFilter({
      grade: [],
      genre: [],
      status: [],
      sale: [],
    });
  }, [isGallery, isSellingPage]);

  // 화면 표시용 (c.grade 또는 c.photoCard.grade)
  let cardsRenderingType;

  if (isGallery) {
    cardsRenderingType = myCards;
  } else if (isSellingPage) {
    cardsRenderingType = myLocalSellingCards;
  } else {
    cardsRenderingType = marketCards;
  }

  // count 계산용
  const countSource = isGallery ? myCards : isSellingPage ? myLocalSellingCards : marketCards;

  const dataStatus = isGallery
    ? isUserCardSoldOut
    : isSellingPage
      ? isCardSoldOut
      : isMarketCardSoldOut;

  // 카테고리 메뉴
  const menus = Object.keys(items).map((key) => ({
    key,
    label: MENU_LABELS[key] || key,
  }));

  const dynamicFilters = (() => {
    const counts = {};

    Object.keys(items).forEach((key) => {
      counts[key] = items[key].map((label) => {
        let count = 0;

        count = countSource.filter((c) => {
          // 판매 여부
          if (key === 'status') {
            return (dataStatus(c) ? '판매 완료' : '판매 중') === label;
          }

          // 거래 방식 -> 변경 예정(saleOptions)
          if (key === 'sale') {
            const SALE_STATUS_MAP = {
              판매: 'ON_SALE',
              교환: 'TRADING',
            };

            return c.status === SALE_STATUS_MAP[label];
          }

          // gallery / selling = userCard 데이터 → photoCard.grade
          // const target = isGallery || isSellingPage ? c.photoCard : c;
          const target = isGallery
            ? c.photoCard
            : isSellingPage
              ? c.photoCard
              : c.userCard?.photoCard;

          return target[key] === label;
        }).length;

        return { label, count };
      });
    });

    return counts;
  })();

  // 필터 선택
  const handleSelect = (label) => {
    const current = filter[category];
    const isSelected = current.includes(label);
    setFilter((prev) => ({
      ...prev,
      [category]: isSelected ? current.filter((v) => v !== label) : [...current, label],
    }));
  };

  // 필터 초기화
  const resetCategoryFilter = () => {
    setFilter((prev) => ({ ...prev, [category]: [] }));
  };

  // 선택된 필터 기준 포토카드 개수 계산
  const getPhotoCount = () => {
    const selected = filter[category];
    const list = dynamicFilters[category];
    if (!selected || selected.length === 0) return list.reduce((acc, cur) => acc + cur.count, 0);
    return list.filter((i) => selected.includes(i.label)).reduce((acc, cur) => acc + cur.count, 0);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setOpen(!open)}
        className={`flex justify-center items-center ${Number(size) === 45 ? 'p-[15px]' : 'p-[7px]'} w-[${size}px] h-[${size}px] border border-gray-200 rounded-[2px] bg-black cursor-pointer`}
      >
        <Image src={ic_mobileFilter} alt="필터 아이콘" width={20} height={20} />
      </button>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/60 z-40" />}

      <div
        className={`h-[480px] text-white bg-[#1B1B1B] fixed bottom-0 left-0 right-0 z-50 rounded-t-[16px] transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="relative flex justify-center px-[10px] py-[16px] text-gray-400">
          <span className="text-4 font-medium">필터</span>
          <button onClick={() => setOpen(!open)} className="absolute top-[16px] right-[15px]">
            <Image src={ic_close} alt="닫기" width={24} height={24} />
          </button>
        </div>

        <div className="flex items-start gap-6 mx-[24px]">
          {menus.map((menu) => (
            <button
              key={menu.key}
              onClick={() => setCategory(menu.key)}
              className={`p-4 text-[14px] font-medium cursor-pointer ${category === menu.key ? 'text-white border-b-[1.5px] border-white' : 'text-gray-400'}`}
            >
              {menu.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col mt-[19px]">
          {dynamicFilters[category].map((item) => {
            const isSelected = filter[category].includes(item.label);

            const displayLabel =
              category === 'grade'
                ? item.label.replace('_', ' ')
                : category === 'genre'
                  ? GENRE_LABEL[item.label] || item.label
                  : item.label;
            const rawLabel = item.label;

            return (
              <div
                key={item.label}
                onClick={() => handleSelect(item.label)}
                className={`flex justify-between px-8 py-4 cursor-pointer ${isSelected ? 'bg-gray-500' : ''
                  }`}
              >
                <span>
                  {category === 'grade' ? <GradeLabel grade={rawLabel} size /> : displayLabel}
                </span>
                <span>{item.count}개</span>
              </div>
            );
          })}

          <div className="absolute bottom-[40px] left-0 w-full flex justify-between gap-2 px-[15px]">
            <button onClick={resetCategoryFilter} className="m-[15px] cursor-pointer">
              <Image src={ic_exchange} alt="새로고침" width={24} height={24} />
            </button>
            <button
              className="w-full py-[17px] bg-main rounded-[20x] text-black text-center text-4 font-bold cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {getPhotoCount()}개 포토보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
