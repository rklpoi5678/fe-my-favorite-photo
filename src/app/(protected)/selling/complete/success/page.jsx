import { Suspense } from "react";

import { SellingSuccessContent } from './_components/SellingSuccessContent'

export default function SellingSuccessPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SellingSuccessContent />
    </Suspense>
  )
}