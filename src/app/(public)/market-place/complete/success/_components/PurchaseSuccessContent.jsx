'use client';

import { useSearchParams } from 'next/navigation';

import ResultPage from '@/components/ui/resultPage/ResultPage';

export function PurchaseSuccessContent() {
  const params = useSearchParams();
  const name = params.get('name');
  const grade = params.get('grade');
  const quantity = params.get('quantity');

  return (
    <ResultPage
      title="포토카드 "
      highlight="구매 완료"
      name={name}
      grade={grade}
      description={`${quantity}장 구매에 성공했습니다!`}
      highlightColor="text-main"
      buttonText="마이갤러리에서 확인하기"
      buttonHref="/gallery"
    />
  );
}
