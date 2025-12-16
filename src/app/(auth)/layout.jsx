import { redirect, RedirectType } from 'next/navigation';

import { checkAndRefreshAuth } from '@/libs/actions/auth';

export default async function Layout({ children }) {
  //인증 체크 토큰 갱신
  const isAuthenticated = await checkAndRefreshAuth();

  // 이미 인증된 사용자 리다이렉트
  if (isAuthenticated) {
    redirect('/market-place', RedirectType.replace);
  }

  return (
    <section className="min-h-screen w-full flex justify-center items-center">{children}</section>
  );
}
