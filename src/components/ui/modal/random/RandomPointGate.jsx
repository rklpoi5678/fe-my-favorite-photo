'use client';

import { useEffect, useRef } from 'react';

import { getRandomPointEligibility } from '@/libs/services/randomPointService';
import { useAuth } from '@/providers/AuthProvider';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

export default function RandomPointGate() {
  const { user } = useAuth();
  const { openModal } = useModal();

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!user) return; // 로그인 전엔 안 함

    async function run() {
      try {
        const { canTry } = await getRandomPointEligibility();
        if (!canTry) return;

        timeoutRef.current = setTimeout(() => {
          openModal(MODAL_TYPES.RANDOM_POINT);
        }, 10_000); // 테스트용
      } catch (e) {
        console.error('랜덤 포인트 eligibility 실패', e);
      }
    }

    run();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [user]);

  return null;
}
