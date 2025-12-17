'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Minus from '@/assets/icons/Ic_minus.svg';
import Plus from '@/assets/icons/Ic_plus.svg';
import { Button } from '@/components/ui/button/Button';
import GradeLabel from '@/components/ui/label/GradeLabel';
import purchaseService from '@/libs/services/purchaseService';
import { GENRE_LABEL } from '@/libs/utils/NameLabel';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

export default function CardBuyer({ card }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { openModal, closeModal } = useModal()
  const cardData = card.userCard.photoCard;

  const handleOnModal = () => {
    openModal(MODAL_TYPES.MODAL, {
      title: "포토카드 구매",
      description: `[${card.grade} | ${cardData.name}] ${quantity}장을 구매하시겠습니까?`,
      confirmText: "구매하기",
      onConfirm: handlePurchase
    })
  }

  const incrementQuantity = () => {
    if (quantity < card.remainingQuantity) {
      setQuantity((q) => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  const handlePurchase = async () => {
    try {
      await purchaseService.purchase(card.id, quantity);
      closeModal();
      router.push(
        `/market-place/complete/success?name=${encodeURIComponent(cardData.name)}&grade=${card.grade}&quantity=${quantity}`,
      );
    } catch (error) {
      console.error('구매실패', error);
      closeModal();
      router.push(
        `/market-place/complete/fail?name=${encodeURIComponent(cardData.name)}&grade=${card.grade}&quantity=${quantity}`,
      );
    }
  };

  return (
    <main className="text-white">
      <section className="flex justify-between items-center w-full border-b pb-7.5 border-gray-400">
        <div className="flex items-center gap-1.25 sm:gap-2.5">
          {/* 컴포넌트 반응형 수정 */}
          <GradeLabel grade={cardData.grade} size="sm" />
          <div className="text-gray-400">|</div>
          <p className="text-gray-300 text-lg md:text-2xl">{GENRE_LABEL[cardData.genre]}</p>
        </div>
        <div className="flex justify-between ">
          <p className="text-white underline text-lg font-bold md:text-2xl">{card.seller.nickname}</p>
        </div>
      </section>

      <section className="mt-7.5">
        <p className="text-base md:text-lg">{cardData.description}</p>
      </section>

      <div className="border-b border-gray-400 mt-7.5 mb-7.5"></div>

      <section className="flex flex-col gap-2.5">
        <div className="flex justify-between">
          <h3 className="text-lg text-gray-300 md:text-[1.25rem]">가격</h3>
          <p className="text-[1.25rem] font-bold md:text-2xl">{card.price} P</p>
        </div>
        <div className="flex justify-between">
          <h3 className="text-lg text-gray-300 md:text-[1.25rem]">잔여</h3>
          <p className="text-[1.25rem] font-bold md:text-2xl">
            {card.remainingQuantity}
            <span className="text-gray-300">
              {' '}
              / {card.quantity}
            </span>
          </p>
        </div>
      </section>

      <div className="border-b border-gray-400 mt-7.5 mb-7.5"></div>

      <section className="flex flex-col gap-5.75">
        <div className="flex justify-between items-center">
          <label className="flex-1  text-lg md:text-[1.25rem] text-nowrap">구매수량</label>
          <div className="flex items-center justify-center rounded-xs border border-gray-200 px-3 py-2.5 flex-1">
            <button
              type="button"
              onClick={decrementQuantity}
              className="relative flex flex-1 justify-start w-5.5 h-5.5 hover:bg-gray-400/50 transition-colors sm:w-6 sm:h-6"
            >
              <Image src={Minus} alt="빼기" unoptimized />
            </button>
            <span className="text-center text-lg sm:text-[1.25rem]">{quantity}</span>
            <button
              type="button"
              onClick={incrementQuantity}
              className="relative flex flex-1 justify-end w-5.5 h-5.5 hover:bg-gray-400/50 transition-colors sm:w-6 sm:h-6"
            >
              <Image src={Plus} alt="더하기" unoptimized />
            </button>
          </div>
        </div>

        <div className="flex justify-between  mb-10 md:mb-20">
          <label className="text-lg md:text-[1.25rem] text-nowrap">총 가격</label>
          <div className="flex items-center gap-2.5">
            <p className="text-[1.25rem] font-bold md:text-2xl">{card.price * quantity} P</p>
            <p className="text-lg text-gray-300">({quantity}장)</p>
          </div>
        </div>
      </section>

      <section>
        <Button
          // disabled={!card.sale}
          thickness="thin"
          className="text-lg font-bold  w-full h-18.5 md:h-20 md:text-[1.25rem]"
          onClick={handleOnModal}
        >
          포토카드 구매하기
        </Button>
      </section>
    </main>
  );
}
