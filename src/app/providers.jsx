'use client';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import RandomPointGate from '@/components/ui/modal/random/RandomPointGate';
import AuthProvider from '@/providers/AuthProvider';
import { ExchangeProvider } from '@/providers/ExchangeProvider';
import { FilterProvider } from '@/providers/FilterProvider';
import { ModalProvider } from '@/providers/ModalProvider';
import { NotificationProvider } from '@/providers/NotificationProvider';

export function Providers({ children }) {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2500} theme="light" />

      <AuthProvider>
        <FilterProvider>
          <ExchangeProvider>
            <NotificationProvider>
              <ModalProvider>
                <RandomPointGate />
                {children}
              </ModalProvider>
            </NotificationProvider>
          </ExchangeProvider>
        </FilterProvider>
      </AuthProvider>
    </>
  );
}
