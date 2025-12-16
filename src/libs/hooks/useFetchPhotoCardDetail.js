'use client';

import { useEffect, useState } from 'react';

import { cardService } from '@/libs/services/cardService';

export function useFetchPhotoCardDetail(photoCardId) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCardDetail() {
      setLoading(true);
      try {
        const res = await cardService.getCardDetail(photoCardId);
        setCard(res.card);
        console.log('setCard :', setCard);
      } catch (err) {
        console.error('카드 상세 조회 실패:', err);
        setCard(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCardDetail();
  }, [photoCardId]);

  return { card, loading };
}
