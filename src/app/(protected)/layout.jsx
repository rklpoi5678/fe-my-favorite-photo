import { redirect } from 'next/navigation';

import Header from '@/components/common/header/Header';
import MobileHeader from '@/components/common/header/MobileHeader';
import { checkAndRefreshAuth } from '@/libs/actions/auth';

export default async function Layout({ children }) {
  const isAuthenticated = await checkAndRefreshAuth();

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <>
      <Header />
      <MobileHeader />
      {children}
    </>
  );
}
