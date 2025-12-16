import BoxDropDown from '@/components/ui/filter/BoxDropDown';
import DefaultDropDown from '@/components/ui/filter/DefaultDropDown';
import MobileFilter from '@/components/ui/filter/MobileFilter';
import SearchBar from '@/components/ui/search/SearchBar';

export default function MarketFilter() {
  const gradeLabels = ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'];
  const genreLabels = ['TRAVEL', 'LANDSCAPE', 'PORTRAIT', 'OBJECT'];
  const statusLabels = ['판매 중', '판매 완료'];
  const priceLabels = ['낮은 가격순', '높은 가격순', '최신순'];
  const mobileLabels = {
    grade: gradeLabels,
    genre: genreLabels,
    status: statusLabels,
  };

  return (
    <div className="w-full mx-auto sm:max-w-[345px] md:max-w-[704px] lg:max-w-[1480px] mt-[20px]">
      {/* 모바일 */}
      <div className="md:hidden">
        <SearchBar />
        <div className="w-full border border-b-gray-400 my-[15px]" />
        <div className="flex justify-between items-center mb-5">
          <MobileFilter items={mobileLabels} size="35" />
          <BoxDropDown items={priceLabels} filterKey="price" />
        </div>
      </div>

      {/* 기본 */}
      <div className="hidden md:flex md:justify-between md:mb-[40px] lg:flex lg:justify-between lg:mb-[60px]">
        <div className="flex items-center">
          <div className="md:mr-[30px] lg:mr-[60px]">
            <SearchBar />
          </div>

          <div className="flex md:gap-[25px] lg:gap-[45px]">
            <DefaultDropDown items={gradeLabels} placeholder="등급" filterKey="grade" />
            <DefaultDropDown items={genreLabels} placeholder="장르" filterKey="genre" />
            <DefaultDropDown items={statusLabels} placeholder="매진여부" filterKey="status" />
          </div>
        </div>

        <BoxDropDown items={priceLabels} filterKey="price" />
      </div>
    </div>
  );
}
