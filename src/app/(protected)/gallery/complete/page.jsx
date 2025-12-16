import Image from 'next/image';
import Link from 'next/link';

import MobileBackIcon from '@/assets/icons/Ic_back.svg';
import X from '@/assets/icons/Ic_x.svg';
import Header from '@/components/common/header/Header';
import { Button } from '@/components/ui/button/Button';

// type 이 바뀔때 프로젝트 생성 실패로
export default function page() {
  return (
    <main className="relative container mx-auto min-h-screen text-white">
      <div className="hidden sm:block"></div>
      <header className="p-5 sm:hidden">
        <Link href="/gallery" className="relative">
          <Image src={MobileBackIcon} alt="뒤로가기 버튼" width={22} height={22} unoptimized />
        </Link>
      </header>

      <div className="mt-55 mb-55 flex flex-col items-center">
        <div className="relative hidden sm:block w-[19.961px] h-[19.961px] ml-[500px] md:ml-[720px]">
          <Link href="/gallery">
            <Image src={X} alt="뒤로가기 버튼" fill />
          </Link>
        </div>
        <section className="relative flex flex-col mx-auto items-center p-19.5 sm:px-0">
          <h1 className="text-3xl text-nowrap shrink font-br tracking-[-0.9px] sm:text-4xl md:text-[46px]">
            포토카드 생성
            <span className="text-main"> 성공</span>
          </h1>
          <p className="font-bold text-center mb-12.5 mt-12.5 sm:mb-15 sm:mt-10">
            [RARE | 우리집 앞마당] <br className="sm:hidden" />
            포토카드 생성에 성공했습니다!
          </p>
          <Link href="/gallery">
            <Button
              intent="secondary"
              thickness="thin"
              className="py-4.25 px-7.5 h-[55px] w-full text-nowrap text-base font-bold sm:max-w-56.5 md:text-lg md:max-w-100"
            >
              마이갤러리에서 확인하기
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
