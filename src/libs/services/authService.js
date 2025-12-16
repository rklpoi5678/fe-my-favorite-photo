import { clearServerSideTokens } from '@/libs/actions/auth';
import { defaultFetch } from '@/libs/utils/fetchClient';

export const authService = {
  login: (email, password) =>
    defaultFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    }),

  register: (nickname, email, password, passwordConfirmation) =>
    defaultFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        nickname,
        email,
        password,
        passwordConfirmation,
      }),
      cache: 'no-store',
    }),

  logout: () => clearServerSideTokens(),
};
