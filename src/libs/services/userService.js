import { tokenFetch } from '@/libs/utils/fetchClient';

export const userService = {
  getMe: () => tokenFetch('/auth/me'),
};
