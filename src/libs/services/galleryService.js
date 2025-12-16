import { tokenFetch } from '../utils/fetchClient';

export const galleryService = {
  getMyUserCard: ({ keyword, grade, genre }) => {
    const params = new URLSearchParams();

    if (keyword) params.append('keyword', keyword);
    if (grade) params.append('grade', grade);
    if (genre) params.append('genre', genre);

    return tokenFetch(`/cards/my?${params.toString()}`);
  },
};
