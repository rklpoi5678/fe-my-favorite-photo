'use client';

import Image from 'next/image';
import { useState } from 'react';

import IcBack from '@/assets/icons/Ic_back.svg';
import photoChange from '@/assets/images/svg/photoChange.png';
import PhotoCard from '@/components/ui/card/PhotoCard';
import { tradeService } from '@/libs/services/tradeService';
import { useExchange } from '@/providers/ExchangeProvider';

export default function TradeOfferModal({ isOpen, onClose, onSubmit, card }) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const { targetSaleId } = useExchange()

  if (!isOpen) return null;

  const handleClose = () => {
    if (isLoading) return;
    setMessage('');
    onClose?.();
  };

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);

    try {
      // 아직 SaleId로 받지 못하였으므로 백엔드에서 saleId를 목업으로 받았습니다.
      const tradeData = {
        saleId: targetSaleId,
        offeredUserCardId: card.id,
        description: message.trim()
      }
      const response = await tradeService.requestSale(tradeData)

      alert("교환 요청이 성공적으로 접수됨")
      onSubmit?.(message.trim());
      setMessage('');
    } catch (error) {
      console.error("교환요청실패:", error);
      alert(`교환 요청 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`);
    } finally {
      setIsLoading(false)
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const renderCard = (size) => {

    const sizes = {
      pc: { w: 480, h: 480, sold: 150 },
      tablet: { w: 342, h: 517, sold: 140 },
      mobile: { w: 320, h: 480, sold: 110 },
    }[size];

    return (
      <PhotoCard
        card={card}
        type="remain"
        cardImage={{ width: sizes.w, height: sizes.h }}
        soldOutIcon={{ width: sizes.sold, height: sizes.sold }}
      />
    );
  };

  return (
    <div
      className="
        fixed inset-0 z-[9999] flex justify-center items-center bg-black/70
        max-[744px]:items-end
        max-[375px]:items-stretch max-[375px]:bg-black
      "
      onClick={handleBackgroundClick}
    >
      <div
        className="
          relative bg-[#111111] text-white shadow-2xl flex flex-col
          w-[1160px] h-[903px] rounded-[12px] px-[64px] py-[40px]

          max-[744px]:w-full max-[744px]:max-w-[744px]
          max-[744px]:h-[85vh]
          max-[744px]:rounded-t-[16px] max-[744px]:rounded-b-none
          max-[744px]:px-[32px] max-[744px]:py-[32px]

          max-[375px]:max-w-[375px] max-[375px]:h-full
          max-[375px]:px-0 max-[375px]:py-0
          max-[375px]:rounded-none
        "
      >
        <button
          type="button"
          onClick={handleClose}
          className="
            absolute top-6 right-6 text-[20px] text-[#9ca3af] hover:text-white z-10
            max-[375px]:left-4 max-[375px]:right-auto max-[375px]:top-4
          "
        >
          <span className="max-[375px]:hidden">✕</span>
          <span className="hidden max-[375px]:inline">
            <Image src={IcBack} alt="뒤로가기" width={22} height={22} />
          </span>
        </button>

        <div className="hidden max-[744px]:block max-[375px]:hidden">
          <div className="mx-auto mt-1 mb-4 h-[4px] w-[40px] rounded-full bg-[#4b5563]" />
        </div>

        <div
          className="
            mb-8
            max-[744px]:mb-6
            max-[375px]:mb-0 max-[375px]:border-b max-[375px]:border-[#333]
            max-[375px]:pb-4 max-[375px]:pt-12 max-[375px]:px-4
          "
        >
          <Image
            src={photoChange}
            width={128}
            height={20}
            alt="포토카드 교환하기"
            className="mb-3 max-[375px]:hidden max-[744px]:mb-2"
          />
          <div className="hidden max-[375px]:block text-[14px] font-semibold mb-2 text-center">
            포토카드 교환하기
          </div>

          <div className="hidden max-[375px]:block text-[14px] font-semibold mb-2 text-center">
            포토카드 교환하기
          </div>

          <h2
            className="
              text-[30px] font-bold leading-tight
              max-[744px]:text-[24px]
              max-[375px]:text-[20px]
            "
          >
            {card.name}
          </h2>

          <div className="mt-5 h-px w-full bg-white/80 max-[744px]:mt-4" />
        </div>

        <div
          className="
            grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-[56px]
            max-[744px]:gap-6
            max-[375px]:flex max-[375px]:flex-col max-[375px]:flex-1
            max-[375px]:px-4 max-[375px]:py-6 max-[375px]:gap-6 max-[375px]:overflow-y-auto
          "
        >
          <div
            className="
              flex justify-center items-center
              max-[375px]:flex-shrink-0
              pb-6
              max-[744px]:pb-18
              max-[375px]:pb-26
            "
          >
            <div className="hidden min-[745px]:block">{renderCard('pc')}</div>
            <div className="hidden max-[744px]:block max-[375px]:hidden">
              {renderCard('tablet')}
            </div>
            <div className="block min-[376px]:hidden">{renderCard('mobile')}</div>
          </div>

          <div
            className="
              flex flex-col
              max-[375px]:flex-none
              max-[375px]:mt-auto max-[375px]:pb-3
            "
          >
            <label className="mb-3 text-[15px] font-semibold max-[744px]:text-[14px] max-[375px]:text-[13px]">
              교환 제시 내용
            </label>

            <textarea
              className="
                w-full min-h-[110px] border border-[#d1d5db] bg-transparent
                px-4 py-3 text-[14px] text-[#f9fafb]
                outline-none resize-none placeholder:text-[#6b7280]

                max-[375px]:min-h-[150px]
                max-[375px]:px-3 max-[375px]:text-[13px]
                max-[375px]:w-[calc(100%+8px)]
                max-[375px]:-mx-1
              "
              placeholder="내용을 입력해 주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />

            <div className="mt-10 flex gap-4 max-[744px]:mt-6 max-[375px]:hidden">
              <button
                onClick={handleClose}
                className="flex-1 h-[52px] border border-[#d1d5db] bg-[#111] text-[15px]"
                disabled={isLoading}
              >
                취소하기
              </button>
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || isLoading}
                className="flex-1 h-[52px] bg-[#EFFF04] text-[15px] font-bold text-black disabled:opacity-60"
              >
                {isLoading ? '처리 중...' : '교환하기'}
              </button>
            </div>
          </div>
        </div>

        {/* 모바일시 하단 버튼 */}
        <div className="hidden max-[375px]:flex gap-4 border-t border-[#333] p-4 bg-[#111]">
          <button
            onClick={handleClose}
            className="flex-1 h-[48px] border border-[#d1d5db] bg-[#111] text-white"
            disabled={isLoading}
          >
            취소하기
          </button>
          <button
            onClick={handleSubmit}
            disabled={!message.trim()}
            className="flex-1 h-[48px] bg-[#EFFF04] text-black font-bold disabled:opacity-60"
          >
            {isLoading ? '처리 중...' : '교환하기'}
          </button>
        </div>
      </div>
    </div>
  );
}