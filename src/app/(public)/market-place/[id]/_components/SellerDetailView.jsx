'use client';

import Image from 'next/image';

import BackArrowIcon from "@/assets/icons/Ic_back.svg"
import Img_Card from '@/assets/images/svg/marketplacelogo.png';
import { CardTitle } from '@/components/common/card-title/CardTitle';
import Header from '@/components/common/header/Header';
import { CardExchange } from '@/components/ui/card/PhotoCardExchange';

import CardSeller from './CardSeller';

export function SellerDetailView({ card }) {
  const cardData = card.userCard.photoCard;
  const baseHost = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://127.0.0.1:3005';
  const fullImageUrl = cardData.imageUrl
    ? cardData.imageUrl.startsWith('http')
      ? cardData.imageUrl
      : `${baseHost}/${cardData.imageUrl}`
    : Img_Card; // 기본 이미지는 폴백

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-[#0a0a0a] text-white">
        <main className="max-w-[1080px] mx-auto px-6 py-8">
          <header className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center sm:hidden">
                <button
                  className="relative w-[10.15px] h-[17.699px] text-white text-xl pr-4"
                  onClick={() => onClose()}
                >
                  <Image src={BackArrowIcon} alt="뒤로가기 버튼" fill />
                </button>

                <Header />
              </div>
              <h1
                className="text-[1.25rem] font-br text-white tracking-[-0.6px] text-center ml-10 sm:hidden"
              >
                마켓플레이스
              </h1>
              <div className="w-10 sm:hidden"></div>
            </div>
          </header>
          <div className="mb-10">
            <div className="mb-6 hidden text-gray-300 font-br sm:block sm:text-base sm:leading-[-0.48px] md:text-2xl md:leading-[-0.72px]">마켓플레이스</div>
            <CardTitle
              titleMessage={cardData.name}
              className="text-2xl font-bold mb-2.5 sm:text-[2rem] sm:mb-5 md:text-[2.5rem]"
            />
            <div className="h-[1px] bg-[#2a2a2a]" />
          </div>

          <section className="grid grid-cols-[1fr_320px] gap-10 mb-16">
            <div className="relative w-full h-full object-cover aspect-4/3 bg-black rounded-lg overflow-hidden">
              <Image
                src={fullImageUrl}
                alt="카드 이미지"
                fill
              />
            </div>

            <div>
              <div className="bg-[#161616] rounded-md h-fit mb-6">
                {/* // 오른쪽 */}
                <CardSeller
                  grade={cardData.grade}
                  category={cardData.genre}
                  seller={card.seller.nickname}
                  description={cardData.description}
                  price={card.price}
                  remaining={card.remainingQuantity}
                  total={card.quantity}
                  // 교환 희망정보
                  wishGrade={card.grade}
                  wishCategory={card.genre}
                  wishDescription={card.description}
                />
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <CardTitle
                titleMessage="교환 제시 목록"
                className="text-2xl font-bold mb-2.5 sm:mb-5 sm:text-[2rem] md:text-[2.5rem]"
              />
            </div>

            {card.trade && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {card.trade.map((tradeItem, idx) =>
                  <div key={tradeItem.id || idx}>
                    <CardExchange
                      tradeItem={tradeItem}
                    />
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

