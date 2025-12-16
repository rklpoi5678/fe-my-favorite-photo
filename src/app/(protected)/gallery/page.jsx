import Link from 'next/link';

import { CardTitle } from '@/components/common/card-title/CardTitle';
import { Button } from '@/components/ui/button/Button';
import PhotoCardList from '@/components/ui/card/PhotoCardList';
import CardGradeStatus from '@/components/ui/label/CardGradeStatus';

import GalleryFilter from './_components/GalleryFilter';

export default function MyGalleryPage() {
  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <div className="hidden md:w-full md:block md:mt-[60px] lg-w-full lg:block lg:mt-[60px]">
        {/* lg일 때 */}
        <div className="font-normal font-br hidden lg:block lg:text-[62px]">
          <CardTitle
            size="L"
            titleMessage="마이갤러리"
            buttonSize="L"
            buttonMessage="포토카드 생성하기"
            className="w-full mx-auto"
            LinkUrl="/gallery/create"
          />
        </div>

        {/* md일 때 */}
        <div className="font-normal font-br hidden md:block md:text-[48px] lg:hidden">
          <CardTitle
            size="M"
            titleMessage="마이갤러리"
            buttonSize="S"
            buttonMessage="포토카드 생성하기"
            className="w-full mx-auto"
            LinkUrl="/gallery/create"
          />
        </div>
      </div>
      <CardGradeStatus />
      <GalleryFilter />
      <PhotoCardList type="count" isGalleryPage={true} />
      <Link
        href="/gallery/create"
        className="flex justify-center fixed bottom-[15px] left-0 w-full"
      >
        <Button size="S" className="w-[345px] h-[55px] md:hidden lg:hidden">
          포토카드 생성하기
        </Button>
      </Link>
    </div>
  );
}
