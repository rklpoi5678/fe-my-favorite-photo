'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

import { getServerSideToken, loginAction, registerAction } from '@/libs/actions/auth';
import { authService } from '@/libs/services/authService';
import { userService } from '@/libs/services/userService';

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  register: () => {},
  getUser: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const isLoggedIn = !!user;

  const getUser = async () => {
    try {
      const res = await userService.getMe();
      setUser(res.user);
    } catch (error) {
      console.error('사용자 정보를 가져오는데 실패했습니다:', error);
      setUser(null);
    }
  };

  const updateBalance = (newBalance) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        balance: newBalance,
      };
    });
  };

  const register = async (nickname, email, password, passwordConfirmation) => {
    const { success } = await registerAction(nickname, email, password, passwordConfirmation);
    if (!success) throw new Error('회원가입 실패');
    router.push('/login');
  };

  const login = async (email, password) => {
    const { userData, success } = await loginAction(email, password);
    if (!success) throw new Error('로그인 실패');
    setUser(userData);
    console.log('login userData:', userData);
    router.push('/market-place');
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const token = await getServerSideToken();
      if (token) {
        getUser();
      } else {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, getUser, isLoggedIn, updateBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
}
