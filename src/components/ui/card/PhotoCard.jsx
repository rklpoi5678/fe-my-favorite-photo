'use client';
import Image from 'next/image';

import img_soldOut from '@/assets/icons/Ic_soldout.svg';
import img_card from '@/assets/images/img_card.svg';
import img_logo from '@/assets/images/logo.png';
import { GENRE_LABEL } from '@/libs/utils/NameLabel';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

import GradeLabel from '../label/GradeLabel';
import SaleStatusLabel from '../label/SaleStatusLabel';
import PhotoCardInfo from './PhotoCardInfo';

export default function PhotoCard({
  card,
  type = 'remain',
  soldOutIcon,
  showSaleLabel,
  sellModal,
  exchangeModal
}) {
  const { openModal } = useModal()
  const baseHost = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://127.0.0.1:3005';

  const fullImageUrl = card?.imageUrl
    ? card.imageUrl.startsWith('http')
      ? card.imageUrl
      : `${baseHost}/${card.imageUrl}`
    : img_card; // 기본 이미지는 폴백

  const handleOpenSellModal = (e) => {
    e.stopPropagation();
    openModal(MODAL_TYPES.CARD_MODAL, { type: 'sell', card: card });
  };

  const handleOpenExchangeModal = (e) => {
    e.stopPropagation();
    openModal(MODAL_TYPES.TRADE_OFFER_MODAL, { card: card });
  };

  let clickHandler = undefined;

  if (exchangeModal) {
    clickHandler = handleOpenExchangeModal;
  }

  if (sellModal) {
    clickHandler = handleOpenSellModal;
  }

  const isSoldOut =
    card.sale?.status === 'SOLD_OUT' || card.status === 'SOLD_OUT' || card.totalQuantity === 0;

  return (
    <div
      className="relative flex flex-col items-center bg-gray-500 border border-gray-400 rounded-[2px]
        sm:w-[170px] sm:p-[10px]
        md:w-[342px] md:h-[517px] md:p-[20px]
        lg:w-[440px] lg:h-[600px] lg:p-[40px]
        "
      onClick={clickHandler}
    >
      <div className="relative w-full sm:h-[112px] md:h-[227px] lg:h-[270px]">
        <Image src={fullImageUrl} alt="카드 이미지" fill style={{ objectFit: 'cover' }} />

        {/* SOLD_OUT 처리 */}
        {isSoldOut && (
          <>
            <div className="absolute inset-0 bg-gray-500/70 rounded-[2px]" />

            <Image
              src={img_soldOut}
              alt="SOLD OUT 아이콘"
              width={soldOutIcon.width}
              height={soldOutIcon.height}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </>
        )}

        {/* 판매 OR 교환제시 라벨 */}
        {showSaleLabel &&
          !isSoldOut &&
          (card.status === 'ON_SALE' || card.status === 'TRADING') && (
            <div className="absolute sm:top-[5px] sm:left-[5px] md:top-[10px] md:left-[10px] lg:top-[10px] lg:left-[10px]">
              <SaleStatusLabel status={card.status} />
            </div>
          )}
      </div>

      <div className="w-full flex flex-col sm:gap-[5px] md:gap-[10px] lg:gap-[10px] sm:mt-[10px] md:mt-[25px] lg:mt-[25px]">
        <p className="text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:text-[14px] md:text-[22px] lg:text-[22px]">
          {card.name || '카드 이름 없음'}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px] sm:text-[10px] md:text-[16px] lg:text-[16px]">
            <GradeLabel grade={card.grade ?? card.photoCard?.grade ?? 'COMMON'} />
            <span className="border border-l-gray-400 text-4 font-normal sm:h-[14px] md:h-[23px] lg:h-[23px]" />
            <span className="text-4 font-normal text-gray-300">{GENRE_LABEL[card.genre]}</span>
          </div>
          <span className="text-white text-4 font-normal text-right underline underline-offset-2 decoration-0 sm:text-[10px] md:text-[16px] lg:text-[16px]">
            {card.nickname || '유저'}
          </span>
        </div>
      </div>

      <div className="w-full border border-b-gray-400 sm:my-[10px] md:my-[20px] lg:my-[20px]" />

      <div className="w-full flex flex-col justify-between items-center sm:gap-[5px] text-[10px] md:gap-[10px] text-[16px] lg:gap-[10px] text-[16px]">
        <PhotoCardInfo card={card} type={type} />
      </div>

      <Image
        src={img_logo}
        alt="로고"
        width={99}
        height={18}
        className="absolute bottom-10 sm:hidden md:block lg:block"
      />
    </div>
  );
}
