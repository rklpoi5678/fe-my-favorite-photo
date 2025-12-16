import { tokenFetch } from '../utils/fetchClient';

export const sellService = {
  getMyCard: ({ keyword, grade, genre, sale, status }) => {
    const params = new URLSearchParams();

    if (keyword) params.append('keyword', keyword);
    if (grade) params.append('grade', grade);
    if (genre) params.append('genre', genre);
    if (sale) params.append('sale', sale);
    if (status) params.append('status', status);

    return tokenFetch(`/sells?${params.toString()}`);
  },
};
