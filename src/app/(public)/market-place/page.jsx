import PhotoCardList from '@/components/ui/card/PhotoCardList';

import { ButtonClient } from './_components/ButtonClient';
import { CardTitleClient } from './_components/CardTitleClient';
import MarketFilter from './_components/MarketFilter';

export default function MarketPlacePage() {
  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <div className="hidden md:flex md:justify-between lg:flex lg:justify-between justify-center items-center md:w-full md:block md:mt-[60px] lg-w-full lg:block lg:mt-[60px]">
        {/* lg일 때 */}
        <div className="md:w-full lg:w-full font-normal font-br hidden md:hidden lg:block lg:text-[62px]">
          <CardTitleClient />
        </div>

        {/* md일 때 */}
        <div className="md:w-full lg:w-full font-normal font-br hidden md:block md:text-[48px] lg:hidden">
          <CardTitleClient size="md" />
        </div>
      </div>

      <MarketFilter />
      <PhotoCardList />
      <div className="flex justify-center fixed bottom-[15px] left-0 w-full">
        <ButtonClient />
      </div>
    </div>
  );
}
