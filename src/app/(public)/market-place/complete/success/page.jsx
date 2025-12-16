import { Suspense } from "react";

import { PurchaseSuccessContent } from './_components/PurchaseSuccessContent'

export default function PurchaseSuccessPage() {
  return (
    <>
      <Suspense fallback={<div>결과 로딩 중...</div>}>
        <PurchaseSuccessContent />
      </Suspense>
    </>
  )
}