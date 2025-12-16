'use client';

import GradeBox from '@/components/ui/label/GradeBox';
import { useFetchSaleCards } from '@/libs/hooks/useFetchSaleCards';
import { useFetchUserCards } from '@/libs/hooks/userFetchUserCards';

export default function CardGradeStatus({ isSellingPage }) {
  const { myCards } = useFetchUserCards();
  const { myLocalSellingCards } = useFetchSaleCards();

  const data = isSellingPage ? myLocalSellingCards : myCards;

  const gradeCount = {
    COMMON: 0,
    RARE: 0,
    SUPER_RARE: 0,
    LEGENDARY: 0,
  };

  // 등급별 남은 카드 수 합산
  // data.forEach((card) => {
  //   if (card.totalQuantity && gradeCount[card.photoCard.grade] !== undefined) {
  //     gradeCount[card.photoCard.grade] += card.totalQuantity;
  //   }
  // });

  data.forEach((card) => {
    const remainQuantity = isSellingPage
      ? (card.photoCard?.totalQuantity ?? 0) - (card.totalQuantity ?? 0)
      : (card.totalQuantity ?? 0);

    gradeCount[card.photoCard.grade] += remainQuantity;
  });

  // 전체 수량
  const totalRemain = Object.values(gradeCount).reduce((sum, val) => sum + val, 0);

  // 로그인 유저 닉네임 - data가 배열이기 때문에 첫 번째 카드에서 닉네임 가져오기
  const nickname = data[0]?.user?.nickname || [];

  return (
    <div className="w-full mx-auto flex flex-col sm:max-w-[345px] sm:mt-[20px] md:max-w-[704px] md:mt-[40px] lg:max-w-[1480px] lg:mt-[40px]">
      <div className="flex items-center gap-[10px] mb-[20px]">
        <span className="text-gray-200 sm:text-[14px] md:text-[20px] lg:text-[24px] font-bold">
          {nickname}님이 보유한 포토카드
        </span>
        <span className="text-gray-300 text-right sm:text-[12px] lg:text-[18px] lg:text-[20px] font-normal">
          ({totalRemain}장)
        </span>
      </div>
      <div className="flex sm:gap-[10px] md:gap-[10px] lg:gap-[20px]">
        <GradeBox grade="COMMON" count={gradeCount.COMMON} />
        <GradeBox grade="RARE" count={gradeCount.RARE} />
        <GradeBox grade="SUPER_RARE" count={gradeCount.SUPER_RARE} />
        <GradeBox grade="LEGENDARY" count={gradeCount.LEGENDARY} />
      </div>

      <div className="border-b border-gray-400 sm:my-[15px] md:mt-[40px] md:mb-[20px] lg:mt-[40px] lg:mb-[20px]" />
    </div>
  );
}
