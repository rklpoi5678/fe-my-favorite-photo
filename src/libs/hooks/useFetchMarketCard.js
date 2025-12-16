'use client';

import { useEffect, useState } from 'react';
import { marketCardService } from '../services/marketSaleService';
import { CARD_STATUS_LABEL } from '../utils/NameLabel';

export function useFetchMarketCards(params = {}) {
  const { searchKeyword = '', filter = {} } = params;
  const { grade = '', genre = '', status = '', price = '' } = filter;

  const [marketCards, setMarketCards] = useState([]);
  const [marketLoading, setMarketLoading] = useState(true);

  useEffect(() => {
    async function fetchCards() {
      setMarketLoading(true);
      try {
        const response = await marketCardService.getCard({
          keyword: searchKeyword,
          grade: grade,
          genre: genre,
          status: CARD_STATUS_LABEL[status],
          sort:
            price === '낮은 가격순'
              ? 'low'
              : price === '높은 가격순'
                ? 'high'
                : price === '최신순'
                  ? 'latest'
                  : 'low', // 기본 낮은 가격순
        });
        console.log(response);
        setMarketCards(response.cards);
      } catch (error) {
        console.error('마켓 플레이스 목록을 가져오는데 실패했습니다.', error);
        setMarketCards([]);
      } finally {
        setMarketLoading(false);
      }
    }

    fetchCards();
  }, [searchKeyword, grade, genre, status, price]);

  const isMarketCardSoldOut = (card) => card.status === 'SOLD_OUT';

  return { marketCards, marketLoading, isMarketCardSoldOut };
}
