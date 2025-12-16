import { Suspense } from "react";

import { SellingFailContent } from './_components/SellingFailContent'

export default function SellingFailPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SellingFailContent />
    </Suspense>
  )
}