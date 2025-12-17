'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { notificationService } from '@/libs/services/notificationService';

import { useAuth } from './AuthProvider';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchNotifications() {
      try {
        setLoading(true);
        const data = await notificationService.getLatest(user.id, 20);
        setNotifications(data);
      } catch (error) {
        console.error('알림 조회 실패', error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [user?.id]);

  // 개별 알림 읽음 처리
  const markAsRead = async (id) => {
    try {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));

      await notificationService.markAsRead(id);
    } catch (error) {
      console.error('알림 읽음 처리 실패', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, loading, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
