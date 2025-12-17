'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import HopeChangeImg from '@/assets/images/svg/hopeChange.png';
import { Button } from '@/components/ui/button/Button';
import { saleService } from '@/libs/services/saleService';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

const GRADE_CONFIG = {
  COMMON: { label: 'COMMON', colorClass: 'text-[#faff00]' },
  RARE: { label: 'RARE', colorClass: 'text-[#46c6ff]' },
  SUPER_RARE: { label: 'SUPER RARE', colorClass: 'text-[#c88bff]' },
  LEGENDARY: { label: 'LEGENDARY', colorClass: 'text-[#ff4c7d]' },
};

export default function CardSeller({
  card,
  cardData,
  wishGrade,
  wishCategory,
  wishDescription,
}) {
  const myGrade = GRADE_CONFIG[cardData.grade] ?? GRADE_CONFIG.COMMON;
  const wishGradeConfig = GRADE_CONFIG[wishGrade] ?? GRADE_CONFIG.RARE;

  const { openModal, closeModal } = useModal()
  const router = useRouter()

  const handleSaleClose = async (cardId) => {
    try {
      const response = await saleService.closeSale(cardId)

      if (response.success) {
        closeModal()
        alert("판매가 성공적으로 종료되었습니다.")
        router.push('/market-place')
      } else {
        alert(response.message || "판매 내리기에 실패했습니다.")
      }
    } catch (error) {
      console.error('판매 내리기 오류:', error)
      alert("서버 통신 중 오류가 발생했습니다.")
    }
  }

  return (
    <div className="w-full text-white flex flex-col bg-[#0a0a0a]">
      <div className="flex-1 px-4 pt-6 pb-8">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`text-[22px] font-extrabold leading-none ${myGrade.colorClass}`}>
              {myGrade.label}
            </span>
            <span className="h-[18px] w-px bg-[#4b5563]" />
            <span className="text-[18px] font-semibold text-[#d1d5db]">{cardData.genre}</span>
          </div>
          <span className='text-[1.125rem] font-bold underline md:text-[1.5rem]'>{card.seller.nickname}</span>
        </header>

        <div className="h-[1px] bg-[#2a2a2a] mt-4" />

        <section className="mt-4 text-[11px] leading-relaxed text-[#e5e7eb]">{cardData.description}</section>

        <div className="h-[1px] bg-[#2a2a2a] mt-4" />

        <section className="mt-10 space-y-3 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-[#d1d5db]">가격</span>
            <span className="text-[15px] font-bold">
              {card.price} <span className="text-[11px]">P</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#d1d5db]">잔여</span>
            <span className="text-[15px] font-bold">
              {card.remainingQuantity} / <span className='text-gray-300'>{card.quantity}</span>
            </span>
          </div>
        </section>

        <div className="mt-8" />

        <section className="mt-4">
          <Image src={HopeChangeImg} alt="교환 희망 정보" className="h-[30px] w-auto" />
        </section>

        <section className="mt-6">
          <div className="flex items-center gap-3">
            <span
              className={`text-[16px] font-extrabold leading-none ${wishGradeConfig.colorClass}`}
            >
              {wishGradeConfig.label}
            </span>
            <span className="h-[16px] w-px bg-[#4b5563]" />
            <span className="text-[14px] font-semibold text-[#d1d5db]">{wishCategory}</span>
          </div>

          <div className="h-[1px] bg-[#2a2a2a] mt-3" />

          <p className="mt-3 text-[11px] leading-relaxed text-[#e5e7eb]">{wishDescription}</p>
        </section>
      </div>

      <div className="w-full flex flex-col gap-3">
        <Button
          type="button"
          thickness="thin"
          className="w-full py-[18px] text-[15px] font-bold bg-[#faff00] text-black"
          onClick={() => openModal(MODAL_TYPES.CARD_MODAL, { type: 'edit', subtitle: '수정하기', card: card, cardData: cardData })}
        >
          수정하기
        </Button>
        <Button
          type="button"
          thickness="thin"
          className="w-full py-[18px] text-[14px] font-bold bg-[#0a0a0a] text-white border border-white"
          onClick={() => openModal(MODAL_TYPES.MODAL, { title: "포토카드 판매 내리기", description: "정말로 판매를 중단하시겠습니까 ?", confirmText: "판매 내리기", onConfirm: () => handleSaleClose(card.id) })}
        >
          판매 내리기
        </Button>
      </div>
    </div>
  );
}
