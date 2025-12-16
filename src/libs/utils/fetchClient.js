/**
 * 서비스 클라이언트 예시
 * 다른 서비스에 사용할 패치 클라이언트
 */

import { getServerSideToken, setServerSideTokens } from '../actions/auth';

// export const defaultFetch = async

// export const cookieFetch  = async

// export const formDataFetch = async

/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */

export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    // Next.js 기본 캐싱 활성화
    // cache: 'force-cache',
    cache: 'force-cache',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);
  if (!response.ok) {
    let message = 'Internal Server Error';

    try {
      const errorData = await response.json();
      message = errorData.message ?? message;
    } catch {}

    throw new Error(message);
  }

  return response.json();
};

/**
 * 토큰 인증 fetch 클라이언트
 */
export const tokenFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  let accessToken = await getServerSideToken('accessToken');
  let refreshToken = await getServerSideToken('refreshToken');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
    cache: 'no-store',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  //accessToken 만료 → refresh
  if (response.status === 401 && url !== '/auth/refresh') {
    if (!refreshToken) {
      throw new Error('로그인이 필요합니다.');
    }

    const refreshResponse = await fetch(`${baseURL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    });

    if (!refreshResponse.ok) {
      throw new Error('토큰 갱신 실패');
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await refreshResponse.json();

    //server action에 새 토큰 저장
    await setServerSideTokens(newAccessToken, newRefreshToken);

    //accessToken으로 헤더 교체
    mergedOptions.headers.Authorization = `Bearer ${newAccessToken}`;

    response = await fetch(`${baseURL}${url}`, mergedOptions);
  }

  //실패 처리
  if (!response.ok) {
    let message = 'Internal Server Error';

    try {
      const errorData = await response.json();
      message = errorData.message ?? message;
    } catch {}

    throw new Error(message);
  }

  //응답 반환
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return { status: response.status, ok: response.ok };
};

export const formDataFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = await getServerSideToken('accessToken');

  const defaultOptions = {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
    cache: 'no-store',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};
