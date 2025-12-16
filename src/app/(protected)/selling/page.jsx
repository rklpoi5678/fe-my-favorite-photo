'use client';

import { CardTitle } from '@/components/common/card-title/CardTitle';
import PhotoCardList from '@/components/ui/card/PhotoCardList';
import CardGradeStatus from '@/components/ui/label/CardGradeStatus';

import SellingFilter from './_components/SellingFilter';

export default function MySelling() {
  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <div className="hidden md:w-full md:block md:mt-[60px] lg-w-full lg:block lg:mt-[60px]">
        {/* lg일 때 */}
        <div className="font-normal font-br hidden lg:block lg:text-[62px]">
          <CardTitle size="L" titleMessage="나의 판매 포토카드" className="w-full mx-auto" />
        </div>

        {/* md일 때 */}
        <div className="font-normal font-br hidden md:block md:text-[48px] lg:hidden">
          <CardTitle size="M" titleMessage="나의 판매 포토카드" className="w-full mx-auto" />
        </div>
      </div>
      <CardGradeStatus isSellingPage={true} />
      <SellingFilter />

      <PhotoCardList type="hideTotal" showSaleLabel={true} isSellingPage={true} />
    </div>
  );
}
