import { tokenFetch } from '../utils/fetchClient';

export const notificationService = {
  getLatest: (userId, limit = 5) => {
    if (!userId) {
      return Promise.reject(new Error('userId is required'));
    }
    const params = new URLSearchParams();
    params.append('userId', userId);
    params.append('limit', limit);

    return tokenFetch(`/notifications?${params.toString()}`);
  },

  markAsRead: (id) => {
    return tokenFetch(`/notifications/read/${id}`, {
      method: 'POST',
    });
  },
};
