'use client';

import { useEffect, useState } from 'react';

import { sellService } from '../services/sellService';
import { CARD_STATUS_LABEL, SALE_STATUS_LABEL } from '../utils/NameLabel';

export function useFetchSaleCards(params = {}) {
  const { searchKeyword = '', filter = {} } = params;
  const { grade = '', genre = '', sale = '', status = '' } = filter;

  const [myLocalSellingCards, setMyLocalSellingCards] = useState([]);
  const [saleCardsLoading, setSaleCardsLoading] = useState(true);

  useEffect(() => {
    async function fetchMySellingData() {
      try {
        const response = await sellService.getMyCard({
          keyword: searchKeyword,
          grade: grade,
          genre: genre,
          sale: SALE_STATUS_LABEL[sale],
          status: CARD_STATUS_LABEL[status],
        });
        console.log(response);
        console.log('status', status);
        console.log('sale', sale);
        setMyLocalSellingCards(response.cards);
      } catch (error) {
        console.error('나의 판매된 상품을 가져오는데 실패했습니다.', error);
        // setMyLocalSellingCards([]);
      } finally {
        setSaleCardsLoading(false);
      }
    }

    fetchMySellingData();
  }, [searchKeyword, grade, genre, sale, status]);

  // 카드 sold out 여부
  const isCardSoldOut = (card) => card.totalQuantity === 0;

  return {
    myLocalSellingCards,
    saleCardsLoading,
    isCardSoldOut,
  };
}
