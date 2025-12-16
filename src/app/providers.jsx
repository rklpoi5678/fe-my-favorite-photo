import AuthProvider from '@/providers/AuthProvider';
import { ExchangeProvider } from '@/providers/ExchangeProvider';
import { FilterProvider } from '@/providers/FilterProvider';
import { ModalProvider } from '@/providers/ModalProvider';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <FilterProvider>
        <ExchangeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ExchangeProvider>
      </FilterProvider>
    </AuthProvider>
  );
}
