import { Suspense } from "react";

import { PurchaseFailContent } from './_components/PurchaseFailContent'

export default function PurchaseFailPage() {
  return (
    <>
      <Suspense fallback={<div>결과 로딩 중...</div>}>
        <PurchaseFailContent />
      </Suspense>
    </>
  )
}