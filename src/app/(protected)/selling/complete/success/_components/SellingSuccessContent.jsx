'use client';

import { useSearchParams } from 'next/navigation';

import ResultPage from '@/components/ui/resultPage/ResultPage';

export function SellingSuccessContent() {
  const params = useSearchParams();
  const name = params.get('name');
  const quantity = params.get('quantity');
  const grade = params.get('grade')

  return (
    <ResultPage
      title="판매등록"
      highlight="성공"
      name={name}
      grade={grade}
      description={`${quantity}장 판매 등록에 성공했습니다.`}
      highlightColor="text-main"
      buttonText="나의 판매 포토카드에서 확인하기"
      buttonHref="/selling"
    />
  );
}
