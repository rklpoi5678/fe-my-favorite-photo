"use client"
import Image from 'next/image';

import img_card from '@/assets/images/img_card.svg';
import { tradeService } from '@/libs/services/tradeService';
import { GENRE_LABEL } from '@/libs/utils/NameLabel';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

import { Button } from '../button/Button';
import GradeLabel from '../label/GradeLabel';

/**
 * @param {String} tradeItem - Trade 정보 (설명, trade객체 등)
 */
export default function TradeCard({
  tradeItem,
}) {
  const { openModal, closeModal } = useModal()
  const baseHost = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://127.0.0.1:3005';

  const fullImageUrl = tradeItem.tradeHistories[0]?.userCard.photoCard.imageUrl
    ? tradeItem.tradeHistories[0].userCard.photoCard.imageUrl.startsWith('http')
      ? tradeItem.tradeHistories[0].userCard.photoCard.imageUrl
      : `${baseHost}/${tradeItem.tradeHistories[0].userCard.photoCard.imageUrl}`
    : img_card; // 기본 이미지는 폴백

  const handleOpenModal = () => {
    openModal(MODAL_TYPES.MODAL, {
      title: "교환 제시 취소",
      description: `${tradeItem.tradeHistories[0].userCard.photoCard.grade} | ${tradeItem.tradeHistories[0].userCard.photoCard.name} 교환 제시를 취소하시겠습니까?`,
      confirmText: "취소하기",
      onConfirm: applicantOnClick
    })
  }

  const applicantOnClick = async () => {
    const tradeId = tradeItem.id;

    if (!tradeId) {
      console.error("Trade ID가 존재하지 않아 취소할 수 없습니다.");
      return;
    }

    try {
      const response = await tradeService.applicantCancel(tradeId);
      if (response.success) {
        alert('교환 요청이 성공적으로 취소되었습니다.');
        closeModal()
      } else {
        alert(`취소 실패: ${response.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error("API Fetch Error:", error)
      alert("서버와의 통신 중 오류가 발생")
    }
  }

  return (
    <div
      className="relative flex flex-col items-center w-full max-w-42.5 p-2.5 bg-gray-500 border border-gray-400 rounded-[2px]
        sm:max-w-[342px] sm:h-[517px] sm:p-[20px]
        md:w-[440px] md:h-[600px] md:p-[40px]
        "
    >
      <div className="relative w-full h-[112px] sm:h-[227px] md:h-[270px]">
        <Image src={fullImageUrl} alt="카드 이미지" fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="w-full flex flex-col gap-[5px] sm:gap-[10px] mt-[10px] sm:mt-[25px] md:mt-[25px]">
        <p className="text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis text-[14px] sm:text-[22px] md:text-[22px]">
          {tradeItem.tradeHistories[0].userCard.photoCard.name}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px] text-[10px] sm:text-[16px] md:text-[16px]">
            <GradeLabel grade={tradeItem.tradeHistories[0].userCard.photoCard.grade} />
            <span className="border border-l-gray-400 text-4 font-normal sm:h-[14px] md:h-[23px] lg:h-[23px]" />
            <span className="text-4 font-normal text-gray-300">{GENRE_LABEL[tradeItem.tradeHistories[0].userCard.photoCard.genre]}</span>
          </div>
          <span className="text-white text-4 font-normal text-right underline underline-offset-2 decoration-0 sm:text-[10px] md:text-[16px] lg:text-[16px]">
            {tradeItem.applicant.nickname}
          </span>
        </div>
      </div>

      <div className="w-full border border-b-gray-400 my-[10px] sm:my-[20px] md:my-[20px]" />

      <div className="w-full flex flex-col justify-between items-center gap-[5px] text-[10px] sm:gap-[10px] sm:text-[16px] md:gap-[10px] md:text-[16px]">
        <div className="w-full flex flex-col gap-[5px] text-[10px] sm:gap-[10px] sm:text-[16px] md:gap-[10px] md:text-[16px]">
          <div className="w-full flex justify-between items-center">
            <span className="text-white font-normal">{tradeItem.description} </span>
          </div>
        </div>
        <Button
          intent="secondary"
          thickness="thin"
          className="w-full"
          onClick={() => handleOpenModal()}
        >
          취소하기
        </Button>
      </div>
    </div>
  );
}

