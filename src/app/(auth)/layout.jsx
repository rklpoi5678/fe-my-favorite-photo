import { redirect, RedirectType } from 'next/navigation';

import { checkAndRefreshAuth } from '@/libs/actions/auth';

export default async function Layout({ children }) {
  await checkAndRefreshAuth();

  return (
    <section className="min-h-screen w-full flex justify-center items-center">{children}</section>
  );
}
