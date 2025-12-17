'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

import PhotoCardList from '@/components/ui/card/PhotoCardList';
import { useAuth } from '@/providers/AuthProvider';

import { ButtonClient } from './_components/ButtonClient';
import { CardTitleClient } from './_components/CardTitleClient';
import MarketFilter from './_components/MarketFilter';

export default function MarketPlacePage() {
  const { user } = useAuth();

  useEffect(() => {
    const loginSuccess = sessionStorage.getItem('loginSuccess');

    if (loginSuccess && user) {
      toast.success(` ${user.nickname}님 로그인하셨습니다!`);
      sessionStorage.removeItem('loginSuccess');
    }
  }, [user]);
  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <div className="hidden md:flex md:justify-between lg:flex lg:justify-between justify-center items-center md:w-full md:block md:mt-[60px] lg-w-full lg:block lg:mt-[60px]">
        {/* lg일 때 */}
        <div className="md:w-full lg:w-full font-normal font-br hidden md:hidden lg:block lg:text-[62px]">
          <CardTitleClient />
        </div>

        {/* md일 때 */}
        <div className="md:w-full lg:w-full font-normal font-br hidden md:block md:text-[48px] lg:hidden">
          <CardTitleClient size="M" buttonSize="S" />
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
