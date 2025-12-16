import DefaultDropDown from '@/components/ui/filter/DefaultDropDown';
import MobileFilter from '@/components/ui/filter/MobileFilter';
import SearchBar from '@/components/ui/search/SearchBar';

export default function SellingFilter() {
  const gradeLabels = ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'];
  const genreLabels = ['TRAVEL', 'LANDSCAPE', 'PORTRAIT', 'OBJECT'];
  const statusLabels = ['판매 중', '판매 완료'];
  const saleLabels = ['판매', '교환 제시'];
  const mobileLabels = {
    grade: gradeLabels,
    genre: genreLabels,
    status: statusLabels,
    sale: saleLabels,
  };

  return (
    <div className="w-full mx-auto sm:max-w-[345px] md:max-w-[704px] lg:max-w-[1480px]">
      {/* 모바일 */}
      <div className="md:hidden">
        <div className="flex gap-[10px] mb-5">
          <MobileFilter items={mobileLabels} size="45" isSellingPage={true} />
          <SearchBar isSellingPage={true} />
        </div>
      </div>

      {/* 기본 */}
      <div className="hidden md:flex md:justify-between md:mb-[40px] lg:flex lg:justify-between lg:mb-[60px]">
        <div className="flex items-center">
          <div className="md:mr-[30px] lg:mr-[60px]">
            <SearchBar isSellingPage={true} />
          </div>

          <div className="flex md:gap-[25px] lg:gap-[45px]">
            <DefaultDropDown items={gradeLabels} placeholder="등급" filterKey="grade" />
            <DefaultDropDown items={genreLabels} placeholder="장르" filterKey="genre" />
            <DefaultDropDown items={saleLabels} placeholder="판매방법" filterKey="sale" />
            <DefaultDropDown items={statusLabels} placeholder="매진여부" filterKey="status" />
          </div>
        </div>
      </div>
    </div>
  );
}
