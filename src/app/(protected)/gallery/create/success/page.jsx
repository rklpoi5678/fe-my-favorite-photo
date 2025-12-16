import { use } from 'react';

import ResultPage from '@/components/ui/resultPage/ResultPage';

export default function SuccessPage({ searchParams }) {
  const params = use(searchParams);
  const { name, grade } = params;

  return (
    <ResultPage
      title="포토카드 생성 "
      highlight="성공"
      highlightColor="text-main"
      name={name}
      grade={grade}
      description="포토카드 생성에 성공했습니다!"
      buttonText="마이갤러리에서 확인하기"
      buttonHref="/gallery"
    />
  );
}
