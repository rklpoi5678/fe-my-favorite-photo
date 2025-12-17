'use client';

import { useEffect, useState } from 'react';

import { marketCardService } from '../services/marketSaleService';

export function useFetchMarketCardDetail(saleCardId) {
  const [marketDetailCard, setMarketDetailCard] = useState(null);
  const [marketDetailLoading, setMarketDetailLoading] = useState(true);

  useEffect(() => {
    async function fetchCardDetail() {
      setMarketDetailLoading(true);
      try {
        const res = await marketCardService.getCardDetail(saleCardId);
        setMarketDetailCard(res.cardDetail);
      } catch (err) {
        console.error('카드 상세 조회 실패:', err);
        setMarketDetailCard(null);
      } finally {
        setMarketDetailLoading(false);
      }
    }

    fetchCardDetail();
  }, [saleCardId]);

  return { marketDetailCard, marketDetailLoading };
}
