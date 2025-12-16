'use client';

import { useSearchParams } from 'next/navigation';

import ResultPage from '@/components/ui/resultPage/ResultPage';

export function SellingFailContent() {
  const params = useSearchParams();
  const name = params.get('name');

  return (
    <ResultPage
      title="판매등록"
      highlight="실패"
      name={name}
      grade=""
      description="판매 등록에 실패했습니다."
      highlightColor="text-gray-300"
      buttonText="마켓플레이스로 돌아가기"
      buttonHref="/market-place"
    />
  );
}