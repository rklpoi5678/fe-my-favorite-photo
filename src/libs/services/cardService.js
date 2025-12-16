import { defaultFetch, formDataFetch } from '../utils/fetchClient';

export const cardService = {
  createCard: (formData) =>
    formDataFetch('/cards', {
      method: 'POST',
      body: formData,
    }),

  // 카드 목록 조회(인증 X)
  getCard: ({ keyword, grade, genre, sort }) => {
    const params = new URLSearchParams();

    if (keyword) params.append('keyword', keyword);
    if (grade) params.append('grade', grade);
    if (genre) params.append('genre', genre);
    if (sort) params.append('sort', sort);

    return defaultFetch(`/cards?${params.toString()}`);
  },

  // 카드 상세 조회(인증 X)
  getCardDetail: (photoCardId) => defaultFetch(`/cards/${photoCardId}`),
};
