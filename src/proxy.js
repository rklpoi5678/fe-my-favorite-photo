// src/middleware.js
import { NextResponse } from 'next/server';

// 토큰 갱신이 필요한 경로만 필터링 (필요에 따라 설정)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'],
};

export async function proxy(request) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (accessToken) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    //로그인 페이지로 이동
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Access Token이 만료되고 Refresh Token이 있을 때: 갱신 시도
  const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;

  try {
    const refreshResponse = await fetch(refreshUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshResponse.json();

      // 갱신 성공: 새 쿠키를 설정할 Response 객체 생성
      const response = NextResponse.next();

      // 1h
      const ACCESS_TOKEN_MAX_AGE = 60 * 60;
      // 1w
      const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60;

      // 4. 새로운 Access Token 설정
      response.cookies.set('accessToken', newAccessToken, {
        path: '/',
        maxAge: ACCESS_TOKEN_MAX_AGE,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      // 5. 새로운 Refresh Token 설정 (슬라이딩 세션)
      response.cookies.set('refreshToken', newRefreshToken, {
        path: '/',
        maxAge: REFRESH_TOKEN_MAX_AGE,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return response; // 새 쿠키를 담아 페이지로 진행
    }

    // 갱신 실패 시 (Refresh Token 만료 또는 무효)
    // Refresh Token 쿠키를 지우고 로그아웃 처리
    const response = NextResponse.next();
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  } catch (error) {
    console.error('Middleware Refresh Error:', error);
    return NextResponse.next();
  }
}
