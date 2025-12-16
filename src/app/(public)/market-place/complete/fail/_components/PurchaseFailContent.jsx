'use client';

import { useSearchParams } from 'next/navigation';

import ResultPage from '@/components/ui/resultPage/ResultPage';

export function PurchaseFailContent() {
  const params = useSearchParams();
  const name = params.get('name');
  const grade = params.get('grade');
  const quantity = params.get('quantity');

  return (
    <>
      <ResultPage
        title="포토카드 "
        highlight="구매 실패"
        name={name}
        grade={grade}
        description={`${quantity}장 구매 중 문제가 발생했습니다.`}
        highlightColor="text-gray-300"
        buttonText="마켓 플레이스로 돌아가기"
        buttonHref="/market-place"
      />
    </>
  );
}
