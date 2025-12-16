'use client';

import { Popover } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ic_back from '@/assets/icons/Ic_back.svg';
import ic_bell from '@/assets/icons/Ic_bell.svg';
import ic_hamburger from '@/assets/icons/Ic_hamberger.svg';
import img_logo from '@/assets/images/svg/logo.svg';
import { useAuth } from '@/providers/AuthProvider';

export default function MobileHeader({ hasId = false, title = '마이갤러리' }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { user, logout } = useAuth();

  let content = null;

  if (!user) content = <LogoutHeader openMenu={() => setIsHamburgerOpen(true)} />;
  else if (hasId) content = <SecondaryHeader title={title} />;
  else content = <LoginHeader openMenu={() => setIsHamburgerOpen(true)} />;

  return (
    <div className="sm:flex md:hidden h-[60px] flex-col justify-center">
      {content}

      {isHamburgerOpen && (
        <OpenHamburger user={user} logout={logout} onClose={() => setIsHamburgerOpen(false)} />
      )}
    </div>
  );
}

function LoginHeader({ openMenu }) {
  const notifications = [
    {
      id: 1,
      message: '기며누님이 [RAR | 집 앞마당]을 구매했습니다.',
      time: '1시간 전',
    },
    {
      id: 2,
      message: '예진쓰님이 [COMMON | 스페인 여행]의 포토카드 교환을 제안했습니다.',
      time: '1시간 전',
    },
  ];

  return (
    <div className="w-full flex justify-around items-center ">
      <button onClick={openMenu} className="cursor-pointer">
        <Image src={ic_hamburger} alt="메뉴" width={22} height={22} />
      </button>

      <Image src={img_logo} alt="로고" width={83} height={15} />

      <Popover className="relative">
        <Popover.Button>
          <Image src={ic_bell} width={22} height={22} alt="알림" />
        </Popover.Button>
        <Popover.Panel className="absolute right-0 mt-2 bg-gray-500 w-[300px] py-3 divide-y divide-gray-400 z-[50]">
          {notifications.length === 0 ? (
            <p className="text-gray-400 py-4 text-center">알림이 없습니다.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-4 w-full transition">
                <p className=" text-white font-noto text-[14px] font-normal leading-normal text-left ">
                  {n.message}
                </p>
                <p className="text-[#A4A4A4] font-noto text-[12px] font-light leading-normal mt-2.5 text-left">
                  {n.time}
                </p>
              </div>
            ))
          )}
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function SecondaryHeader({ title }) {
  const router = useRouter()
  return (
    <div className="w-full flex justify-around items-center ">
      <button onClick={() => router.back} className='cursor-pointer'>
        <Image src={ic_back} alt="뒤로가기" width={22} height={22} />
      </button>

      <h1 className=" text-white text-center font-br text-[20px] font-normal tracking-[-0.6px]">
        {title}
      </h1>

      <Image src={ic_bell} alt="공백" width={22} height={22} className="invisible" />
    </div>
  );
}

function LogoutHeader({ openMenu }) {
  return (
    <div className="w-full flex justify-around items-center ">
      <button onClick={openMenu} className="cursor-pointer">
        <Image src={ic_hamburger} alt="메뉴" width={22} height={22} />
      </button>

      <Image src={img_logo} alt="로고" width={83} height={15} />

      <Link href="/login" className="text-[#DDD] text-right text-[14px] font-medium leading-normal">
        로그인
      </Link>
    </div>
  );
}

function OpenHamburger({ onClose, user, logout }) {
  console.log(user)
  return (
    <>
      <div className="fixed inset-0 bg-black/80 z-40" onClick={onClose} />
      <div className="fixed top-0 left-0 w-[260px] h-screen bg-gray-500 z-50 text-white px-[20px] py-[40px]">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col">
            {user ? (
              <>
                <h1 className="text-[18px] font-bold mb-[20px]">안녕하세요, {user.nickname}님!</h1>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-[12px] font-light">보유 포인트</span>
                  <span className="text-main text-right text-[12px] font-normal">{user.balance} P</span>
                </div>
              </>
            ) : (
              <h1 className="text-[18px] font-bold mb-[20px]">로그인이 필요합니다.</h1>
            )}

            <div className="border-b border-gray-300 w-full my-[20px]"></div>
            <div className="text-[14px] font-bold flex flex-col gap-[15px]">
              <Link href="/market-place" className="cursor-pointer">
                마켓플레이스
              </Link>
              <Link href="/gallery" className="cursor-pointer">
                마이갤러리
              </Link>
              <Link href="/selling" className="cursor-pointer">
                판매 중인 포토카드
              </Link>
            </div>
          </div>

          {user ? (
            <button onClick={logout} className="text-gray-400 text-[14px] text-left">
              로그아웃
            </button>
          ) : (
            <Link href="/login" className="text-gray-400 text-[14px] text-left">
              로그인
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
