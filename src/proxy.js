import { NextResponse } from 'next/server';

// 토큰 갱신이 필요한 경로만 필터링 (필요에 따라 설정)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'],
};

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicPage =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/' ||
    pathname.startsWith('/market-place');

  // 이미 Access Token이 있는 경우
  if (accessToken) {
    if (pathname === '/login' || pathname === '/signup') {
      return NextResponse.redirect(new URL('/market-place', request.url));
    }
    return NextResponse.next();
  }

  if (!refreshToken) {
    // 공개 페이지면 통과, 아니면 로그인 페이지로
    if (isPublicPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Access Token이 만료되고 Refresh Token이 있을 때: 갱신 시도
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

      const response = NextResponse.next();

      const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1h
      const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 1w

      // 여기서 옵션 정의
      const cookieOptions = {
        path: '/',
        httpOnly: true,
        secure: process.env === 'production',
        sameSite: 'lax',
      };

      response.cookies.set('accessToken', newAccessToken, {
        ...cookieOptions,
        maxAge: ACCESS_TOKEN_MAX_AGE,
      });

      // jwt 슬라이딩
      response.cookies.set('refreshToken', newRefreshToken, {
        ...cookieOptions,
        maxAge: REFRESH_TOKEN_MAX_AGE,
      });

      return response; // 새 쿠키를 담아 페이지로 진행
    }

    // 갱신 실패 시 (Refresh Token 만료 또는 무효)
    // Refresh Token 쿠키를 지우고 로그아웃 처리
    const response = isPublicPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url));

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  } catch (error) {
    console.error('Middleware Refresh Error:', error);
    // 에러 발생 시 안전하게 공개 페이지면 보내주고 아니면 로그인으로
    return isPublicPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url));
  }
}
