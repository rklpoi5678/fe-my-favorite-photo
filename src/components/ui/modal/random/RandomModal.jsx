'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import box1 from '@/assets/images/randomModal/type=box1.png';
import box2 from '@/assets/images/randomModal/type=box2.png';
import box3 from '@/assets/images/randomModal/type=box3.png';
import x from '@/assets/images/randomModal/X.png';
import { executeRandomPoint } from '@/libs/services/randomPointService';
import { useAuth } from '@/providers/AuthProvider';

import RandomResultModal from './RandomResultModal';

export default function RandomModal({ onClose }) {
  const boxes = [
    {
      id: 0,
      src: box1,
      className: 'w-[245.96px] h-[190.667px]',
    },
    {
      id: 1,
      src: box2,
      className: 'w-[223.74px] h-[198px]',
    },
    {
      id: 2,
      src: box3,
      className: 'w-[245.96px] h-[190.667px]',
    },
  ];
  const [selectedBox, setSelectedBox] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState('SELECT');
  const [reward, setReward] = useState(null);
  const [nextAvailableAt, setNextAvailableAt] = useState(null);
  const { updateBalance, user, getUser } = useAuth();

  const handleSelectBox = (i) => {
    if (confirmed) return; // 확정 후에는 변경 불가
    setSelectedBox(i);
  };

  const handleClose = () => {
    setSelectedBox(null);
    setConfirmed(false);
    setStep('SELECT');
    onClose();
  };

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center  ">
      <div
        className={`relative bg-gray-500 text-white rounded-xs ${step === 'SELECT' ? 'w-[1034px] h-[646px]' : 'w-[455px] h-[678px]'}`}
      >
        <button onClick={handleClose} aria-label="닫기" className="absolute top-6 right-6">
          <Image src={x} alt="x" className="w-6 h-6" width={24} height={24} />
        </button>
        {step === 'SELECT' && (
          <>
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
                <div className="text-[#FFF] text-center font-noto text-[20px] font-bold leading-none">
                  <p>
                    1시간마다 돌아오는 기회!
                    <br />
                    랜덤 상자 뽑기를 통해 포인트를 획득하세요!
                  </p>
                </div>
              </div>
            </section>

            <section className="relative mt-[94px] mx-[100px]">
              <div className="flex justify-between gap-10">
                {boxes.map((box) => {
                  const isSelected = selectedBox === box.id;
                  const isDimmed = selectedBox !== null && selectedBox !== box.id;
                  return (
                    <button
                      key={box.id}
                      onClick={() => handleSelectBox(box.id)}
                      className={` flex justify-center items-center shrink-0 transition-all duration-300 ${box.className} ${isSelected ? 'opacity-100 scale-105' : ''} ${isDimmed ? 'opacity-30' : ''}`}
                    >
                      <Image src={box.src} alt={`랜덤 박스 ${box.id + 1}`} />
                    </button>
                  );
                })}
              </div>

              {selectedBox !== null && (
                <div className="flex justify-center mt-16">
                  <button
                    disabled={selectedBox === null}
                    onClick={async () => {
                      try {
                        setConfirmed(true);
                        const { reward, nextAvailableAt } = await executeRandomPoint();

                        setReward(reward);
                        setNextAvailableAt(nextAvailableAt);
                        updateBalance(reward);
                        setStep('RESULT');
                      } catch (error) {
                        console.error('랜덤 포인트 실행 실패', error);
                      }
                    }}
                    className="w-[400px] h-16 bg-[#EFFF04] text-black font-bold rounded-xs"
                  >
                    선택완료
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {step === 'RESULT' && (
          <RandomResultModal
            reward={reward}
            nextAvailableAt={nextAvailableAt}
            onClose={handleClose}
          />
        )}
      </div>
    </main>
  );
}
