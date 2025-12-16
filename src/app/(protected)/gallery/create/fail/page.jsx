import { use } from 'react';

import ResultPage from '@/components/ui/resultPage/ResultPage';

export default function FailPage({ searchParams }) {
  const params = use(searchParams);
  const { name, grade } = params;

  return (
    <ResultPage
      title="포토카드 생성 "
      highlight="실패"
      highlightColor="text-gray-300"
      name={name}
      grade={grade}
      description="포토카드 생성에 실패했습니다."
      buttonText="마이갤러리에서 확인하기"
      buttonHref="/gallery"
    />
  );
}
