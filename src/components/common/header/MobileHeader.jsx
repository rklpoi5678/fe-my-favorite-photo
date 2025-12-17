'use client';

import { Popover } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ic_back from '@/assets/icons/Ic_back.svg';
import ic_bell from '@/assets/icons/Ic_bell.svg';
import ic_hamburger from '@/assets/icons/Ic_hamberger.svg';
import ic_redBell from '@/assets/icons/Ic_redBell.svg';
import img_logo from '@/assets/images/svg/logo.svg';
import { hoursAgo } from '@/libs/utils/time';
import { useAuth } from '@/providers/AuthProvider';
import { useNotification } from '@/providers/NotificationProvider';

/** hasId: 처음에 상세 페이지에만 해당 헤더가 쓰이는 줄 알고 /page/id가 있다면 title을 받는 헤더를 표시하려고 함 */

export default function MobileHeader({ hasId = false, title = '마이갤러리' }) {
  const { user, logout } = useAuth();
  const { notifications, loading, markAsRead } = useNotification();

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const hasUnread = notifications.some((n) => !n.isRead);

  let content = null;

  if (!user) content = <LogoutHeader openMenu={() => setIsHamburgerOpen(true)} />;
  else if (hasId) content = <SecondaryHeader title={title} />;
  else
    content = (
      <LoginHeader
        user={user}
        hasUnread={hasUnread}
        openMenu={() => setIsHamburgerOpen(true)}
        openNotification={() => setIsNotificationOpen(true)}
      />
    );

  return (
    <div className="sm:flex md:hidden h-[60px] flex-col justify-center">
      {content}

      {isHamburgerOpen && (
        <OpenHamburger user={user} logout={logout} onClose={() => setIsHamburgerOpen(false)} />
      )}

      {isNotificationOpen && user && (
        <MobileNotificationModal
          userId={user.id}
          hasUnread={hasUnread}
          notifications={notifications}
          loading={loading}
          markAsRead={markAsRead}
          onClose={() => setIsNotificationOpen(false)}
        />
      )}
    </div>
  );
}

// 로그인 헤더
function LoginHeader({ openMenu, openNotification, hasUnread }) {
  return (
    <div className="w-full flex justify-around items-center">
      <button onClick={openMenu} className="cursor-pointer">
        <Image src={ic_hamburger} alt="메뉴" width={22} height={22} />
      </button>

      <Image src={img_logo} alt="로고" width={83} height={15} />

      <button onClick={openNotification} className="cursor-pointer">
        <Image src={hasUnread ? ic_redBell : ic_bell} alt="알림 상태" width={22} height={22} />
      </button>
    </div>
  );
}

// 상세 페이지 헤더
function SecondaryHeader({ title }) {
  const router = useRouter();
  return (
    <div className="w-full flex justify-around items-center ">
      <button onClick={() => router.back()} className="cursor-pointer">
        <Image src={ic_back} alt="뒤로가기" width={22} height={22} />
      </button>

      <h1 className=" text-white text-center font-br text-[20px] font-normal tracking-[-0.6px]">
        {title}
      </h1>

      <Image src={ic_bell} alt="공백" width={22} height={22} className="invisible" />
    </div>
  );
}

// 비로그인 헤더
function LogoutHeader({ openMenu }) {
  return (
    <div className="w-full flex justify-around items-center ">
      <button onClick={openMenu} className="cursor-pointer">
        <Image src={ic_hamburger} alt="메뉴" width={22} height={22} />
      </button>

      <Image src={img_logo} alt="로고" width={83} height={15} />

      <Link
        href="/login"
        className="text-[#DDD] text-right text-[14px] font-medium leading-normal cursor-pointer"
      >
        로그인
      </Link>
    </div>
  );
}

// 햄버거 버튼 오픈

function OpenHamburger({ onClose, user, logout }) {
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
                  <span className="text-main text-right text-[12px] font-normal">
                    {user.balance} P
                  </span>
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
            <button onClick={logout} className="text-gray-400 text-[14px] text-left cursor-pointer">
              로그아웃
            </button>
          ) : (
            <Link href="/login" className="text-gray-400 text-[14px] text-left cursor-pointer">
              로그인
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

// 모바일 전용 알림
function MobileNotificationModal({
  userId,
  notifications,
  loading,
  markAsRead,
  onClose,
  hasUnread,
}) {
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 z-50 flex flex-col">
        <div className="w-full h-[60px] flex justify-between px-[20px] items-center border-b border-gray-400">
          <button onClick={onClose} className="cursor-pointer">
            <Image src={ic_back} alt="뒤로가기" width={22} height={22} />
          </button>

          <h1 className="text-white text-[20px] font-br tracking-[-0.6px]">알림</h1>

          <Image src={ic_bell} alt="공백" width={22} height={22} className="invisible" />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-400 mt-10">로딩 중...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">알림이 없습니다.</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-4 w-full transition ${n.isRead ? 'bg-gray-500 text-gray-300' : 'bg-[#222222] text-white'
                  } cursor-pointer`}
              >
                <p className="text-[14px] font-normal">{n.content}</p>
                <p className="text-[12px] font-light mt-2.5">{hoursAgo(n.createdAt)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
