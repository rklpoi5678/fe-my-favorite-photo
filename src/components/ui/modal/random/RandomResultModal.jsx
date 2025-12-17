'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import pointImg from '@/assets/images/randomModal/pointModal.png';

export default function RandomResultModal({ reward, nextAvailableAt, onClose }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (!nextAvailableAt) return;

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [nextAvailableAt]);

  function getRemainingTime(nextAvailableAt, now) {
    const diff = new Date(nextAvailableAt) - now;

    if (diff <= 0) return '00:00';

    const minutes = String(Math.floor(diff / 1000 / 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center">
        <section className="flex justify-center items-center mt-20">
          <div className="flex flex-col justify-center gap-10">
            <div className="flex justify-center">
              <p className="text-[#FFF] text-center font-br text-[46px] font-normal leading-none tracking-[-1.38px]">
                랜덤
              </p>
              <p className="text-[#EFFF04] font-br text-[46px] font-normal leading-none tracking-[-1.38px]">
                포인트
              </p>
            </div>
          </div>
        </section>
        <section className="flex justify-center items-center mt-8">
          <Image
            src={pointImg}
            alt="pointImg"
            width={340}
            height={324.121}
            className="w-[340px] h-[324.121px]"
          />
        </section>
        <section className="flex justify-center items-center mt-[23px] gap-1">
          <p className="text-[#EFFF04] text-center font-noto text-[28px] font-bold leading-none">
            {reward}P
          </p>

          <span className="text-white font-noto text-[28px] font-bold leading-none">
            {reward === 0 ? '아쉽지만 꽝!' : '획득!'}
          </span>
        </section>
        <section className="flex gap-2.5 justify-center items-center mt-5">
          <p className="text-[#A4A4A4] text-center font-noto text-[16px] font-normal leading-none">
            다음 기회까지 남은 시간
          </p>
          <p className="text-[#EFFF04] text-center font-noto text-[16px] font-normal leading-none">
            {getRemainingTime(nextAvailableAt, now)}
          </p>
        </section>
      </div>
    </div>
  );
}
