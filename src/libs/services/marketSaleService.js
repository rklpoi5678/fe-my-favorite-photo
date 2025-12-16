import { defaultFetch, tokenFetch } from '../utils/fetchClient';

export const marketCardService = {
  // 카드 목록 조회(인증 X)
  getCard: ({ keyword, grade, genre, status, sort }) => {
    const params = new URLSearchParams();

    if (keyword) params.append('keyword', keyword);
    if (grade) params.append('grade', grade);
    if (genre) params.append('genre', genre);
    if (status) params.append('status', status);
    if (sort) params.append('sort', sort);

    return defaultFetch(`/market?${params.toString()}`);
  },

  // 카드 상세 조회(인증 X)
  getCardDetail: (saleCardId) => tokenFetch(`/market/${saleCardId}`),
};
