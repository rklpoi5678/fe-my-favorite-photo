'use client';

import { useEffect, useState } from 'react';

import { galleryService } from '../services/galleryService';

export function useFetchUserCards(params = {}) {
  const { searchKeyword = '', filter = {} } = params;
  const { grade = '', genre = '' } = filter;

  const [myCards, setMyCards] = useState([]);
  const [myCardsLoading, setMyCardsLoading] = useState(true);

  useEffect(() => {
    async function fetchMySellingData() {
      try {
        const response = await galleryService.getMyUserCard({
          keyword: searchKeyword,
          grade: grade,
          genre: genre,
        });
        setMyCards(response.cards);
      } catch (error) {
        console.error('나의 갤러리 카드 목록을 가져오는데 실패했습니다.', error);
        // setMyCards([]);
      } finally {
        setMyCardsLoading(false);
      }
    }

    fetchMySellingData();
  }, [searchKeyword, grade, genre]);

  // 판매 중 카드
  const sellingUserCards = myCards.filter(
    (card) => card.status === 'ON_SALE' || card.status === 'TRADING',
  );

  // 카드 sold out 여부
  // const isUserCardSoldOut = (card) => card.totalQuantity === 0;
  const isUserCardSoldOut = (card) => card.status === 'SOLD_OUT';

  return {
    myCards,
    myCardsLoading,
    sellingUserCards,
    isUserCardSoldOut,
  };
}
