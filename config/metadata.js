export const rootMetadata = {
  title: {
    default: '나의 최애포토',
    template: '%s | 나의 사진',
  },
  authors: [{ name: '구구의 포토', url: '' }],
  openGraph: {
    title: '나의 포토 - 추억 간직 포토',
    description: '나의 소중한 포토카드를 여기로, 지금 바로 시작해보세요!',
    url: '', // 실제 도메인주소로
    siteName: '나의 최애포토',
    images: [
      {
        url: '', // 실제 도메인주소에 public이용
        width: 1200,
        height: 630,
        alt: "나의 최애의 포토 이미지'",
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'large_image',
    title: '나의 최애포토 - 추억 간직 포토',
    description: '나의 소중한 포토카드를 여기로, 지금 바로 시작해보세요!',
    creator: 'kimYounGi',
    images: [''], // 실제 도메인주소에 public이용
  },
  description: '세상에서 가장 이해안되는 포토카드 거래플랫폼',
  keywords: ['Next.js', ' React', 'Tailwind CSS'],
};

export const publicMetadata = {
  title: {
    default: 'market-p포토ce',
  },
  description: 'market-place listing page',
  keywords: ['photoCard', 'NFT', 'money'],
};

export const privateMetadata = {
  title: {
    default: 'my-gallery',
  },
  description: 'my-gallery listing page',
  keywords: ['artist', 'bitcoin'],
};
