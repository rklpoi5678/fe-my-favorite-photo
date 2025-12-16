'use client';

import { Popover } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

import Ic_alarmActive from '@/assets/icons/Ic_alarmActive.svg';
import LogoPng from '@/assets/images/logo.png';
import { useAuth } from '@/providers/AuthProvider';

export default function Header() {
  const { user, logout } = useAuth();

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
    <header className="hidden md:flex w-full justify-between items-center py-7 px-[220px]">
      <div>
        <Link href="/">
          <Image src={LogoPng} alt="headerLogoImg" width={120} height={40} />
        </Link>
      </div>

      <nav className="flex items-center gap-[30px] font-noto text-right text-gray-200 font-medium leading-normal">
        {user ? (
          <>
            <div className="flex items-center justify-center gap-[30px] ">
              <span className="text-[#DDDDDD] font-noto text-[14px] font-bold leading-normal">
                {user.balance}P
              </span>
              <span>
                <Popover className="relative">
                  <Popover.Button>
                    <Image
                      src={Ic_alarmActive}
                      width={24}
                      height={24}
                      alt="alarmActive"
                      className="w-6 h-6"
                    />
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
              </span>
              <Popover className="relative">
                <Popover.Button className="text-[#DDDDDD] font-br text-[18px] font-normal leading-normal tracking-[-0.54px]">
                  {user.nickname}
                </Popover.Button>
                <Popover.Panel className="absolute right-0 mt-3 bg-gray-500 w-[300px] py-4 px-4 rounded-md shadow-lg z-[50]">
                  <div className="flex w-[260px] h-[83px] flex-col gap-5 text-left mb-5 ">
                    <p className="text-white font-noto text-[18px] font-bold leading-normal">
                      안녕하세요, {user.nickname}님!
                    </p>
                    <div className="flex justify-between">
                      <p className="text-gray-300 font-noto text-[12px] font-light leading-normal">
                        보유 포인트
                      </p>
                      <p className="text-main text-right font-noto text-[12px] font-normal leading-normal">
                        {user.balance}
                      </p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-[15px] text-left text-white font-noto text-[14px] font-bold leading-normal">
                    <li>
                      <Link href="/market-place">마켓플레이스</Link>
                    </li>

                    <li>
                      <Link href="/gallery">마이갤러리</Link>
                    </li>

                    <li>
                      <Link href="/selling">판매 중인 포토카드</Link>
                    </li>
                  </ul>
                </Popover.Panel>
              </Popover>
              <p className="text-[#5A5A5A] text-center font-noto text-[14px] font-normal leading-normal">
                |
              </p>
              <button
                onClick={logout}
                className="text-[#5A5A5A] text-right font-noto text-[14px] font-normal leading-normal"
              >
                로그아웃
              </button>
            </div>
          </>
        ) : (
          <>
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
}
