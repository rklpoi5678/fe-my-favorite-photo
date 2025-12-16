'use client'
import Image from 'next/image';

import { tradeService } from '@/libs/services/tradeService';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

import { Button } from '../button/Button';
import GradeLabel from '../label/GradeLabel';

function ResponsiveText({ mobile, desktop }) {
  return (
    <>
      <span className="sm:hidden text-[.75rem] font-bold">{mobile}</span>
      <span className="hidden sm:inline sm:text-base sm:font-medium md:text-lg">{desktop}</span>
    </>
  );
}

export function CardExchange({ tradeItem }) {
  const { openModal, closeModal } = useModal()
  const offeredCardInfo = tradeItem.tradeHistories[0].userCard.photoCard;


  const baseHost = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://127.0.0.1:3005';
  const fullImageUrl = offeredCardInfo.imageUrl
    ? offeredCardInfo.imageUrl.startsWith('http')
      ? offeredCardInfo.imageUrl
      : `${baseHost}/${offeredCardInfo.imageUrl}`
    : Img_Card; // 기본 이미지는 폴백

  const handleApprove = (tradeId) => {
    openModal(MODAL_TYPES.MODAL, {
      title: "교환 제시 승인",
      description: `${offeredCardInfo.grade} | ${offeredCardInfo.name} 교환 제시를 승인하시겠습니까?`,
      confirmText: "승인하기",
      onConfirm: async () => {
        try {
          await tradeService.ownerApprove(tradeId)
          alert("거래가 되었습니다.")
          closeModal()
        } catch (error) {
          console.error("교환 승인 실패:", error)
          alert("승인을 실패하였습니다.", error)
        }
      }
    })
  }

  const handleReject = (tradeId) => {
    openModal(MODAL_TYPES.MODAL, {
      title: "교환 제시 거절",
      description: `${offeredCardInfo.grade} | ${offeredCardInfo.name} 교환 제시를 거절하시겠습니까?`,
      confirmText: "거절하기",
      onConfirm: async () => {
        try {
          await tradeService.ownerReject(tradeId)
          alert("교환을 거절하였습니다.")
          closeModal();
        } catch (error) {
          console.error("교환 거절 실패:", error)
          alert("거절을 실패하였습니다.", error)
        }
      },
    })
  }


  return (
    <div className="flex flex-col max-w-42.5 max-h-77 p-2.5 border border-[rgba(255,255,255,0.10)] rounded-[2px] sm:max-w-85.5 sm:max-h-140.25 sm:p-5 md:max-w-110 md:max-h-156.5 md:p-10">
      <div className="relative max-w-37.5 max-h-28 aspect-video sm:max-w-75.5 sm:max-h-[14.1563rem] md:max-w-90 md:max-h-67.5">
        <Image src={fullImageUrl} alt="교환될 사진" fill />
      </div>
      <div className="border-b border-gray-400 mt-2.5 sm:mt-[1.5938rem]">
        <h1 className="text-white text-sm font-bold sm:text-[1.375rem]">{tradeItem.tradeHistories[0].userCard.photoCard.name}</h1>
        <div className="flex flex-col mb-2.5 sm:mb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1.25 sm:gap-2.5 sm:mt-2.5 md:flex">
            {/* 컴포넌트 반응형 수정 */}
            <GradeLabel grade={tradeItem.tradeHistories[0].userCard.photoCard.grade} />
            <div className="text-gray-400">|</div>
            <p className="text-gray-300 text-[.625rem] sm:text-base">풍경</p>
            <div className="text-gray-400 hidden md:block">|</div>
          </div>
          <div className="flex justify-between sm:mt-2.5 md:flex-row md:flex-1 md:justify-between md:items-center md:ml-2.5">
            <div className="flex">
              <p className="text-white text-[.625rem] sm:text-base">
                {tradeItem.tradeHistories[0].userCard.price} P<span className="text-gray-300 text-[.625rem] sm:text-base">에 구매</span>
              </p>
            </div>
            <p className="text-white underline text-[0.625rem] sm:text-base">{tradeItem.applicant.nickname}</p>
          </div>
        </div>
      </div>

      <div className="mt-2.5 mb-5 sm:mt-5 sm:mb-6.25 md:mb-10">
        <p className="text-white text-[.625rem] tracking-tight line-clamp-2 sm:text-base">
          {tradeItem.description}
        </p>
      </div>

      <div className="flex items-center justify-center gap-1.25 shrink-0 sm:gap-5">
        <Button
          intent="secondary"
          thickness="thin"
          className="py-4.25 h-10 hover:bg-gray-500 sm:h-13.75 md:h-15"
          onClick={() => handleReject(tradeItem.id)}
        >
          <ResponsiveText mobile="거절" desktop="거절하기" />
        </Button>
        <Button
          thickness="thin"
          className="py-4.25 h-10 hover:bg-main/90 sm:h-13.75 md:h-15"
          onClick={() => handleApprove(tradeItem.id)}
        >
          <ResponsiveText mobile="승인" desktop="승인하기" />
        </Button>
      </div>
    </div>
  );
}

