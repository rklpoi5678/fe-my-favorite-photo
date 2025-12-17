'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import BackgroundImg from '@/assets/landing/Img_3x_background.png';
import BlueBox from '@/assets/landing/Img_3x_blueBox.png';
import BlueEclipse from '@/assets/landing/Img_3x_blueEclipse.png';
import BottomCard from '@/assets/landing/Img_3x_bottomCard.png';
import Eclipse from '@/assets/landing/Img_3x_eclipse.png';
import HeroImg from '@/assets/landing/Img_3x_hero.png';
import LogoImg from '@/assets/landing/Img_3x_logo.png';
import RedBox from '@/assets/landing/Img_3x_redBox.png';
import Section1 from '@/assets/landing/Img_3x_section1.png';
import Section2 from '@/assets/landing/Img_3x_section2.png';
import Section3 from '@/assets/landing/Img_3x_section3.png';
import SectionBackground from '@/assets/landing/Img_section3Background.png';
import RandomModal from '@/components/ui/modal/random/RandomModal';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <main className="w-full min-h-screen bg-black overflow-x-hidden">
        <div className="relative w-full h-0 overflow-visible">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-[2000px] z-0 rounded-[40px] overflow-hidden pointer-events-none">
            <Image
              src={BackgroundImg}
              alt="Background"
              className="w-full h-auto object-cover opacity-60"
              priority
            />
          </div>
        </div>
        <div className="relative w-full">
          <section className="relative w-full flex justify-center pt-8 pb-4 overflow-hidden z-30">
            <div className="relative w-[85vw] max-w-[2000px]">
              <div className="relative z-30 flex flex-col items-center px-4 pt-4 pb-4">
                <div className="relative w-[100px] h-[22px] sm:w-[120px] sm:h-[26px] md:w-[140px] md:h-[30px] mb-3">
                  <Image src={LogoImg} alt="Logo" fill className="object-contain" />
                </div>

                <h1 className="text-white text-center font-noto text-xl sm:text-2xl md:text-[2.5rem] leading-tight font-bold mb-4">
                  구하기 어려웠던
                  <br />
                  <span className="text-[#EFFF04]">나의 최애</span>가 여기에!
                </h1>

                <Link
                  href="/market-place"
                  className="w-[180px] h-[48px] sm:w-[200px] sm:h-[52px] md:w-[220px] md:h-[56px] bg-[#EFFF04] text-black font-bold text-base sm:text-lg flex items-center justify-center hover:bg-[#dfff04] transition-colors"
                >
                  최애 찾으러 가기
                </Link>
              </div>
            </div>
          </section>

          <div className="relative w-full z-20 -mt-8 flex justify-center">
            <div className="w-[90%]">
              <Image
                src={HeroImg}
                alt="Hero Interface"
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden z-10 mt-4 sm:mt-6 md:mt-8">
            <div className="absolute right-[-1%] top-[65%] -translate-y-1/2 w-[960px] h-[960px] sm:w-[1200px] sm:h-[1200px] md:w-[1440px] md:h-[1440px] lg:w-[1680px] lg:h-[1680px] xl:w-[1920px] xl:h-[1920px] opacity-30 pointer-events-none">
              <Image src={Eclipse} alt="glow" fill className="object-contain" />
            </div>

            <div className="relative z-10 w-[90%] sm:w-[85%] max-w-[1600px] mx-auto flex flex-col items-center px-4">
              <div className="text-left mb-6 sm:mb-8 md:mb-10 lg:mb-12 w-full">
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                  포인트로 <span className="text-[#EFFF04]">안전하게 거래</span>하세요
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                  내 포토카드를 포인트로 팔고, 원하는 포토카드를 포인트로 안전하게 교환하세요
                </p>
              </div>

              <div className="relative w-full max-w-[1200px] aspect-[16/10] sm:aspect-video">
                <Image src={Section1} alt="Safe Transaction" fill className="object-contain" />
              </div>
            </div>
          </section>
        </div>

        <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-black overflow-hidden">
          <div className="absolute left-[5%] top-[70%] -translate-y-1/2 w-[972px] h-[972px] sm:w-[1188px] sm:h-[1188px] md:w-[1404px] md:h-[1404px] lg:w-[1620px] lg:h-[1620px] xl:w-[1836px] xl:h-[1836px] opacity-30 pointer-events-none">
            <Image src={BlueEclipse} alt="blue-glow" fill className="object-contain" />
          </div>

          <div className="relative z-10 w-[90%] sm:w-[85%] max-w-[1600px] mx-auto flex flex-col items-center px-4">
            <div className="text-left mb-6 sm:mb-8 md:mb-10 lg:mb-12 w-full">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                알림으로 보다 <span className="text-[#3397FF]">빨라진 거래</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                교환 제안부터 판매 완료까지,
                <br />
                실시간 알림으로 놓치지 마세요
              </p>
            </div>

            <div className="relative w-full max-w-[1200px] h-[230px] sm:h-[276px] md:h-[368px] lg:h-[460px]">
              <Image
                src={Section2}
                alt="알림으로 보다 빨라진거래"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        <section className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-black overflow-hidden">
          <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0">
            <Image src={SectionBackground} alt="glow" fill className="object-cover" />
          </div>

          <div
            className="absolute left-[30%] sm:left-[28%] md:left-[26%] lg:left-[25%] bottom-0 translate-y-[60%] 
                  w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] 
                  lg:w-[600px] lg:h-[600px] opacity-80 pointer-events-none -rotate-[25deg] z-10"
          >
            <Image src={BlueBox} alt="blue-box" fill className="object-contain" />
          </div>

          <div
            className="absolute 
                right-[23%] sm:right-[25%] md:right-[26%] lg:right-[29%]
                top-[30%] sm:top-[32%] md:top-[35%]
                w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] 
                lg:w-[300px] lg:h-[300px] 
                opacity-90 pointer-events-none rotate-[15deg] z-10"
          >
            <Image src={RedBox} alt="red-box" fill className="object-contain" />
          </div>

          <div className="relative z-20 w-[90%] sm:w-[85%] max-w-[1600px] mx-auto flex flex-col items-start px-4">
            <h2 className="text-left text-white text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
              랜덤 상자로 <span className="text-[#EFFF04]">포인트 받자! 🎉</span>
            </h2>

            <p className="text-left text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-6">
              한 시간마다 주어지는 랜덤 상자를 열고,
              <br />
              포인트를 획득하세요
            </p>

            <div className="relative w-full max-w-[1200px] h-[200px] sm:h-[240px] md:h-[320px] lg:h-[400px] mx-auto">
              <Image src={Section3} alt="Random Box" fill className="object-contain" />
            </div>
          </div>
        </section>

        <section className="w-full bg-black">
          <div className="w-[90%] sm:w-[85%] max-w-[1280px] mx-auto py-10 sm:py-14 md:py-16 lg:py-20 px-4 lg:px-0 flex flex-col items-center text-center">
            <div className="relative w-[150px] sm:w-[180px] md:w-[220px] lg:w-[260px] aspect-[4/5] mb-6 sm:mb-8 md:mb-10">
              <Image src={BottomCard} alt="랜딩 섹션 5" fill className="object-contain" />
            </div>

            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">
              나의 최애를 찾아보세요!
            </h2>

            <Link
              href="/market-place"
              className="w-full max-w-[200px] sm:max-w-[226px] h-[44px] sm:h-[48px] md:h-[55px] bg-[#EFFF04] text-black font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center hover:bg-[#dfff04] transition-colors"
            >
              최애 찾으러 가기
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
