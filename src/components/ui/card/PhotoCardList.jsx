'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useFetchMarketCards } from '@/libs/hooks/useFetchMarketCard';
import { useFetchSaleCards } from '@/libs/hooks/useFetchSaleCards';
import { useFetchUserCards } from '@/libs/hooks/userFetchUserCards';
import { normalizeMarketCard, normalizeUserCard } from '@/libs/utils/normalizeCard';
import { useAuth } from '@/providers/AuthProvider';
import { useFilter } from '@/providers/FilterProvider';

import Modal from '../modal/Modal';
import { Pagination } from '../pagination/Pagination';
import PhotoCard from './PhotoCard';

/**
 *
 * @param {String} type  -- 포토카드의 수량
 * @return
 */
export default function PhotoCardList({
  type,
  showSaleLabel = false,
  isSellingPage = false,
  isGalleryPage = false,
  isSellModal = false,
  isExchangeModal = false,
}) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleCardClick = (cardId) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    router.push(`/market-place/${cardId}`);
  };

  const { filter, searchKeyword } = useFilter();
  const { marketCards, marketLoading } = useFetchMarketCards({ searchKeyword, filter });
  const { myCards, myCardsLoading } = useFetchUserCards({
    searchKeyword,
    filter,
  });
  const { myLocalSellingCards, saleCardsLoading } = useFetchSaleCards({
    searchKeyword,
    filter,
  });

  let cardsRenderingType;

  if (isSellingPage) {
    cardsRenderingType = myLocalSellingCards;
  } else if (isGalleryPage) {
    cardsRenderingType = myCards;
  } else {
    cardsRenderingType = marketCards;
  }

  const [windowWidth, setWindowWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // 화면 크기 변화 감지(화면 사이즈별 카드 배열)
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 페이지네이션
  const usePagination = isSellingPage || isGalleryPage;

  let itemsPerPage = 16;
  if (windowWidth >= 1920) itemsPerPage = 15;

  // 페이지네이션 사용하는 경우만 계산
  const totalPages = usePagination ? Math.ceil(cardsRenderingType.length / itemsPerPage) : 1;

  const start = (currentPage - 1) * itemsPerPage;

  const renderedCards = usePagination
    ? (cardsRenderingType || []).slice(start, start + itemsPerPage)
    : cardsRenderingType;

  const isLoading = marketLoading || myCardsLoading || saleCardsLoading;

  if (isLoading)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        로딩 중...
      </p>
    );

  return (
    <div>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-2 sm:gap-[5px] md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-20">
          {renderedCards.map((card) => {
            // soldOutIcon은 sold_out 이미지 처리에 수정 예정(밑에 코드 지울 것)
            let soldOutIcon;

            if (windowWidth < 768) {
              soldOutIcon = { width: 112, height: 112 };
            } else if (windowWidth < 1920) {
              soldOutIcon = { width: 200, height: 200 };
            } else {
              soldOutIcon = { width: 230, height: 230 };
            }

            const isLinkDisabled = isSellingPage || isGalleryPage;

            const normalizedCard = isLinkDisabled
              ? normalizeUserCard(card)
              : normalizeMarketCard(card);

            const cardContent = (
              <PhotoCard
                card={normalizedCard}
                type={type}
                soldOutIcon={soldOutIcon}
                showSaleLabel={showSaleLabel}
                isSellingPage={isSellingPage}
                isGalleryPage={isGalleryPage}
                sellModal={isSellModal}
                exchangeModal={isExchangeModal}
              />
            );

            // isSellingPage 또는 isGalleryPage일 때 상세 페이지 이동 X
            return isLinkDisabled ? (
              <div key={card.id}>{cardContent}</div>
            ) : (
              <div
                href={`/market-place/${card.id}`}
                key={card.id}
                onClick={() => handleCardClick(card.id)}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>

      {usePagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="로그인이 필요합니다."
        description="로그인 하시겠습니까? 다양한 서비스를 편리하게 이용하실 수 있습니다."
        confirmText="확인"
        onConfirm={() => router.push('/login')}
      />
    </div>
  );
}
